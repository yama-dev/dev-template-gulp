module.exports = {
  "env": {
    "amd": true,
    "browser": true,
    "es6": true,
    "jquery": true,
    "node": true
  },
  "rules": {
    "indent": [
      "error",
      2,
      {
        "outerIIFEBody": 0,
        "SwitchCase": 1
      }
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": "off",
  },
  "parserOptions": {
    "sourceType": "module"
  }
};
