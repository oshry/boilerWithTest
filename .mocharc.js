module.exports = {
  require: [
    'ts-node/register',
    './test/support/Setup.spec.ts'
  ],
  spec: './test/unit/**/*.spec.ts'
}
