# Rainist Web Style Guide

Rainist 웹팀 구성원을 위한 전반적인 코드 스타일 가이드입니다.  
JavaScript 코드 작성 규칙과 네이밍 규칙, 파일 import 규칙 등을 포함하고 있습니다.


## 프로젝트 구성

프로젝트 초기 세팅에 [web-template-pizza](https://github.com/Rainist/web-template-pizza) 템플릿을 사용합니다.  
(이 템플릿은 [web-baedal](https://github.com/Rainist/web-baedal)을 통해 scaffolding할 수 있습니다.)


## 목차
- [General Rules](#general-rules)
  - [Trailing commas](#trailing-commas)
  - [Eol last](#eol-last)
  - [No Empty File](#no-empty-file)
  - [Line length 100](#line-length-100)
  - [Line break](#line-break)
  - [Semicolon](#semicolon)
  - [Indentation](#indentation)
  - [Padding lines between statements](#padding-lines-between-statements)
  - [Comma spacing](#comma-spacing)
  - [Object curly spacing](#object-curly-spacing)
  - [Spacing around infix operators](#spacing-around-infix-operators)
  - [Single quotes](#single-quotes)
  - [Function declaration](#function-declaration)
- [Naming Rules](#naming-rules)
  - [Variables](#variables)
  - [Constants](#constants)
  - [Class Name](#class-name)
  - [Name attribute](#name-attribute)
  - [Id](#id)
  - [Interface](#interface)
  - [Enum](#enum)
  - [Folder/File Name](#folderfile-name)
- [File Import Rules](#file-import-rules)
  - [Absolute path import](#absolute-path-import)
  - [Import sort](#import-sort)
  - [Style import](#style-import)
  - [Image import](#image-import)


----------------------------


## General Rules
### Trailing commas

마지막 element 또는 property가 다른 라인인 경우에만 trailing comma를 허용한다.

```javascript
// bad
var foo = {
  bar: "baz",
  qux: "quux"
};

// good
var foo = {
  bar: "baz",
  qux: "quux",
};
```

```javascript
// bad
var foo = { bar: "baz", qux: "quux", };

// good
var foo = { bar: "baz", qux: "quux" };
```

```javascript
// bad
var arr = [1,2,];

//good
var arr = [1, 2];
```

```javascript
// bad
var arr = [
  1,
  2
];

// good
var arr = [
  1,
  2,
];
```


### Eol-last

빈 파일이 아닌 경우 항상 코드의 마지막에 newline 한 줄이 있어야 한다.

```javascript
// bad
function doSmth () {
  var foo = 2;
}

// good
function doSmth () {
  var foo = 2;
}\n
```


### No Empty File

내용이 없는 빈 파일은 commit을 하지 않는다.


### Line length 100

코드는 주석을 포함하여 한 줄 당 최대 100자 이하로 작성한다. (url은 제외한다.)  
너무 긴 변수명과 함수명을 지양하며, 한 줄에 길게 쓰는 대신 여러 줄로 분리하여 코드의 가독성을 높인다.

```javascript
// bad
if (thisIsLongVariableName !== HelloWorld.longName.longName && thisIsLongVariableNameTwo === HelloWorld.longName) {
}
```


### Line break

#### Conditional statements

if문이나 while문 등의 조건식이 100자를 초과하는 등 지나치게 길어진다면 조건식을 변수에 담고 아래 예시와 같이 줄바꿈하여 사용한다.  

```javascript
// bad
if (thisIsLongVariableName !== HelloWorld.longName.longName && thisIsLongVariableNameTwo === HelloWorld.longName) {
}

// good
let condition = thisIsLongVariableName !== HelloWorld.longName.longName
  && thisIsLongVariableNameTwo === HelloWorld.longName;

if (condition) {

}

// bad
while (variableName + variableName2 >= variableName3 || variableName + variableName2 <= variableName4) {

};

// good
let condition2 = (variableName + variableName2) >= variableName3
  || (variableName + variableName2) <= variableName4;

while (condition2) {

}
```

#### If-else

if-else문은 1줄만 작성하더라도 가독성을 위해 curly braces`{}`를 생략하지 않으며, 다음과 같이 줄바꿈을 한다.

```javascript
// bad
if (true) console.log('hello');

if (true)
  console.log('hello');

if (true) { console.log('hello'); } else { console.log('world'); }

if (true)
  console.log('hello');
else
  console.log('world');

// good
if (true) {
  console.log('hello');
}

if (true) {
  console.log('hello');
} else {
  console.log('world');
}
```

#### Ternary operator

3항 연산자의 길이가 너무 길어져서 100자를 초과하는 경우 아래와 같이 줄바꿈한다.

```javascript
// bad
let foo = isLongLongLongLongName ? 'hellohellohellohellohellohello' : 'worldworldworldworldworldworld';

// good
let foo = isTrue ? 'hello' : 'world';
let foo = isLongLongLongLongName
  ? 'hellohellohellohellohellohello'
  : 'worldworldworldhellohellohello';
```

#### Array & Object

배열과 객체 선언이 너무 길어진다면 아래와 같이 줄바꿈한다.

```javascript
// bad
const fooooo = ['longlonglongName1', 'longlonglongName2', 'longlonglongName3', 'longlonglongName4'];
const baaaar = { a: 'longlonglongName1', b: 'longlonglongName2', c: 'longlonglongName3', d: 'longlonglongName4' };

// good
const fooooo = [
  'longlonglongName1',
  'longlonglongName2',
  'longlonglongName3',
  'longlonglongName4',
];
const bar = {
  a: 'longlonglongName1',
  b: 'longlonglongName2',
  c: 'longlonglongName3',
  d: 'longlonglongName4',
};
```

#### Function Parameters

함수 정의 시 나열하는 parameter의 길이가 너무 길어서 100자를 초과한다면 아래와 같이 줄바꿈한다.

```javascript
// bad
function fooooo ('longlonglongName1', 'longlonglongName1', 'longlonglongName3', 'longlonglongName4') {

}
// good
function fooooo (
  'longlonglongName1',
  'longlonglongName1',
  'longlonglongName3',
  'longlonglongName4'
) {

}
```


### Semicolon

각 statement의 끝에는 semicolon을 붙인다.

```javascript
// bad
var name = 'hello'
var foo = function () {
  var bar = 'world'
}

// good
var name = 'hello';
var foo = function () {
  var bar = 'world';
};
```


### Indentation

2-space indentation을 따른다.

```javascript
// bad
function foo () {
    if (true) {
        var baz = 1;
    }
}

// good
function foo () {
  if (true) {
    var baz = 1;
  }
}
```


### Padding lines between statements

모든 statement와 return문 사이에는 1줄 이상의 blank line을 넣는다.

```javascript
// bad
function foo () {
  var a = 1;
  return a;
}

// good
function foo () {
  var a = 1;

  return a;
}
```


### Comma spacing

comma의 앞에는 space를 허용하지 않는다. 반대로 comma 뒤에는 space를 붙이도록 한다.

```javascript
// bad
var foo = 1 ,bar = 2;

// good
var foo = 1, bar = 2;

// bad
var arr = [1 , 2];

// good
var arr = [1, 2];
```


### Object curly spacing

Object literal이나 destructuring assignments, import/export specifiers에 쓰이는 괄호 안에 space를 꼭 넣는다.  
다만 괄호 안의 괄호끼리는 space를 제거한다.

```javascript
// bad
var obj = {foo: 1, bar: 2};

// good
var obj = { foo: 1, bar: 2 };

// bad
var obj = { foo: { baz: 1, bar: 2 } };

// good
var obj = { foo: { baz: 1, bar: 2 }};
```


Array의 경우 space를 허용하지 않는다.

```javascript
// bad
var arr = [ 1, 2, 3, ];

// good
var arr = [1, 2, 3];

// bad
var arr = [ { foo: 1 }, { bar: 2 } ];

// good
var arr = [{ foo: 1 }, { bar: 2 }];
```


### Spacing around infix operators

`(a + b) * c / d + e`와 같이 infix 표기 시 연산자 주변에는 space가 한 칸씩 있어야 한다.

```javascript
// bad
let a=1+2;
let foo = 'hello'|undefined;

// good
let a = 1 + 2;
let foo = 'hello' | undefined;
```


### Single quotes

모든 경우에 single quotation('')을 사용한다. 다만, backtick(``)은 치환을 위해 허용된다.

```javascript
// bad
var double = "double";
var unescaped = "a string containing 'single' quotes";

// good
var double = 'single';
var unescaped = `back${x}tick`;
```


### Function declaration

함수 선언 시 다음과 같은 규칙을 따르며, 같은 프로젝트 내에서 함수 표현식과 함수 선언식을 섞어 쓰지 않는다.

**함수 표현식(Function Expression)** 사용 시 아래와 같이 띄어쓰기하며, 선언문 끝에 semicolon을 붙인다.

```javascript
// bad
const foo = function() {

};

const foo = () =>{

};

// good
const foo = function () {

};

const foo = () => {

};
```


**함수 선언식(Function Declaration)** 사용시 아래와 같이 띄어쓰기하며, semicolon을 붙이지 않는다.

```javascript
// bad
function foo() {

}

// good
function foo () {

}
```


----------------------


## Naming Rules

### Variables

Camel case를 따른다.

```javascript
let targetName = 'hello';
```


### Constants

상수 선언 시 알파벳 대문자와 언더바`_`를 사용한다.

```javascript
const MAX_LENGTH = 3;
const COLOR_THEME = {
  THEME: 'dark',
  COLOR: 'blue',
};
```


### Enum

enum 정의 시 Camel case 형태로 하면서 첫 글자를 대문자로 한다.  
enum으로 선언하는 각 constants는 대문자와 언더바`_`로 작성한다.

```javascript
enum ApplicationEnv {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

enum Direction {
  NORTH_WEST,
  SOUTH_EAST,
}
```


### Class Name

PostCSS나 css.module & css in js을 사용하는 경우  
되도록이면 간단한 한 단어로 네이밍하고, 2 단어 이상 시 Camel case를 따른다.  
(Css module 사용 시 Camel case를 따르는 이유는 css를 object의 형태로 불러와 사용하기 때문이다.)

```jsx
<div className={ s.headerData }></div>
```

위와 같은 경우를 제외하고 다른 모든 경우에는 Kebab case를 따른다.

```html
<div class='app-content'></div>
```


### Name attribute

Input radio나 checkbox 등의 name 속성은 언더바`_`를 사용한 Snake case를 따른다.

```html
<input
  type='radio'
  name='radio_btn_group'
/>
```


### Id

dom element의 id 속성은 Camel case를 따른다.

```html
<table id='myTable'></table>
```


### Interface

typescript의 interface 정의 시 Camel case형태로 하면서 첫 글자를 대문자로 한다.

```javascript
interface FooConfig {
  foo: num;
}
```


### Folder/File Name

폴더와 파일 이름은 하이픈`-`과 함께 Kebab case를 따르며 영문 소문자만 사용한다.  
Test파일 폴더 이름은 예외적으로 `__tests__`를 사용한다.

```
# folder name
card-ranking
__tests__

# file name
index.tsx
view-model.tsx

left-arrow.png
icon-home.jpg
```


----------------


## File Import Rules

### Import sort

파일을 import할 때는 `npm packages/Node.js builtins`와 `절대 경로 import`, `상대 경로 import`를 group화하여 분류하고 사이 사이에 빈 줄로 구분한다.  

이 부분은 [eslint-plugin-simple-import-sort](https://www.npmjs.com/package/eslint-plugin-simple-import-sort) 플러그인 설치 후 lint 설정으로 적용 가능하며 [web-template-pizza](https://github.com/Rainist/web-template-pizza) 템플릿에 기본 설정되어있다.

```javascript
// before
import React from "react";
import Button from "../Button";

import styles from "./styles.css";
import type { User } from "../../types";
import { getUser } from "../../api";

import PropTypes from "prop-types";
import classnames from "classnames";
import { truncate, formatNumber } from "../../utils";

// after
import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { getUser } from "../../api";
import type { User } from "../../types";
import { formatNumber, truncate } from "../../utils";
import Button from "../Button";
import styles from "./styles.css";
```


### Absolute path import

모든 파일은 되도록이면 webpack alias 설정을 통해 절대 경로로 import한다.  
(webpack 설정 예시)
```javascript
  resolve: {
    // ...
    alias: {
      '@': path.join(__dirname, 'src'),
    },
    // ...
  },
```
```
// good
import { App } from '@/components';
```


### Style import

style을 위한 css, 혹은 scss, pcss 파일을 Import할 때는 소문자 s를 사용한다.

```javascript
import s from './styles.pcss';
```


### Image import

image file을 import할 때는 image를 표현하는 영어 단어를 Camel case로 표현한다.

```javascript
import leftArrow from '../img/left-arrow.png';
```
