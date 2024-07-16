const result = [];
const time = 20;
const cancelTimeMs = 50;
const start = Date.now();

const cancellable = (fn, number, time) => { // передается функция log, [2], t=20;
  const timerId = setTimeout(() => {
    fn(number); // вызываем функция log([2]) = log(2)
  }, time)

  return () => {
    console.log('clear')
    clearTimeout(timerId)
  }
};

const multiply = (x) => x * 5;
console.log(multiply)
const fn = (number) => { // log([2])
  const end = Math.floor(Date.now() - start); // 20
  result.push({"time": end, "returned": multiply(number)}); // 20 и 10
}

const cancel = cancellable(fn, 2, time);
console.log(cancel())
const maxT = Math.max(time, cancelTimeMs);

setTimeout(cancel, cancelTimeMs);

setTimeout(() => {
  console.log(result); // [{"time":20,"returned":10}]
}, maxT + 15);


