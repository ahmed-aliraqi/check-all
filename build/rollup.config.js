// rollup.config.js

import commonjs from "rollup-plugin-commonjs";

const config = {
  input: "src/index.js",
  output: {
    name: "check-all",
    extend: true
  },

  plugins: [
    commonjs(),
  ]
};

export default config;