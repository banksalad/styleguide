# Airbnb Style Migration Guide
## 0. 시작하기전에
### 1) 왜 Airbnb 룰로 통합하는가?
- 코드리뷰에서 스타일에 대한 논의를 줄이고, 코드 작성시에도 formatting 에 대한 리소스를 줄이기 위해 보다 코드로 적용 가능한 스타일 가이드가 필요했습니다.
- 기존 style guide는 lint rule로 정확하게 반영되지 않아, 각 레포별로 파편화가 이루어져 있있고  일부 formatting 의 경우 각 개발자의 에디터에 의존하고 있었습니다.
- 이를 해결하고자 global standard 인 airbnb 룰을 적용하기로 했습니다. 이제 저장시에 formatting 과 linting 이 동시에 진행되어 개발시에 style에 대한 리소스를 신경쓰지 않아도 됩니다.
### 2) 서버 코드는 react 코드가 아닌데 어떤 lint 룰을 적용해야 하는가?
- 일단 서버코드는 현재 rule을 그대로 적용하고, client 코드에만 airbnb 룰을 적용하려 합니다.
- airbnb style guide는 리엑트 rule을 포함하고 있어 express server 쪽 lint 세팅에는 적합하지 않습니다.
- 따라서 server 쪽에 대한 lint는 기존 root 에 설정된 eslint rule을 따르게 하고, client 폴더에 eslint 설치 및 스타일 가이드 설정을 진행합니다.(서버쪽에 대한 lint 세팅은 추후 논의를 통해 어떻게 할지 정하면 될 것 같고 우선순위가 높지는 않다고 판단했습니다.), 이 세팅 변경으로 github action 에 CI 를 변경해야 하는데, 자세한 내용은 `5 style guide 적용 -> 4) CI 수정` 섹션에서 다루겠습니다.
- web repo 중 별로로 별도로 server 폴더 없는 repo도 있습니다. e.g. [telecom-web](https://github.com/banksalad/telecom-web),이런 경우에는 root 폴더에 이 style guide를 적용하시면 됩니다.
### 3) 아래 세팅을 살펴보면 prettier 는 별도 실행되지 않는데 어떻게 된건가?
- 아래 가이드 대로 세팅을 하면 `eslint --fix` 실행으로 lint 와 prettier를 같이 적용할 수 있습니다. 별도 prettier를 설정하지 않아도 됩니다.
- `fyi`: `eslint-config-prettier` 와 `eslint-plugin-prettier`가  eslint 와 prettier를 통합해주는 역할을 합니다.

### reference
- [Why You Should Use ESLint, Prettier & EditorConfig](https://blog.theodo.com/2019/08/why-you-should-use-eslint-prettier-and-editorconfig-together/)
- [airbnb style guide](https://airbnb.io/javascript/)
- [airbnb react style guide](https://github.com/airbnb/javascript/tree/master/react)

## 1. 설정과 관련된 package 설치
- devDependency 에 아래 명시한 package 등록
- 이미 eslint와 각종 plugin이 깔려있을 수 있는데, 이번 migration 하면서 version 올리는 걸 추천드립니다.
```json
// package.json
{
	...
  "devDependencies": {
    "prettier": "2.2.1",
    "eslint": "7.22.0",
    "@typescript-eslint/eslint-plugin": "4.19.0",
    "@typescript-eslint/parser": "4.19.0",
    "eslint-config-airbnb": "18.2.1",
    "eslint-config-prettier": "8.1.0",
    "eslint-import-resolver-typescript": "2.4.0",
    "eslint-plugin-import": "2.22.1",
    "eslint-plugin-jsx-a11y": "6.4.1",
    "eslint-plugin-prettier": "3.3.1",
    "eslint-plugin-react": "7.23.1",
    "eslint-plugin-react-hooks": "4.2.0",
    "eslint-plugin-simple-import-sort": "5.0.3",
  },
}
```
- 위 처럼 package.json devDependency에 추가한 뒤 등록한 패키지를 설치하기 위해 `npm install` 을 해줍시다.

## 2. prettier 설정
- `.prettierc.js` 파일을 만들고 아래와 같이 세팅해줍니다. 참고([PR](https://github.com/banksalad/styleguide/pull/35))
```js
module.exports = {
  "$schema": "http://json.schemastore.org/prettierrc",
  "arrowParens": "avoid",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "jsxSingleQuote": false,
  "printWidth": 100,
  "proseWrap": "always",
  "quoteProps": "as-needed",
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false
}
```

## 3. editorconfig 설정
- .editorconfg 파일을 만들고 아래 내용을 붙여넣기 합니다.
```
# reference: https://github.com/airbnb/javascript/blob/master/.editorconfig
root = true

[*.{js,jsx,ts,tsx}]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
end_of_line = lf

# editorconfig-tools is unable to ignore longs strings or urls
max_line_length = off


[*.md]
max_line_length = 0
trim_trailing_whitespace = false
```

## 4. eslint 설정
- `.eslintrc.js` 파일을 만들고 아래와 같이 세팅해줍니다.
```js
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
    "no-console": ["warn", { "allow": ["error", "warn"] }],
    /* redux toolkit immer js를 위한 세팅 */
    "no-param-reassign": ["error", { props: true, ignorePropertyModificationsFor: ["state"] }],
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
    "import/no-cycle": "warn",
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
```
## 5. style guide 적용
```json
{
  "scripts": {
    ...
    "lint:fix": "eslint src --fix
}
```
- package.json script 에 `lint:fix` 를 등록합니다.
- `npm run lint:fix` 실행을 통해 lint 룰을 fix합니다.
- `auto fix` 가 가능한 부분(주로 formatting)들은 자동으로 수정이 됩니다.
- `auto fix` 가 안되는 부분(js, react lint rule 부분)은 직접 수정해야 하는데, 아래 섹션에서 다루겠습니다.

## 6. eslint auto fix 가 안되는 부분 해결
### 1) 1개의 rule 만 어긋나서 즉시 수정이 가능한 경우
- `"eslint src --fix` 로 auto fix를 했으나, 아래의 예시처럼 auto fix 가 되지 않는 부분이 있습니다. 이 부분은 직접 고쳐주셔야 합니다. 해당 rule을 참고하여 직접 고치셔야 합니다. 
![image](https://user-images.githubusercontent.com/35516239/112939766-fea74980-9166-11eb-9b58-3949cd32de7b.png)
- e.g. 저의 경우에는 array method(map, filter, some, every etc)의 callback 함수에 명시적인 return 함수가 없어서 발생하는 문제여서 `return false` 를 추가해서 직접 수정했습니다.

![image](https://user-images.githubusercontent.com/35516239/112942615-59db3b00-916b-11eb-9332-eab5a4dc2562.png)

### 2) 특정 rule에 대하여 여러 파일에 고쳐야 할 부분이 있는데, 고치는데 상당한 공수가 들어갈 경우

- 그런데 특정 rule과 어긋나는 부분이 너무 많아 migration 시에 한번에 다루기 힘든 경우가 있습니다.
- 저의 경우에는 상호파일간에 모듈을 서로 import 하는 파일들이 있어 순환참조 이슈가 있었는데, 단번에 해결할 방법을 찾지 못해 `"import/no-cycle": "warn"` rule을 추가해서  migration 을 진행했습니다.
- 이때는 아래 이미지와 같이 해당 Rule 을 warn으로 바꾸어서 일단 ci build에서는 통과시키고 TODO로 남겨두고 티켓을 생성한 뒤 추후 migration 하는 방법으로 해결합니다.

![image](https://user-images.githubusercontent.com/35516239/112943099-00274080-916c-11eb-8b93-15b078521f16.png)
- 단번에 진행하기 어려운 경우 이런 방식으로 일단 migration 하고 추후 해결하는 방법으로 진행합니다.

### 3) 특정 룰의 경우 특정 파일에서는 적용되지 않도록 하가는 설정
- e.g. 예를들어 `/.test.ts(x)?/` 처럼 test 코드에는 any 타입을 허용하고 싶을 수 있습니다. test code를 작성하다 보면 어쩔 수 없이 any 타입을 사용하게 되는 경우가 많은데, 그 부분을 lint rule에 맞춰 일일히 타입을 지키는 것은 ROI(Return On Investment) 가 낮을 수 있습니다.
- 그럴 때는 아래와 같이 override 를 설정하면 됩니다.

```js
{
  overrides: [
    {
      "files": ["**/*.test.ts?(x)"],
      "rules": {
        "@typescript-eslint/no-explicit-any": "off",
      }
    }
  ]
}
```
- 위 설정을 해석해보면 test 파일의 경우에는 암묵적인 any type 옵션을 끄겟다는 의미입니다.
- files 안의 문자열은 [glob pattern](https://www.malikbrowne.com/blog/a-beginners-guide-glob-patterns) 으로 [glob tester](https://www.digitalocean.com/community/tools/glob?comments=true&glob=%2A%2A%2F%2A.test.ts%3F%28x%29&matches=false&tests=%2F%2F%20This%20will%20match%20as%20it%20ends%20with%20%27.js%27&tests=ssda%2Fhello.test.tsx&tests=%2F%2F%20This%20won%27t%20match%21) 로 테스트 할 수 있습니다.

### 4) CI 및 Npm script 확인
#### (1) server 폴더가 없는 레포의 경우
- 별도의 CI 수정이 필요없습니다. root 폴더에 style guide 설정만 적용해주시면 됩니다.
#### (2) server 폴더가 있는 레포의 경우 
-  root 폴더의 package.json root 에서 `npm run lint` 명령어를 수행하면 server 와, client 폴더에서 lint가 수행되어야 합니다.
```json
  "scripts": {
     //...
    "lint": "cd server && npm run lint && cd ../client && npm run lint",
     //...
  },
```
- CI 에서 Lint job을 수행할시 client 와 root에 모두 package 설치가 필요합니다.
![image](https://user-images.githubusercontent.com/35516239/113546467-04010a00-9627-11eb-83d6-c27c84392824.png)
```yml
# ...
jobs:
  lint:
    name: Lint
    runs-on: [self-hosted, default]
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 5

      - name: Use Node.js
        uses: actions/setup-node@v1
        with:
          node-version: '12.18.0'
          registry-url: 'https://npm.pkg.github.com'

      - name: Install Dependencies - Root
        run: npm install

      - name: Install Dependencies - Client
        run: npm install
        working-directory: client
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GH_WEB_PACKAGES_TOKEN }}

      - name: Check Lint
        run: npm run lint
# ...

```



# Editor 별 eslint, editoronfig 세팅

아래 세팅을 통해서 에디터에서 특정 파일을 수정하고 저장할 때 자동으로 `lint --fix` 가 작동하고, tab size, eof와 같은 에디터 설정도 editorconfig 에 파일에 명시된 대로 overriding 합니다. 따라서 vscode, webstorm 등 에디터와 무관하게 동일한 코드를 생산할 수 있습니다.
## 1.vscode
### 1) vscdoe editorconfig
- [editorconfig for vs code plugin](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)을 설치해주시면 됩니다. 별도의 설정은 필요 없습니다.
![image](https://user-images.githubusercontent.com/35516239/112944158-6d87a100-916d-11eb-8d30-36e8f89c9761.png)

### 2) vscode eslint 설정
- [vscode eslint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 을 설치합니다.
- workspace 중 client 폴더에만 eslint rule이 적용되도록 세팅합니다. 이 설정이 없으면 root 폴더를 기준으로 eslint 를 검사하기 때문에, client에만 설정파일이 있는 경우에 해당 extension이 제대로 작동하지 않습니다. (이 세팅은 user setting 이 아닌 workspace 세팅이 필요합니다.)
- root folder에 `.vscode` 폴더를 만들고 해당 폴더 아래에 `.setting.json` 만들고 아래 내용을 붙여넣습니다. (server 폴더가 별도 없는 repo의 경우 이 설정을 별도 진행하지 않으셔도 됩니다.)
```json
{
	"eslint.workingDirectories": [ "./client, ./server" ],
}
```
![image](https://user-images.githubusercontent.com/35516239/112945259-04a12880-916f-11eb-8332-e440e118b75c.png)
- `cmd + shift + p` -> `setting.json` 타이핑 -> `open setting.json` 을 선택합니다.
![image](https://user-images.githubusercontent.com/35516239/112944614-09b1a800-916e-11eb-81b8-4cac5f00909a.png)
- 열려있는 user.setting.json 에 하기 설정을 적용합니다. 파일 저장시에 자동으로 eslint autofix 가 되도록 하는 세팅입니다. 
```json
{
  "eslint.alwaysShowStatus": true,
  "eslint.format.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
  ],
  "[javascript]": {
    "editor.formatOnSave": false,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
    },
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[javascriptreact]": {
    "editor.formatOnSave": false,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
    },
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[typescript]": {
    "editor.formatOnSave": false,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
    },
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[typescriptreact]": {
    "editor.formatOnSave": false,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
    },
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
}
```
- 이제 아래 처럼 vscode가 lint 이슈에 밑줄을 그어주고, 저장할 경우 lint fix를 auto fix가 가능한 부분은  자동 수정을 해줍니다.
![image](https://user-images.githubusercontent.com/35516239/112945895-d40dbe80-916f-11eb-87be-1a0d05f3a808.png)

## 2. webstorm 
### 1) webstorm editor config 설정  
- editorconfig 가 webstorm의 code style을 override 할 수 있도록 설정합니다.
![image](https://user-images.githubusercontent.com/35516239/112961269-2d7de980-9180-11eb-993b-551f6cfe749a.png)

### 2) eslint 설정
- 저장시 eslint --fix 가 되도록 세팅합니다.
![image](https://user-images.githubusercontent.com/35516239/112961501-66b65980-9180-11eb-9f63-7776a489f02e.png)
