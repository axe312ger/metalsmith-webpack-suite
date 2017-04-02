module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    // Avoid missing ampersands when using nested css4
    // See example matches here: http://regexr.com/3flmj
    'selector-nested-pattern': /^&[^,\n\r]+(,\s*&[^,\n\r]+)*$/,
    // Prepared configs are great, some rules still annoy. Feel free to disable
    // or change more of them:
    // https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md#rules
    'selector-type-no-unknown': null
  }
}
