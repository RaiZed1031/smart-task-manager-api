import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,

  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },

  {
    files: ["test/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        test: "readonly",
        expect: "readonly"
      }
    }
  }
];