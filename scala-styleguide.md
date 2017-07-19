# Scala Style Guide

[레이니스트](https://github.com/Rainist)의 Scala Style Guide입니다.

## **주의**

Style Guide의 규칙을 전부 잘 숙지해야만 좋은 스타일의 코드를 작성할 수 있는 것은 아닙니다. 기존에 작성된 코드를 통해 최대한 스타일을 익히고, 모호한 상황에만 Style Guide를 찾았으면 좋겠습니다. :)

## 목차
  1. [들여쓰기](#indentation)
  1. [한 줄의 최대 길이](#max-characters)
  2. [주석](#comments)
    2. [TODOs](#todos)
    2. [Scaladoc](#scaladoc)
  3. [비동기 프로그래밍](#async-programming)
    3. [Futures](#futures)
    3. [Monix](#monix)
  4. [모나드를 이용한 프로그래밍](#monadic-programming)
    4. [for comprehension](#for-comprehension)

<a name="indentation"></a>
## 들여쓰기

  * 2개의 공백을 들여쓰기의 기본 단위로 사용합니다.

```scala
object Main extends App {
  def factorial(n: Int): Int = {
    if (n == 0) 1
    else {
      n * factorial(n - 1)
    }
  }

  for (i <- 1 to 10) {
    println(factorial(i))
  }  
}
```
  * `case` 문은 `match`보다 한 번 더 들여쓰기 합니다.

```scala
def matchOptInt(n: Option[Int]): Int = {
  n match {
    case Some(x) if x >= 10 => 10
    case Some(x) => x
    case None => -1
  }
}
```

<a name="max-characters"></a>
## 한 줄의 최대 길이
한 줄에 **최대 120개의 글자**만 있어야 합니다.

<a name="comments"></a>
## 주석

<a name="todos"></a>
### TODOs
  * 아직 미완성인 코드는 `TODO`를 주석으로 달아주세요. `TODO` 뒤에 오는 괄호 안에는 `TODO`를 작성하는 사람의 이름 혹은 닉네임을 넣어주세요.

```scala
// TODO(Hyun Min Choi): implement fibonacci function
def fibonacci(n: Int): Int = {
  if (n <= 1) n
  else -1
}
```

  * `TODO`와 `//`사이에 정확히 한 개의 공백이 있어야 합니다.
```scala
//TODO(Rainist): fix this BAD comment
// TODO(Rainist): this is good
```

  * `TODO`와 다음 줄의 들여쓰기를 맞춰주세요.
```scala
    // TODO(Hyun Min Choi): DON'T do this
  def todo: Unit = println("TODO...")

  // TODO(Hyun Min Choi): this is good
  def todo: Unit = println("TODO...")
```

<a name="scaladoc"></a>
### Scaladoc

(TBD)...

<a name="async-programming"></a>
## 비동기 프로그래밍

(TBD)

<a name="futures"></a>
### Futures

  * 비동기적인 `Future`에서 동기적인 값을 얻는 것을 최대한 자제해주세요. Thread가 block됩니다.

```scala
import scala.concurrent._
import scala.concurrent.duration._

// freeze를 실행하는 Thread가 영구적으로 block될 수 있습니다.
def freeze(future: Future[Int]): Int = {
  Await.result(future, Duration.Inf)
}
```

  * 최대한 `scala.concurrent.ExecutionContext.Implicits.global`을 import하지 마세요. 메소드에 implicit하게 넘겨주는 것이 가장 권장되는 방법입니다.

#### 비추천
```scala
/**
 * This is a BAD usecase
 */

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

def mapFuture(future: Future[Int]): Future[Int] =
  future.map(_ * 2) // map의 implicit executor가 global implicit으로 resolve하면서, mapFuture의 `ExecutionContext`를 외부에서 주입하는 것이 불가능해집니다.
```

#### 권장
```scala
/**
 * This is better
 */

import scala.concurrent.{Future, ExecutionContext}

def mapFuture(future: Future[Int])(implicit ec: ExecutionContext): Future[Int] =
  future.map(_ * 2) // map의 implicit executor가 ec로 resolve됩니다.
```

  * 다중 중첩된 `map`, `flatMap`은 for comprehension을 통해 더욱 간결한 코드로 바꿀 수 있습니다. 그러지 못할 것 같아도 할 수 있습니다.

```scala
// TODO(Hyun Min Choi): think up of an example!
```

<a name="monix"></a>
### Monix

[Monix](https://github.com/typelevel/monix)는 Scala의 Future의 강화된 버전입니다. Purely functional한 비동기 프로그래밍을 하고 싶다면 Monix를 사용해보세요.

<a name="monadic-programming"></a>
## 모나드를 이용한 프로그래밍

어떤 타입 `M[T]`가 모나드라는 것은, `T`에 대한 컨텍스트를 들고 있는 강화된 타입이라는 것입니다. **for comprehension과 같은 기능을 더욱 자유자재로 사용하기 위해선 모나드에 대한 기본적인 이해가 필요합니다.**

<a name="for-comprehension"></a>
### for comprehension

  * 중첩되지 않은 for comprehension의 우항의 타입은 전부 같은 모나드여야 합니다.

```scala
/**
 * This code doesn't even work.
 */
val t1: Task[Int] = ???
val t2: Task[Int] = ???
val o1: Option[Int] = ???
val o2: Option[Int] = ???

// does not compile
for {
  a <- t1
  b <- t2
  c <- o1
  d <- o2
} yield a + b + c + d

// this works!
for {
  a <- t1
  b <- t2
} yield a + b

// this also works!
for {
  a <- o1
  b <- o2
} yield a + b
```

  * 2개 이상의 statement가 for comprehension에 놓이게 될 경우,
    1. for comprehension에 curly brace를 작성하고
    2. statement 마다 개행을 해주세요.

```scala
// BAD
for (i <- 1 to 10; j <- 1 to 10) yield i + j

// GOOD
for {
  i <- 1 to 10
  j <- 1 to 10
} yield i + j
```
