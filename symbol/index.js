var log = console.log;

// 1
const sym = Symbol("sym");
log(sym); // Symbol(sym)

// 2
// 심볼을 프로퍼티키로 사용할 때 아래의 방법으론 불러올 수 없음
const id = Symbol("id");

const user = {
    name: "Mike",
    age: 30,
    [id]: "myid",
};
log(user); // { name: 'Mike', age: 30, [Symbol(id)]: 'myid' }

log(Object.keys(user)); // ["name", "age"]
log(Object.values(user)); // ["Mike", 30]
log(Object.entries(user)); // [ [ 'name', 'Mike' ], [ 'age', 30 ] ]

for (let a in user) {
    log(a); // name, age
}

// 3
// 심볼을 완전히 숨길 수 있는 방법은 없다.
// 심볼 프로퍼티들만 볼 수 있음
log(Object.getOwnPropertySymbols(user)); // [ Symbol(id) ]

// 심볼을 포함한 키를 보여줌
log(Reflect.ownKeys(user)); // [ 'name', 'age', Symbol(id) ]
