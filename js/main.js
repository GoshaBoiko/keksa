import {photosData} from './mock.js';
import {addImages} from './add-images.js';
import {isEscape} from './utils.js';

addImages(photosData);

// Добавление фото из файла, изменение размера, фильтр
const editImagesForm = document.querySelector('.img-upload__overlay');
const closeEditImagesForm = editImagesForm.querySelector('.img-upload__cancel'); // кнопка закрыть
const fileInput = document.querySelector('.img-upload__input'); // инпут для загрузки
const previewImg = document.querySelector('.img-upload__preview img'); // изображение
const previewBlock = document.querySelector('.img-upload__preview'); // блок превью изображения
const previewImgEffects = document.querySelectorAll('.effects__preview'); // изображение эффект
const scaleSmallerImagesBtn = document.querySelector('.scale__control--smaller'); // кнопка уменьшения размера
const scaleBiggerImagesBtn = document.querySelector('.scale__control--bigger'); // кнопка увеличения размера
const scaleControl = document.querySelector('.scale__control--value');

const effectPreviewNone = document.querySelector('#effect-none');
const effectPreviewChrome = document.querySelector('#effect-chrome');
const effectPreviewSepia = document.querySelector('#effect-sepia');
const effectPreviewMarvin = document.querySelector('#effect-marvin');
const effectPreviewPhobos = document.querySelector('#effect-phobos');
const effectPreviewHeat = document.querySelector('#effect-heat');


fileInput.addEventListener('change', function () {
  const file = fileInput.files[0]; // Получаем файл из input'а // (помог бот)

  if (file) {
    const reader = new FileReader(); // Создаем объект FileReader // (помог бот)

    reader.onload = function (e) {  // (помог бот)
      previewImg.src = e.target.result; // При загрузке файла меняем src у изображения в блоке предпросмотра // (помог бот)
      editImagesForm.classList.remove('hidden');
      previewImgEffects.forEach(function (item) {
        item.style.backgroundImage = `url(${e.target.result})`;
      });
    };
    reader.readAsDataURL(file); // Читаем содержимое файла как URL данных // (помог бот)

    scaleImg();
    closeEditFormBtn();
    handleCloseFormKeydown();
  }
});


function scaleImg() {
  let intervalId;
  let currentWidth = 100;

  function increaseScale() {
    currentWidth -= 1;
    previewBlock.style.overflow = 'hidden';
    previewImg.style.object = 'cover';
    previewImg.style.maxWidth = currentWidth + '%';

    let currentValue = parseInt(scaleControl.value);
    currentValue -= 1;
    scaleControl.value = currentValue + '%';
  }

  scaleSmallerImagesBtn.addEventListener('mousedown', () => {
    increaseScale(); // Увеличиваем сразу при нажатии (помог бот)
    intervalId = setInterval(increaseScale, 100); // Начинаем увеличение каждые 100 мс (помог бот)
  });
  scaleSmallerImagesBtn.addEventListener('mouseup', () => {
    clearInterval(intervalId); // Останавливаем увеличение при отпускании (помог бот)
  });

  scaleBiggerImagesBtn.addEventListener('click', () => {
    currentWidth += 1;
    previewBlock.style.overflow = 'hidden';
    previewImg.style.object = 'cover';
    previewImg.style.maxWidth = currentWidth + '%';

    let currentValue = parseInt(scaleControl.value);
    currentValue += 1;
    scaleControl.value = currentValue + '%';
  });
}


function closeEditFormBtn() {
  closeEditImagesForm.addEventListener('click', () => {
    closeEditForm();
  });
}

function closeEditForm() {
  document.addEventListener('keydown', handleCloseFormKeydown);
  editImagesForm.classList.add('hidden');
}

function handleCloseFormKeydown(evt) {
  if (isEscape(evt.key)) {
    closeEditForm();
  }
}

// ВАЛИДАЦИЯ

const orderForm = document.querySelector('.img-upload__form');
const pristine = new Pristine(orderForm, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
  successClass: 'form__item--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'div', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
}, true); // 3 параметр false, что Pristine не валидировал форму по мере ввода

// Функция для валидации комментария
const validateDescription = (value) => {
  return value.length <= 140; // Проверка длины комментария
};

pristine.addValidator(
  orderForm.querySelector('.text__description'), // почему в скобки не могу передать переменную?
  // я просидел пока в бота не залил, он мне прислал решение и проблема была в этом!
  validateDescription,
  'Длина комментария не может составлять больше 140 символов'
);

const lattice = '#';
const space = ' ';
const hasTagsValidate = orderForm.querySelector('.text__hashtags'); // инпут хештег

function hasTagsTest () {
  const arrHasTags = hasTagsValidate.value.toLowerCase().split(space); // делим на хэштеги и привожу к одному размеру что бы сравнивать дальше
  const uniqueArr = [...new Set(arrHasTags)]; // Преобразуем Set обратно в массив ТУТ ТОЖЕ ЗАТУПИЛ ПОКА БОТ НЕ ПОДСКАЗАЛ ЧТО ЧТО БЫ СРАВНИТЬ МАССИВ СТАРЫЙ И НОВЫЙ СЕТ НУЖНО СЕТ ПРЕОБРАЗОВАТЬ ОБРАТНО В МАССИВ, ВОТ ОТ КУДА Я МОГ ЗНАТЬ... я так понял пытался сравнить объект с массивом и чет не получалось) длины были разные всегда
  const regex = /^[a-zA-Zа-яА-Я0-9]+$/; // Регулярное выражение для проверки хэштегов
  const result = arrHasTags.every((hasTag) => {
    // Проверяем, начинается ли хэштег с #
    if (hasTag.length > 20) {
      return false
    }
    if (hasTag.startsWith(lattice)) {
      // Обрезаем # и проверяем оставшуюся часть
      return regex.test(hasTag.slice(1)); // Передаем в `test()` хэштег без #
    }
    return false; // Если не начинается с #, возвращаем false
  });
  if (uniqueArr.length !== arrHasTags.length) {
    // проверка на уникальность
    return false
  }
  if (uniqueArr.length > 5) {
    // проверяем что хештегов не больше 5
    return false
  }

  return result; // Возвращаем результат проверки
}

