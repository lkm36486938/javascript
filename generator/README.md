# Generator (제너레이터)

## 정의

함수의 실행을 중간에 멈췄다가 재개할 수 있는 기능

## 문법

```
function* fn() {
    yield 1;
    yield 2;
    yield 3;
    return 'finish'
}

const a = fn();
```

-   함수에 \* 문자를 사용하여 선언한다
-   yield 에서 함수의 실행을 멈출 수 있다.
-   제너레이터 함수를 실행하면 <b>제너레이터 객체가 반환</b>된다.
-   제너레이터 객체는 next() 메서드를 가지고 있다. 가장 가까운 yield 까지 코드를 실행하고 데이터를 반환한다. 반환 시 value와, done 프로퍼티를 가지는데, value는 yield 키워드 오른쪽에 있는 값이고 (생략하면 undefined), done 은 제너레이터의 마지막 코드까지 실행되었는지 여부이다. (위 코드에선 return 'finish')
-   제너레이터 객체는 return() 메서드와 throw() 메서드도 가지고 있는데, return() 호출 시 done상태로 제너레이터 함수를 끝내고 value 값으로 return() 함수에 전달한 인자를 리턴해준다. return() 호출 시 제너레이터를 종료한다고 생각하면 된다. throw() 메서드 호출 시 마찬가지로 done상태로 제너레이터 함수를 끝내고 예외를 발생시킨다.

## 특징

제너레이터는 iterable 이다. (반복이 가능함)
하지만, 반복을 위해선 몇가지 조건이 있다.

1. Symbol.iterator 메서드가 구현되어 있어야한다.
2. Symbol.iterator 는 iterator 를 반환해야 한다. {value: any , done: boolean}

3. 제너레이터는 값을 미리 만들어두지 않는다. (메모리관리 측면에서 효율적이다.)
