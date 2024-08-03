// 👉 eslint setup for maintaining coding style pattern with airbnb

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "warn",
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],

    // Disable prop-types as we use TypeScript for type checking
    "react/prop-types": "off",

    "import/no-extraneous-dependencies": [
      "warn",
      {
        devDependencies: [
          "**/*.test.ts",
          "**/*.test.tsx",
          "**/*.spec.ts",
          "**/*.spec.tsx",
          "**/setupTests.ts",
        ],
      },
    ],

    "import/prefer-default-export": "off",

    "import/no-anonymous-default-export": "off",

    "import/extensions": [
      "warn",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
        js: "never",
        jsx: "never",
      },
    ],

    // Additional custom rules
    "react/react-in-jsx-scope": "off", // Not needed with React 17+
    "@typescript-eslint/explicit-module-boundary-types": "off", // Disable explicit return types on functions
    "@typescript-eslint/no-unused-vars": ["off"], // Disable check for unused variables
  },
  settings: {
    // Ensure ESLint can resolve TypeScript files
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
