module.exports = {
  "extends": "airbnb",
  "globals": {
    "window": true,
    "semantic": true,
    "@": true,
    "$": true,
  },
  "plugins": [
    "jsx-a11y",
    "import",
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
    }
  },
  "rules": {
    "semi": "off",
    "max-len": ["error", 120],
    "global-require": "off",
    "no-param-reassign": ["error", {"props": false}],
    "no-mixed-operators": ["error", {"allowSamePrecedence": true}],
    "no-constant-condition": ["error", { "checkLoops": false }],
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "func-names": "off",
  }
};
