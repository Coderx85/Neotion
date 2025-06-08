import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([globalIgnores(["node_modules"]), {
    rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
    },
}]);