# sparcs_home

## DB Setup

- Install mongodb
- Create database and user for authentication
- Turn on auth mode in mongodb config
- service mongodb start

## Build Setup

``` bash
# install dependencies
npm install

# set up semantic-ui
npm install -g gulp
cd semantic
gulp build

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Deployment

Use `npm run prod` in your local.
Use forever with environment variables in production.
