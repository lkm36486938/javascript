// 제너레이터는 값을 미리 만들어두지 않는다. (메모리관리 측면에서 효율적이다.)
var log = console.log;
function* fn() {
    let index = 0;
    while (true) {
        yield index++;
    }
}

const a = fn();

log(a.next());
log(a.next());