pristine.addValidator(
  orderForm.querySelector('.text__hashtags'),
  hasTagsTest,
  'Ошибка в заполнении хештега'
);

// Обработка отправки формы (Я ТАК ПОНЯЛ ПОДОБНАЯ ЗАПИСЬ БУДЕТ +- УНИВЕРСАЛЬНОЙ)
orderForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Отменяем стандартное поведение формы
  if (pristine.validate()) {
    alert('Форма успешно отправлена!');
  }
});

// 2.2. Наложение эффекта на изображение:
//   По умолчанию должен быть выбран эффект «Оригинал».
// -На изображение может накладываться только один эффект.
// -Интенсивность эффекта регулируется перемещением ползунка в слайдере. Слайдер реализуется сторонней библиотекой для реализации слайдеров noUiSlider. Уровень эффекта записывается в поле .effect-level__value в виде числа. При изменении уровня интенсивности эффекта (предоставляется API слайдера), CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:
//   --Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
// --Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
// --Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
// --Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
// --Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
// --Для эффекта «Оригинал» CSS-стили filter удаляются.
// -При выборе эффекта «Оригинал» слайдер и его контейнер (элемент .img-upload__effect-level) скрываются.
// -При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться.

const effectSlider = document.querySelector('.effect-level__slider');
// const effectSliderValue = document.querySelector('.effect-level__value'); // хм... зачем мне про этот элемент писали на 173 строке....?
const effectSliderNone = document.querySelector('.img-upload__effect-level');
effectSliderNone.style.display = 'none';

// функция для изменения эффекта
function applyEffect(effect) {
  if (effect.valueOf() !== 'none') {
    effectSliderNone.style.display = 'block'; // чисто от себя добавил т.к. я творец))
    previewImg.style.filter = effect;
    if (effect.valueOf() === 'grayscale(1)') {
      noUiSlider.create(effectSlider, {
        start: 0,
        step: 0.1,
        range: {
          'min': 0,
          'max': 1
        },
      });
    }
    if (effect.valueOf() === 'sepia(1)') {
      noUiSlider.create(effectSlider, {
        start: 0,
        step: 0.1,
        range: {
          'min': 0,
          'max': 1
        },
      });
    }
    if (effect.valueOf() === 'invert(1)') {
      noUiSlider.create(effectSlider, {
        start: 0,
        step: 1,
        range: {
          'min': 0,
          'max': 100
        },
      });
    }
    if (effect.valueOf() === 'blur(5px)') {
      noUiSlider.create(effectSlider, {
        start: 0,
        step: 0.1,
        range: {
          'min': 0,
          'max': 3
        },
      });
    }
    if (effect.valueOf() === 'brightness(2)') {
      noUiSlider.create(effectSlider, {
        start: 1,
        step: 0.1,
        range: {
          'min': 1,
          'max': 3
        },
      });
    }
  } else {
    previewImg.style.filter = effect;
    effectSliderNone.style.display = 'none'; // чисто от себя добавил т.к. я творец))
    effectSlider.noUiSlider.destroy();
  }

  effectSlider.noUiSlider.on('update', function (values, handle) {
    console.log(values)
    console.log(handle)
    const value = parseFloat(values[handle]); // Получаем текущее значение ползунка
    console.log(value)
    const effects = previewImg.style.filter; // Получаем текущий эффект

    if (effects.includes('grayscale')) {
      previewImg.style.filter = `grayscale(${value})`;
    } else if (effects.includes('sepia')) {
      previewImg.style.filter = `sepia(${value})`;
    } else if (effects.includes('invert')) {
      previewImg.style.filter = `invert(${value}%)`;
    } else if (effects.includes('blur')) {
      previewImg.style.filter = `blur(${value}px)`;
    } else if (effects.includes('brightness')) {
      previewImg.style.filter = `brightness(${value})`;
    }
  });
}
// let Effect = 'none';
// Добавляем обработчики событий на каждый эффект
effectPreviewNone.addEventListener('click', function() {
  applyEffect('none');
  // Effect = applyEffect(arguments);
});
effectPreviewChrome.addEventListener('click', function() {
  applyEffect('grayscale(1)'); // эффект для Chrome
  // Effect = applyEffect(arguments);
});
effectPreviewSepia.addEventListener('click', function() {
  applyEffect('sepia(1)'); // эффект для Sepia
  // Effect = applyEffect(arguments);
});
effectPreviewMarvin.addEventListener('click', function() {
  applyEffect('invert(1)'); // эффект для Marvin
  // Effect = applyEffect(arguments);
});
effectPreviewPhobos.addEventListener('click', function() {
  applyEffect('blur(5px)'); // эффект для Phobos
  // Effect = applyEffect(arguments);
});
effectPreviewHeat.addEventListener('click', function() {
  applyEffect('brightness(2)'); // эффект для Heat
  // Effect = applyEffect(arguments);
});





