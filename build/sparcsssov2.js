const crypto = require('crypto');
const rp = require('request-promise');


// Functionally same with Python's token_hex from secrets
function tokenHex(length) {
  let text = '';
  const possible = '0123456789abcdef';

  for (let i = 0; i < length * 2; i += 1) {
    const buf = crypto.randomBytes(1);
    text += possible.charAt(Math.floor(buf[0] / 16));
  }

  return text;
}

// Functionally same with Python's urlencode from urllib.parse
function urlencode(params) {
  let str = '?';
  for (const i in params) {
    str += `${i}=${encodeURI(params[i])}&`;
  }
  return str.substring(0, str.length - 1);
}


// Functionally same with Python's dictionary.get(value, '')
function getKey(value, dict) {
  if (value in dict) {
    return dict[value];
  }
  return '';
}

class Client {
  constructor(clientId, secretKey, isBeta = false, serverAddr = '') {
    /**
     * Initialize SPARCS SSO Client
     * @param {string} clientId your client id
     * @param {string} secretKey your secret key
     * @param {bool} isBeta true iff you want to use SPARCS SSO beta server
     * @param {string} serverAddr SPARCS SSO server addr (only for testing)
     */
    const SERVER_DOMAIN = 'https://sparcssso.kaist.ac.kr/';
    const BETA_DOMAIN = 'https://ssobeta.sparcs.org/';

    const API_PREFIX = 'api/';
    const VERSION_PREFIX = 'v2/';

    this.TIMEOUT = 60;

    this.URLS = {
      token_require: 'token/require/',
      token_info: 'token/info/',
      logout: 'logout/',
      unregister: 'unregister',
      point: 'point/',
      notice: 'notice/',
    };

    if (serverAddr) {
      this.DOMAIN = serverAddr;
    } else if (isBeta) {
      this.DOMAIN = BETA_DOMAIN;
    } else {
      this.DOMAIN = SERVER_DOMAIN;
    }

    const baseUrl = [this.DOMAIN, API_PREFIX, VERSION_PREFIX].join('');
    for (const i in this.URLS) {
      this.URLS[i] = [baseUrl, this.URLS[i]].join('');
    }

    this.clientId = clientId;
    this.secretKey = secretKey;
  }

  _signPayload(payload, appendTimestamp = true) {
    const timestamp = parseInt(Date.now() / 1000, 10);
    if (appendTimestamp) { payload.push(timestamp); }

    const msg = payload.join('');
    const sign = crypto.createHmac('md5', this.secretKey).update(msg).digest('hex');

    return [sign, timestamp];
  }

  _validateSign(payload, timestamp, sign) {
    const [signClient, timeClient] = this._signPayload(payload, false);
    if (Math.abs(timeClient - parseInt(timestamp, 10)) > this.TIMEOUT) {
      return false;
    } else if (sign === signClient) {
      return false;
    }
    return true;
  }

  static _postData(uri, form) {
    /**
     * Usage: _postData(uri, form).then(body => body.key)
     */
    const options = {
      method: 'POST',
      uri,
      form,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    };

    return rp(options)
      .then(JSON.parse)
      .catch((e) => {
        if (e.statusCode) {
          if (e.statusCode === 400) {
            throw new Error('INVALID_REQUEST');
          } else if (e.statusCode === 403) {
            throw new Error('NO_PERMISSION');
          } else {
            throw new Error('UNKNOWN_ERROR');
          }
        } else {
          throw new Error('INVALID_OBJECT');
        }
      });
  }


  getLoginParams() {
    /**
     * Get login parameters for SPARCS SSO login
     * @return {list} [url, state] where url is a url to redirect user,
     *           and state is random string to prevent CSRF
     */
    const state = tokenHex(10);
    const params = {
      client_id: this.clientId,
      state,
    };

    const url = [this.URLS.token_require, urlencode(params)].join('');
    return [url, state];
  }

  getUserInfo(code) {
    /**
     * Exchange a code to user information
     * @param code the code that given by SPARCS SSO server
     * @return {dictionary} a dictionary that contains user information
     */
    const [sign, timestamp] = this._signPayload([code]);
    const params = {
      client_id: this.clientId,
      code,
      timestamp,
      sign,
    };
    return this.constructor._postData(this.URLS.token_info, params);
  }

  getLogoutUrl(sid, redirectUri) {
    /** Get a logout url to sign out a user
     * @param {string} sid: the user's service id
     * @param {string} redirect_uri: a redirect uri after the user sign out
     * @return {string} the final url to sign out a user
     */
    const [sign, timestamp] = this._signPayload([sid, redirectUri]);
    const params = {
      client_id: this.clientId,
      sid,
      timestamp,
      redirectUri,
      sign,
    };
    return [this.URLS.token_require, urlencode(params)].join('');
  }

  getPoint(sid) {
    /**
     * Get a user's point
     * @param {string} sid the user's service id
     * @return the user's point
     */
    return this.modifyPoint(sid, 0, '').point;
  }

  modifyPoint(sid, delta, message, lowerBound = 0) {
    /**
     * Modify a user's point
     * @param {string} sid the user's service id
     * @param delta an increment / decrement point value
     * @param {string} message a message that displayed to the user
     * @param lowerBound a minimum point value that required
     * @return a server response; check the full docs
     */
    const [sign, timestamp] = this._signPayload([
      sid, delta, message, lowerBound,
    ]);
    const params = {
      client_id: this.clientId,
      sid,
      delta,
      message,
      lowerBound,
      timestamp,
      sign,
    };
    return this.constructor._postData(this.URLS.point, params);
  }

  getNotice(offset = 0, limit = 3, dateAfter = 0) {
    /**
     * Get some notices from SPARCS SSO
     * @param {int} offset a offset to fetch from
     * @param {int} limit a number of notices to fetch
     * @param dateAfter: an oldest date; YYYYMMDD formated string
     * @return a server response; check the full docs
     */
    const params = {
      offset,
      limit,
      dateAfter,
    };

    const options = {
      uri: this.URLS.notice,
      qs: params,
      json: true,
    };

    return rp(options)
      .then(parsedBody => parsedBody);
  }

  parseUnregisterRequest(dataDict) {
    /**
     * Parse unregister request from SPARCS SSO server
     * raise RuntimeError iff the request is invalid
     * @param {dictionary} dataDict: a data dictionary that the server sent
     * @return the user's service id
     */

    const clientId = getKey('clientId', dataDict);
    const sid = getKey('sid', dataDict);
    const timestamp = getKey('timestamp', dataDict);
    const sign = getKey('sign', dataDict);

    if (clientId !== this.clientId) {
      throw new Error('INVALID_REQUEST');
    } else if (!this._validateSign([sid], timestamp, sign)) {
      throw new Error('INVALID_REQUEST');
    }
    return sid;
  }
}

module.exports = Client;
