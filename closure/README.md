# Closure

### 출처

<a href='https://offbyone.tistory.com/135'></a>
<br />
클로져를 이해해 보자!
<br/>

## 클로져를 이해하기 전 알아야 할 개념들

자바스크립트에서 클로저라는 것을 잘 이해하기 위해서는 프로그래밍 언어에서 사용되는 몇가지 개념들을 먼저 알아둬야 한다.
<br/>
그것들은 <b>일급객체 (first-class object) 또는 일급함수 (first-class function), 변수 범위, 중첩 함수</b>와 같은 것들이다.
<br />

### 일급 객체 또는 일급 함수

```
일급객체에 대한 위키피디아 정의
원문: https://en.wikipedia.org/wiki/First-class_citizen

프로그래밍 언어를 디자인 할 때 주어진 프로그래밍 언어에서 일급 시민(또는 일급 타입, 일급 객체, 일급 엔티티, 일급 값)은 다른 엔티티들이 일반적으로 이용 가능한 모든 연산을 지원하는 엔티티를 뜻한다. 여기서의 연산은 전형적으로 인자로 전달되고, 함수의 반환값으로 사용되고, 수정되고, 변수에 할당하는 것을 포함한다.
```

자바스크립트의 함수는 일급 함수이다. 함수는 사실 객체이므로 일급 객체라고도 한다. 클로져 사용법을 이야기 하기에 앞서, 일급 함수가 중요한 이유는 자바스크립트에서 클로져를 만들기 위해서는 함수를 변수에 대입하고, 반환값으로 반환하는 작업이 필요하기 때문이다.

<br/>

### 변수의 범위(Scope) 및 수명(Lifetime)

자바스크립트 변수들은 지역(local) 또는 전역(global)의 변수 범위를 가진다.
<br>
함수 내에서 정의한 변수는 지역변수이고, 정의된 함수 내에서만 사용되어질 수 있다. 다른 함수에서는 사용할 수 없다.

```
function printName() {
    var name = "김철수";
    console.log(name);
}

결과) 김철수
```

함수 밖에서 정의된 변수는 전역변수 이다. 전역 변수는 윈도우(window) 객체에 속하고, 페이지 내의 모든 스크립트에서 사용되어질 수 있다.

```
var name = "홍길동";

function printName() {
    console.log(name);
}

결과 )
홍길동
```

같은 이름을 가지는 전역변수와 지역변수가 있을 때 이 둘은 서로 다른 변수이다. 하나를 변경하더라도 다른것에는 영향이 없다. 함수 내에서 전역 변수와 같은 이름의 지역변수를 정의하면, 전역변수는 가려져서 사용할 수 없게 된다.

```
var name = "홍길동";
function printName() {
    var name = "김철수";
    console.log(name);
}

printName(); // 김철수
console.log(name); // 홍길동
```

- 변수 생성 시 var/let/const 키워드 사용 없이 만들었다면, 이 변수는 항상 전역변수이다. 이것이 함수안에서 만들어졌다고 하더라도, 전역변수가 되어버린다.

```
function printName() {
    name = '홍길동'
    console.log(name)
}
printName() // 홍길동
console.log(name) // 홍길동
```

### 변수의 수명 (lifetime)

- 전역 변수: 애플리케이션 (윈도우 또는 웹페이지)가 살아있는 동안 유지.
- 지역변수: 수명이 짧다. 함수가 호출 될 때 함수안에서 생성되고, 함수가 종료될 때 지워진다.

### 중첩 함수 (Nested Function)

중첩 함수는 함수 내에서 또 함수를 정의하고, 사용하는 것을 말한다.
<br/>
앞에서 보았듯, 함수 내에서 함수 외부의 변수에 접근할 수 있었다. 중첩함수에서도 외부의 변수에 접근이 가능하다.

```
var global_name = '홍길동'

function printName() {
    var outer_name = '김철수'
    function showName() {
        var inner_name = '김영희'
        console.log(global_name) // 홍길동
        console.log(outer_name) // 김철수
        console.log(inner_name) // 김영희
    }

    showName();
}

printName();

결과 )
홍길동
김철수
김영희

```

### 함수의 저장 및 변환

자바스크립트는 일급함수를 지원하므로, 함수를 변수에 저장하고, 파라미터로 함수를 넘기고, 함수를 반환하는것이 가능하다.

```
var global_name = '홍길동'

function makePrinter() {
    var outer_name = '김철수'

    function printName() {
        var inner_name = '김영희'
        console.log(global_name) // 홍길동
        console.log(outer_name) // 김철수
        console.log(inner_name) // 김영희
    }

    return printName;
}

var print = makePrinter();
print();

결과 )
홍길동
김철수
김영희
```

예제에선 함수내에서 정의한 printName() 함수를 반환하여, print 변수에 저장하낟. 반환되어 print 변수에 저장된 것이 함수이므로 print도 함수이다. 그러므로 print() 로 실행이 가능.

### 자바스크립트 클로져

자바스크립트 클로져를 설명하는데 필요한 것들을 모두 알아보았다.
<br>
<b>앞의 예에서 var print = makePrinter(); 로 반환받은것이 <u>클로저</u>이다.</b>
<br>
이 예에서 클로져로써 가장 특징적인 부분은 <b> makePrint() 함수 내에서 정의된 지역 변수인 outer_name 이 자신의 수명이 끝나는 makePrinter() 호출 후에 print(); 호출에도 살아 있다는 것</b>이다. (print() 호출로 "김철수"가 출력됨.)
<br>
클로져는 자신을 포함하고 있는 외부 함수의 인자, 지역변수 등을 외부 함수가 종료된 후에도 사용할 수 있다. 이러한 변수를 <b>자유 변수(free variable)</b> 이라고 부른다.
<br>
클로져가 생성될 때 범위 내의 지역변수들을 자유변수로 만드는 것을 <b>캡쳐(capture)</b> 라고 한다. 이 자유변수는 외부에서는 직접 접근할 수 없고, 항상 클로져를 통해서만 사용할 수 있다. <u>객체 지향언어의 private 멤버 변수와 같은 효과를 낸다.</u>
<br>
이처럼 <b><u>자유 변수를 가지는 코드를 클로져 라고 한다.</u></b>
<br>

### 사용처

<a href='./counter.js' >Link</a>

### 정리

클로져는 자신이 만들어진 환경을 기억하는 함수 라고도 불린다.
<br>
그 환경에서 선언된 변수 값을 기억할 수도 있다는 의미에서다.
<br>
따라서 클로져는 <b>상태유지, 정보의 은닉화, 리듀서패턴, 훅스 패턴</b> 등에 활용될 수 있다.
<br>
이런 특성들 떄문에 너무 과한 클로저의 사용은 과한 메모리 사용을 유발할 수 있다.
<b>
그럼에도, 함수형 프로그래밍에선 클로져의 사용을 적극 권장하는데, 함수형 프로그래밍에서는 상태변경 시 많은 사이드 이펙트를 발생시킬 수 있는데, 이를 클로저가 많이 방지해 주기 때문이다.
