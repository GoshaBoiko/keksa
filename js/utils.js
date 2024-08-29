export function getRandomArrayElement(arr) {
  return arr[getRandomNum(0, arr.length - 1)];
}

export function generateId(start = 0) {
  let id = start;

  return () => ++id;
}

export function getRandomNum(max, min = 0) {
  if (max < 0 || min < 0) {
    return 0;
  }

  if (min > max) {
    [max, min] = [min, max];
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isEscape(key) {
  return key === 'Escape';
}

export const debounce = function(fn, t) {
  let timeoutId;

  return function(...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn(...args);
    }, t);
  }
};

export function throttle (fn, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      fn(...rest); // то же самое, что fn.apply(this, rest);
      lastTime = now;
    }
  };
}

export function getRandomElementsNum(arr, count = 10) {
  let shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function arrSorted(arr) {
  return arr.slice().sort((a, b) => b.comments.length - a.comments.length);
}

  // export function getRandomElementsNum(arr, count = 10) {
  //   const shuffled = arr.map(item => ({ ...item })).sort(() => 0.5 - Math.random());
  //   return shuffled.slice(0, count);
  // }
  //
  // export function arrSorted(arr) {
  //   return arr.map(item => ({ ...item })).sort((a, b) => b.comments.length - a.comments.length);
  // }
