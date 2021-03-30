/*
 reference: https://github.com/toshi-toma/eslint-config-airbnb-typescript-prettier
*/
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: "./",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2017: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
  ],
  plugins: ["react", "jsx-a11y", "import", "prettier", "@typescript-eslint", "simple-import-sort",],
  ignorePatterns: [".eslintrc.js", "webpack.config.js"],
  globals: {},
  rules: {
    // prettier
    "prettier/prettier": ["error"],

    // TypeScript
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",
    "@typescript-eslint/no-shadow": "warn",
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    /* 명시적인 return type 작성*/
    "@typescript-eslint/explicit-module-boundary-types": "off",

    // js
    "camelcase": "off",
    "consistent-return": "off",
    /* redux toolkit immer js를 위한 세팅 */
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    "no-underscore-dangle": "warn",
    "eqeqeq": "warn",
    "radix": "warn",
    "no-plusplus": "warn",
    "default-case": "warn",
    "no-restricted-properties": "warn",

    // v4 changes
    "no-use-before-define": "off",
    "no-shadow": "off",

    // jsx-a11y
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/no-noninteractive-element-interactions": "warn",

    // React
    "react/require-default-props": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "warn",
    "react/button-has-type": "warn",

    // import
    "import/no-cycle": "off",
    "import/prefer-default-export": "off",
    // 테스트 코드에 있는 dependencies를 dev로 옮기라고 경고 뜨는 이슈를 해결하기 위함
    // https://github.com/banksalad/styleguide/pull/35#discussion_r603753937
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["/**/*.ts?(x)"]}],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        mjs: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },

  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".json"]
      },
      typescript: {
        "alwaysTryTypes": true,
        "project": `${__dirname}/tsconfig.json`,
      }
    },
    "import/extensions": [".js", ".ts", ".mjs", ".jsx", ".tsx"]
  }
};
