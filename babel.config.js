const presets = [
  // ["@babel/env", {
  //   "debug": process.env.NODE_ENV === "production",
  //   "modules": false,
  // }],
  "@babel/react",
  "@babel/typescript",
]

const plugins = [
  ["@babel/plugin-proposal-class-properties", {
    "loose": true
  }],
]

module.exports = {
  presets,
  plugins,
}
