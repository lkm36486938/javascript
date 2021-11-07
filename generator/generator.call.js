// yield* 를 사용하여 다른 제너레이터를 불러보는 예제
function* gen1() {
    yield "W";
    yield "o";
    yield "r";
    yield "l";
    yield "d";
}

function* gen2() {
    yield "Hello,";
    yield* gen1();
    yield "!";
}

// ...gen2 : done 값이 true 가 될때까지 값을 펼쳐준다.
console.log(...gen2()); // Hello, W o r l d !
