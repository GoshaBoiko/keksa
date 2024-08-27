import {closeEditForm, handleKeyPress} from './effectPhoto.js'

const orderForm = document.querySelector('.img-upload__form');
const btnSubmitForm = document.querySelector('.img-upload__submit');

const pristine = new Pristine(
  orderForm,
  {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'form__item--invalid',
    successClass: 'form__item--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'form__error',
  },
  true
);

// Функция для валидации комментария
const validateDescription = (value) => value.length <= 140;

pristine.addValidator(
  orderForm.querySelector('.text__description'),
  validateDescription,
  'Длина комментария не может составлять больше 140 символов'
);

const hasTagsValidate = orderForm.querySelector('.text__hashtags');
const regex = /^#[a-zA-Zа-яА-Я0-9]+$/;

const errorText = {
  hasTagStart: 'Хэштег должен начинаться с символа # (решётка)',
  regexTest: 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы и т. д.',
  hasTagLength: 'Максимальная длина одного хэштега — 20 символов, включая решётку.',
  hasTagUnique: 'Один и тот же хэштег не может быть использован дважды.',
  hasTagFive: 'Нельзя указать больше пяти хэштегов.',
};

// Функция для проверки, что поле пустое
const isNoneHasTag = (value) => value === '';

// Функция для проверки начала хэштега
const validateHasTagStart = (value) => {
  if (isNoneHasTag(value)) return true;
  const arrHasTags = value.toLowerCase().split(' ');
  return arrHasTags.every(tag => tag.startsWith('#'));
};

// Функция для проверки формата хэштегов
const validateHasTagFormat = (value) => {
  if (isNoneHasTag(value)) return true;
  const arrHasTags = value.toLowerCase().split(' ');
  return arrHasTags.every(tag => regex.test(tag));
};

// Функция для проверки длины хэштегов
const validateHasTagLength = (value) => {
  if (isNoneHasTag(value)) return true;
  const arrHasTags = value.toLowerCase().split(' ');
  return arrHasTags.every(tag => tag.length <= 20);
};

// Функция для проверки уникальности хэштегов
const validateHasTagUnique = (value) => {
  if (isNoneHasTag(value)) return true;
  const arrHasTags = value.toLowerCase().split(' ');
  const uniqueTags = new Set(arrHasTags);
  return uniqueTags.size === arrHasTags.length;
};

// Функция для проверки количества хэштегов
const validateHasTagCount = (value) => {
  if (isNoneHasTag(value)) return true;
  const arrHasTags = value.toLowerCase().split(' ');
  return arrHasTags.length <= 5;
};

// Добавляем валидаторы для хэштегов
pristine.addValidator(
  hasTagsValidate,
  validateHasTagStart,
  errorText.hasTagStart
);

pristine.addValidator(
  hasTagsValidate,
  validateHasTagFormat,
  errorText.regexTest
);

pristine.addValidator(
  hasTagsValidate,
  validateHasTagLength,
  errorText.hasTagLength
);

pristine.addValidator(
  hasTagsValidate,
  validateHasTagUnique,
  errorText.hasTagUnique
);

pristine.addValidator(
  hasTagsValidate,
  validateHasTagCount,
  errorText.hasTagFive
);


// Обработка отправки формы
orderForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Отменяем стандартное поведение формы

  if (pristine.validate()) {
    closeEditForm();
    showSuccessMessage();
    console.log('Форма успешно отправлена');
  } else {
    console.log('Ошибка в заполнении формы');
    showSuccessMessageError();
    btnSubmitForm.style.backgroundColor = 'rgb(255 255 255 / 20%)';
  }
});

// функция добавления и удаления уведомления о загрузке изображения
function showSuccessMessage() {
  const template = document.querySelector('#success');
  const clone = document.importNode(template.content, true);
  document.body.appendChild(clone);

  const successSection = document.querySelector('.success');
  const buttonSuccess = successSection.querySelector('.success__button');

  buttonSuccess.addEventListener('click', () => {
    successSection.remove();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      successSection.remove();
    }
  });

  successSection.addEventListener('click', (event) => {
    if (event.target === successSection) {
      successSection.remove();
    }
  });
}

// функция добавления и удаления уведомления об ошибке загрузки изображения
function showSuccessMessageError() {
  const template = document.querySelector('#error');
  const clone = document.importNode(template.content, true);

  document.body.appendChild(clone);

  const errorSection = document.querySelector('.error');
  const buttonError = errorSection.querySelector('.error__button');
  handleKeyPress(false);
  errorSection.style.zIndex = '2'; // почему не видно с 1 так и не понял

  buttonError.addEventListener('click', () => {
    errorSection.remove();  // дадада нужно удалять слушатели, не копить, написать в принципе все 1 событием и объединить, но я так устал... а еще по хорошему почистить текст валидации при повторном открытии... // formErrorText.value = ''; КУДА ЕГО ДОБАВИТЬ ЧТО БЫ НИЧЕГО НЕ СЛОМАТЬ И ЧТО ОНО РАБОТАЛО????
    handleKeyPress(true);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      errorSection.remove();
      handleKeyPress(true);
    }
  });

  errorSection.addEventListener('click', (event) => {
    if (event.target === errorSection) {
      errorSection.remove();
      handleKeyPress(true);
    }
  });
}
