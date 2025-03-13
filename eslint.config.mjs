import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });


const { config } = compat.loadConfig({
  baseConfig: {
    extends: ["next/core-web-vitals", "next/typescript"],  
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
      "prettier/prettier": "error", 
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
    }
  },
});

export default config;