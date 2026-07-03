import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from 'eslint-plugin-react-hooks';
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  reactHooks.configs.flat.recommended,
  {
    rules: {
      "indent": [
        "error",
        2
      ],
      "react/jsx-indent": [
        "error",
        2
      ],
      "react/jsx-indent-props": [
        "error",
        2
      ],
      "react/display-name": 0,
      "react/prop-types": 0,
      "no-restricted-globals": 0,
      "@typescript-eslint/no-unused-vars": 0
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
