# Symbol

유일한 식별자를 만들 때 사용한다.

## 사용법

```
const a = Symbol(); // Symbol()
```

## 유일성 보장

```
const a = Symbol(); // Symbol()
const b = Symbol(); // Symbol()
a === b // false

아래 처럼 심볼에 대한 설명과 함께 생성시킬 수 있다.
const c= Symbol('id')

문자열을 넣는다 해도 심볼 생성에는 어떠한 영향도 미치지 않는다.
설명을 같게해서 생성해도 각각의 심볼객체는 서로 다르다.
```

## 활용

다른 사람이 만들어놓은 객체에 프로퍼티 추가

```
const user = {
    name: "Mike",
    age: 30,
};
const id = Symbol('id');
user[id] = 'myid';

아래 처럼 다른사람이 만들어놓은 객체가 함부로 프로퍼티를 추가하다간 어떤 사이드 이펙트가 있을지 모름. (어딘가에서 사용되고 있을지도 모름)
user.name = 'myname'
user.a_key_no_one_used = 'hahaha';
```

## 전역심볼

-   <b>하나</b>의 심볼만 보장받을 수 있음
-   없으면 만들고, 있으면 가져옴
-   Symbol 함수는 매번 다른 Symbol 값을 생성하지만, Symbol.for 메소드는 하나를 생성한 뒤 키를 통해 같은 Symbol을 공유
