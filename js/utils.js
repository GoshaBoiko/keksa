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


