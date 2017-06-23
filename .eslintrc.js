module.exports = {
  "env": {
    "browser": true,
    "node": true,
  },
  "extends": [
    "airbnb",
  ],
  "globals": {
    "axios": true,
    "semantic": true,
    "@": true,
    "$": true,
  },
  "plugins": [
    "import",
    "html",
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
    }
  },
  "rules": {
    "max-len": ["error", 120],
    "global-require": "off",
    "no-console": "off",
    "no-param-reassign": ["error", {"props": false}],
    "no-mixed-operators": ["error", {"allowSamePrecedence": true}],
    "no-constant-condition": ["error", { "checkLoops": false }],
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "func-names": "off",
    "import/no-extraneous-dependencies": "off",
    "linebreak-style": "off",
  }
};
