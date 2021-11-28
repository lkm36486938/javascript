let counter = (function() {
  // private 변수. 외부에서 접근 불가
  var privateCounter = 0;

  // private 함수. 외부에서 접근 불가
  function changeCounter(val) {
    privateCounter += val;
  }

  return {
    inc: function() {
      changeCounter(1);
    },
    dec: function() {
      changeCounter(-1);
    },
    val: function() {
      return privateCounter;
    }
  };
})();

counter.inc();
counter.inc();
console.log("after increment: ", counter.val());
counter.dec();
console.log("after decrement: ", counter.val());
