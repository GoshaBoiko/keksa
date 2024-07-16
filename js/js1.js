// var removeElement = function(nums, val) {
//   let count = 0;
//   const result = [];
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] === val) {
//       count++
//     } else {
//       result.push(nums[i]);
//     }
//   }
//
//     return {result, count};
//
// };
//
// console.log(removeElement([0,1,2,2,3,0,4,2],2));




// function stringMetod(str) {
//   let result = "";
//   const objLetters = {а: 'a', e: 'е', ё: 'ё', и: 'и', о: 'о', у: 'у', ы: 'ы', э: 'э', ю: 'ю', я: 'я'};
//
//   for (let i = 0; i < str.length; i = i + 1 ) {
//     if (objLetters[str[i].toLowerCase()]) {
//       result = result + str[i].toUpperCase();
//     } else {
//       result = result + str[i].toLowerCase();
//     }
//   }
//
//   return result;
// }
//
// console.log(stringMetod('Привет Мир!'))



// function stringCopy(str) {
//   let result = '';
//   let arr = str.split(' ');
//   let obj = {};
//   for (let i = 0; i < arr.length; i += 1) {
//     if (!obj[arr[i]]) {
//       obj[arr[i]] = 1 ;
//       result += arr[i] + (' ')
//     }
//   }
//   return result
//
// }
//
// console.log(stringCopy('Привет мир Привет Привет собака Привет Мир Кошка Здравствуй человек'));



// const fruits = ['kiwi','apple', 'kiwi', 'orange', 'kiwi', 'apple']
//
// function numFruits() {
//   let result = {};
//
//   for (let i = 0; i < fruits.length; i += 1) {
//     if (!result[fruits[i]]) {
//       result[fruits[i]] = 1;
//     }
//   }
//   return Object.keys(result)
// }
//
// console.log(numFruits(fruits))



// const fruits = ['kiwi','apple', 'kiwi', 'orange', 'kiwi', 'apple']
//
// function numFruits() {
//   let result = [];
//   for (let i = 0; i < fruits.length; i += 1) {
//     if (!result.includes(fruits[i])) {
//       result.push(fruits[i])
//     }
//   }
//   return result
// }
//
// console.log(numFruits(fruits))



// const fruits = ['kiwi','apple', 'kiwi', 'orange', 'kiwi', 'apple']
//
// function numFruits(list) {
//   let count = {};
//
//   list.forEach(f => {
//     if (!count[f]) {
//       count[f] = 1;
//     } else {
//       count[f] += 1;
//     }
//   })
//   return count
// }
//
// console.log(numFruits(fruits))



// const students = [
//   { name: 'alex', age: 20},
//   { name: 'mike', age: 24},
//   { name: 'masha', age: 20},
//   { name: 'anna', age: 18},
//   { name: 'loh', age: 20},
//   { name: 'artem', age: 31},
// ]
//
// function sortStudents(list) {
//   const group = {};
//
//   list.forEach(student => {
//     if (!group[student.age]) {
//       group[student.age] = [student];
//     } else {
//       group[student.age].push(student);
//     }
//   })
//
//   return group;
// }
//
// console.log(sortStudents(students))



// const myNumbers = [3, 5, -4, 8, 11, 1, -1, 6];
// const sum = 10;
//
// function sumNum(arr, numSum) {
//   let result = [];
//
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[i] + arr[j] === numSum) {
//         result.push(arr[i], arr[j]);
//       }
//     }
//   }
//
//   return result;
// }
//
// console.log(sumNum(myNumbers, sum));



// const friends = [
//   { name: 'alex', pizzas: ['cheese', 'pepperoni'] },
//   { name: 'mike', pizzas: ['salami', 'margarita'] },
//   { name: 'dimoooon', pizzas: ['meat'] },
//   { name: 'anna', pizzas: ['fish'] }
// ]
//
// const pizzas = friends.reduce((accum, current) => {
//   accum.push(...current.pizzas)
//   return accum
// }, [])
// console.log(pizzas);



// 1й способ
// const myStr = 'pizza';
// const arr = myStr.split('')
// arr.reverse();
// console.log(...arr)



// 2й способ
// const myStr = 'pizza';
//
// function f(str) {
//   let arr = str.split('');
//   let result = '';
//   for (let i = arr.length - 1; i >= 0; i--) {
//     result = result + arr[i];
//   }
//   return result;
// }
//
// console.log(f(myStr))



// 3й способ
// function f(str) {
//   let result = '';
//   for (let i = str.length - 1; i >= 0; i--) {
//     result = result + str[i];
//   }
//
//   return result;
// }
//
// console.log(f('pizza'))

// (function () {
//   console.log(5 + 5)
// })()

/*
'08:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/
// имяФункции('08:00', '17:30', '14:00', 90); // true
// имяФункции('8:0', '10:0', '8:0', 120);     // true
// имяФункции('08:00', '14:30', '14:00', 90); // false
// имяФункции('14:00', '17:30', '08:0', 90);  // false
// имяФункции('8:00', '17:30', '08:00', 900); // false
// 08:05, 8:5, 08:5 или 8:05



// function convertTimeToMinutes(time) {
//   const [hours, minutes] = time.split(':').map(Number);
//
//   return hours * 60 + minutes;
// }
//
// // console.log(convertTimeToMinutes('08:30'));
//
// function jobTime(startJob, endJob, meetingStart, meetingTime) {
//
//   const start = convertTimeToMinutes(startJob);
//   const end = convertTimeToMinutes(endJob);
//   const meeting = convertTimeToMinutes(meetingStart);
//   const allMeeting = meeting + meetingTime;
//
//   return (meeting >= start && allMeeting <= end);
//
// }
//
// console.log(jobTime('08:00', '17:30', '14:00', 90))
