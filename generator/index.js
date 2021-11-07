var log = console.log;
function* fn() {
    yield 4;
    yield 5;
    yield 6;
}

const a = fn();

// iterable 검증. Symbol.iterator 를 실행한 값이 자기 자신이다.
// iterable 하면서, iterator 이다.
log(a[Symbol.iterator]() === a); // true

// 순환가능
for (let num of a) {
    log(num);
}

// next 메소드에 인수전달
function* fn2() {
    const num1 = yield "첫번째 숫자를 입력해주세요";
    log(num1); // 2

    const num2 = yield "두번째 숫자를 입력해주세요";
    log(num2); // 3

    return num1 + num2;
}

const a2 = fn2();
log(a2.next()); // { value: '첫번째 숫자를 입력해주세요', done: false }
log(a2.next(2)); // { value: '두번째 숫자를 입력해주세요', done: false }
log(a2.next(3)); // { value: 5, done: true }
