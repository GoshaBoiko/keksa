// 1.: Написать функцию checkStrLength которая на вход будет принимать два аргумента str: string и maxLength: number,
// и должна возращать true, если str меньше или равно maxLength, и false если больше maxLength.

// function checkStrLength(str, maxLength) {
//   if (str <= maxLength) {
//     return true;
//   } else {
//     return false;
//   }
// }
// console.log(checkStrLength())

//2. Написать фукцию getRandomNum которая на вход будет принимать два аргумента min: number и max: number, и она должна
// на возвращать рандомное числа из диапозона min и max, если числа отричательные,
// то функция должна вернуть 0. Также нужно предусмотреть ситуацию, когда min > max, то тогда нужно поменять их местами.

function getRandomNum(min, max) {
  if (max < 0) {
    return 0;
  }
  if (min < 0) {
    return 0;
  }
  if (min > max) {
    return Math.floor(Math.random() * (min - max + 1) + max);
  } else {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

// console.log(getRandomNum(5, 1));

//3. Написать фукцию getRandomArrayElement которая на вход будет принимать массив, и возращать раномный элемент из него.

// const arr = ['t', 'b', 'c', 's', 'e'];
// const result = [];
//
// function getRandomArrayElement(arr) {
//   arr.forEach(function (element) {
//     result.push(element);
//   });
//   let lastIndex = result.length;
//   let firstIndex = 0;
//   let randomIndex = (Math.floor(Math.random() *  (lastIndex - firstIndex) + firstIndex));
//   console.log(result[randomIndex]);
// }
// getRandomArrayElement(arr);

// генератор ID
function getRandomId(min, max, arr) {
  if (arr.length >= 30) {
    return  // пытаюсь задать условие что бы остановить рекурсию......
  }
  if (min < 0) { // долго тупил пока не разделил проверку на 2 ифа и не перенес на отрицание проверку в начало
    return 0
  }
  if (max < 0) {
    return 0
  }
  if (min > max) { // это вообще сразу понял
    let randomNum = Math.floor(Math.random() * (min - max + 1) + max);
    if (arr.includes(randomNum)) {
      return getRandomId(min, max, arr);
    }
    return arr.push(randomNum);
  } else {
    let randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    if (arr.includes(randomNum)) {
      return getRandomId(min, max, arr);
    }
    return arr.push(randomNum);
  }
}

let arrIdObj = []; // создаем массив который будет хранить в себе все айди объектов randomObj
let arrIdComments = []; // тут была ошибка не мог понять почему айди везде одинаковый, потом понял,
// что нужно было вынести за цикл ну или функцию (ну как понял бот помог)))))

function creationObj() {
  let idGenerator = getRandomId(1, 25, arrIdObj); // генерируем айди
  let urlGen = `photos/{{${getRandomNum(1, 25)}}}.jpg`; // генерируем картинку
  let randomObj = {
    id: idGenerator,
    url: urlGen,
    description: 'описание фотографии',
    likes: getRandomNum(15, 200),
  };

  let randomCount = Math.floor(Math.random() * 31); // генерация случайного числа от 1 до 30 - для коментов


  for (let i = 0; i < randomCount; i++) {

    // генерируем из массива комментариев случайный
    const arrMessage = ['Всё отлично!', 'В целом всё неплохо.',
      'Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
      'В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают.',
      'Как можно было поймать такой неудачный момент?!'
    ];
    let randomMassage = Math.floor(Math.random() * (arrMessage.length));

    // генерируем имя
    const arrName = [
      'Igor', 'Vitalya', 'Vasya', 'Dima', 'Habib', 'Timon', 'Gena',
      'Roma', 'Rosa', 'Nastay', 'Olga', 'Helga', 'Lana', 'Alexey',
    ];
    let randomName = Math.floor(Math.random() * (arrName.length));

    // генерируем объект commenst
    let comments = {
      id: getRandomId(1, 25, arrIdComments),
      avatar: `img/avatar-{{${getRandomNum(1, 6)}}}.svg`, // и эту симантику подсмотрел т.к. не знал как верно сделать
      message: arrMessage[randomMassage],
      name: arrName[randomName],
    };
    randomObj['comments' + ' ' + i] = comments; // эту структуру тоже помог написать бот
  }
  console.log(randomObj)
}

// вызываем функцию 25 раз
for (let i = 0; i < 25; i++) {
  creationObj();
}


// RangeError: Maximum call stack size exceeded
// function getRandomId(min, max, arr) иногда вылазит ошибка, стек переполнен, когда запускаю
// creationObj() много раз всегда, ошибка в рекурсии по генерации айди...
