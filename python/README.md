# Rainist Python Style Guide

Rainist 구성원이 파이썬 코드를 작성할 때 참고할 스타일 가이드입니다.

## 프로젝트 구성

* 프로젝트의 초기 세팅에 [cookiecutter](https://github.com/audreyr/cookiecutter)와 [Rainist/python](https://github.com/Rainist/python) 템플릿을 사용합니다.
* 해당 템플릿을 사용해 아래에 기술된 컨벤션에 맞는 각종 설정 파일을 구성할 수 있습니다.

## 메타원칙

* [PEP8](https://www.python.org/dev/peps/pep-0008/)을 준수합니다.
* [Google Python Style Guide](https://google.github.io/styleguide/pyguide.html)를 참고합니다.

## 원칙

### 일반

* [하드 코딩된 모든 값<sub>magic literal</sub>](https://refactoring.com/catalog/replaceMagicLiteral.html)은 상수로 선언합니다.
* 전역 변수를 사용하지 않습니다.
	* `app`, `db`, `config`등의 변수들을 실행시켜줘야 할 때는 `main()`함수를 선언한 뒤 그 안에서 사용합니다.
* 상수에 `__contains__`할 땐 상수를 set으로 사용합니다.
	* e.g. `value in {1, 2, 3}`

### 버전

* Python 3.6 이상을 사용합니다.
* 마이너 업데이트가 있을 시 첫 패치 업데이트 이후 사용합니다.
	* 예) 3.7 버전은 3.7.1 이후로 사용

### Trailing comma

트레일링 콤마 사용을 권장합니다. 트레일링 콤마를 사용한다면 git diff를 볼 때 실질적으로 바뀐 부분에만 집중할 수 있으며 에디터에서 한 줄을 복제하거나 제거할 때 성가심을 줄여주고 실수를 방지합니다.
한 프로젝트에선 하나의 스타일로 통일해 사용합니다.

```diff
 # non trailing comma
 def func(
-    hint: Optional[Dict[str, Any]] = None,
-    sort: Optional[Dict[str, Any]] = None
+    hint: Optional[Dict[str, Any]] = None
 )
```

```diff
 # with trailing comma
 def func(
     hint: Optional[Dict[str, Any]] = None,
-    sort: Optional[Dict[str, Any]] = None,
 )
```

```python
labels = [
    'apple',
    'crumble',
]
# a few moment later
labels = [
    'apple',
    'banana'  # <- New element with missing comma
    'crumble',
]
```

### Single quote, double quote

둘 중 무엇이든 한 프로젝트에선 하나의 스타일로 통일성을 유지하게끔 사용합니다.

* [PEP257](https://www.python.org/dev/peps/pep-0257/#what-is-a-docstring)에 따라 docstrings에는 triple double quotes를 사용합니다.
* [google styleguide](https://google.github.io/styleguide/pyguide.html#310-strings)에서는 single이든 double이든 일관성있게 사용하도록 권장하며 `\\` 이스케이프를 피하고자 둘을 잠시 혼용하는 걸 허용합니다.
* black 포매터는 double quote를 강제합니다. 만약 single quote로 포맷을 맞추고 싶다면 `-S` 옵션과 함께 사용합니다.

### Line length

1줄은 79자까지 작성합니다.

PEP8의 언급에 따르면 파이썬 표준 라이브러리는 코드에 79자, 주석과 docstring에 72자를 사용하고 있기에 이를 규칙으로 사용합니다.
코드를 작성하다 보면 종종 한 줄에 79자를 넘기곤 합니다. 그렇지만 한 줄에 79자가 넘어가는 상황은 무언가 좋지 않다는 신호일 가능성이 높습니다. 너무 깊은 indent, 긴 변수명과 함수명, 너무 깊은 import가 보통 한 줄에 79자를 넘기게 만드는 원인이 되곤 합니다. 이는 깊은 indent를 함수로 분리하기, 여러 줄에 걸쳐 import 작성하기 등 다른 방식으로 리팩토링을 해야 할 문제이지 max line length를 100자 이상으로 늘려 해결할 일이 아닙니다. 이런 해결책은 오히려 우리를 코드 냄새에 관대해지도록 만듭니다. 더불어 이러한 79자 규칙은 코드 린트 도구로 자동화할 수 있습니다.

### Assert와 If 문

assert는 오로지 test 용으로만 사용합니다.

[assert statement](https://docs.python.org/3/reference/simple_stmts.html#the-assert-statement)는 문서에서 언급되었다시피 디버깅용 검사 구문으로 의도되었습니다. `__debug__`과 함께 사용되는 if 문의 shortcut이며 이는 python을 실행할 때 `-O`(Optimize) 플래그와 함께 사용하면 모든 assert 구문을 무시하는 동작에서도 짐작할 수 있습니다. 그렇기 때문에 assert는 test 검증용으로 사용해야 하며 유저가 어드민인지, 값이 제대로 들어 있는지 등 비즈니스 로직 상 검사하는 용도로 사용하지 않아야 합니다.

* 참고: [구글 파이썬 가이드 - Exception](https://google.github.io/styleguide/pyguide.html#244-decision)

### line break

`\`보단 `()`를 사용합니다.

> 긴 줄을 래핑하는 가장 좋은 방법은 괄호, 대괄호 및 중괄호를 사용하는 것입니다. 긴 줄은 괄호로 묶어서 여러 줄로 나눠질 수 있습니다. 이 괄호들은 백 슬래시보다 우선적으로 사용되어야 합니다. - [PEP8](https://www.python.org/dev/peps/pep-0008/#maximum-line-length)

### indent style

함수 선언이 79자가 넘어간다면 한 줄에 하나의 인자씩 적어주고 마지막 인자 뒤 트레일링 콤마를 붙이고 Parentheses를 다음 줄에서 닫아줍니다.

auto formatter중 하나인 black의 기본 동작이기도 합니다.

```python
def func(
    if_some_variables: Optional[List[str]],
    over_the_80_width: Optional[int],
    separate_lines: bool = True,
) -> int:
    return 42

def foo(short: int) -> None:
    pass
```

### Lint tool

- [x] [pylint](https://www.pylint.org/): eslint처럼 작성된 파이썬 코드에 잘못된 부분은 없는지, 더 개선할 부분은 없는지 자동으로 검사해주는 린트 도구입니다. [`.pylintrc`](https://github.com/Rainist/python/blob/master/%7B%7Bcookiecutter.project_slug%7D%7D/.pylintrc) 파일을 통해 세부적인 옵션을 조정할 수 있습니다.
- [x] [isort](https://github.com/timothycrosley/isort): import order를 자동으로 정렬해주는 도구입니다. [`.editorconfig`](https://github.com/Rainist/python/blob/master/%7B%7Bcookiecutter.project_slug%7D%7D/.editorconfig) 혹은 `.isort.cfg`로 세부적인 옵션을 조정할 수 있습니다.
- [ ] [black](https://github.com/ambv/black): auto formatter 중 하나입니다. [medium 아티클](https://medium.com/3yourmind/auto-formatters-for-python-8925065f9505)에서 볼 수 있듯 다른 포매터도 있지만 black을 제안하는 이유는 따로 설정해줘야 할 부분이 적으며 위에서 주장한 스타일에 가장 근접하게 동작하는 도구이기 때문입니다. 다만 포매터는 기호가 있을 수 있는 부분이며 없어도 충분히 Rainist의 스타일에 맞는 코드를 작성할 수 있기에 이는 개인에 판단에 따라 사용합니다.

### [`pre-push` hook](https://github.com/Rainist/python/blob/master/%7B%7Bcookiecutter.project_slug%7D%7D/bin/pre-push)

위에서 결정된 lint 도구들을 커밋 작성 전에 실행되는 git pre push hook으로 설정하여 완전히는 아니더라도 잦은 스타일 코드 리뷰, 실수 등을 줄이고자 합니다.

### 테스트 코드

* 테스트 코드는 `tests` 폴더에 작성하고 프로젝트 최상위 경로에 위치시킵니다.
* [pytest](https://docs.pytest.org/en/latest/)를 이용해 작성합니다. pytest는 파이썬 기본 내장 unittest에 비해 간결하고 깔끔한 테스트 코드를 작성할 수 있으며 더 읽기 쉬운 에러 리포트를 출력하며 fixture기능을 적극적으로 활용할 수 있고 여러 플러그인 또한 지원됩니다.
    * 참고: [unittest와 pytest를 비교해보는 글](https://blog.daftcode.pl/the-cleaning-hand-of-pytest-28f434f4b684)

### 축약어<sub>abbreviation</sub>와 두문자어<sub>acronym</sub>

* PascalCase 혹은 camelCase 사용 시에 다음의 규칙을 적용합니다.
* 축약어는 모두 첫 글자만 대문자
	* 예) simpleApp (application), currentMax (maximum)
	* 단 2글자 축약어는 모두 대문자
		* 예) userID (identity)
* 두문자어는 모두 대문자
	* 예) HTTP, HTML, URL, DB, UUID, JSON, IO
	* 예) URLBuilder, IOStream, HTTPClient

### map, filter, reduce or list comprehension

list comprehension 사용합니다. 언어적 차원에서 더 편한 문법을 제공하므로 이를 적극적으로 활용합니다.

```python
# OK
amounts = [amount.value for amount in amounts if amount]

# Not recommend
amounts = list(map(labmda a: a.value, filter(None, amounts)))
```

### `requirements.txt` 관리

`requirements.txt`와 `requirements-dev.txt` 두 개로만 나눠 사용하고 프로젝트 최상위 경로에 위치시킵니다. Production 환경에 필요한 의존성들은 앞 파일에 넣고, lint, test, 로컬 개발에 필요한 의존성들(pytest, pylint, isort 등)은 뒤 파일에 넣습니다. 일부 패턴에선 `lint.txt`, `prod.txt`, `test.txt`등을 사용하지만 이는 프로덕션 환경을 위한 `requirements.txt`, 그 외 환경을 위한 `requirements-dev.txt` 두 파일로 커버 가능합니다.

* [pipenv](https://github.com/pypa/pipenv): 의존성을 관리하기 위한 도구 중 하나입니다. 가상환경 생성, lock 파일을 통한 의존성 관리가 가능하고 `pipenv lock -r > requirements.txt`와 같이 하위호환성도 유지할 수 있습니다. "pipenv만 쓰자!"가 아닌 의존성 관리 도구 중 하나로 소개하고 개인의 판단에 따라 사용합니다.
