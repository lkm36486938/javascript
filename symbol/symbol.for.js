var log = console.log;
// 전역심볼

const id1 = Symbol.for("id");
const id2 = Symbol.for("id");

log(id1 === id2); // true

// 이름을 얻고 싶다면
log(Symbol.keyFor(id1)); // id

// 전역심볼이 아닌 심볼은 keyFor을 사용할 수 없음
const id = Symbol("id 입니다");
log(Symbol.keyFor(id)); // undefined
log(id.description); // id 입니다
