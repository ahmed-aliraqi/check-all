// rollup.config.js

import commonjs from "rollup-plugin-commonjs";

const config = {
  input: "src/entry.js",
  output: {
    name: "check-all",
    extend: true
  },

  plugins: [
    commonjs(),
  ]
};

export default config;