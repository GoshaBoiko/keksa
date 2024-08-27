// Добавление фото из файла, изменение размера, фильтр
const editImagesForm = document.querySelector('.img-upload__overlay');
const closeEditImagesForm = editImagesForm.querySelector('.img-upload__cancel'); // кнопка закрыть
const fileInput = document.querySelector('.img-upload__input'); // инпут для загрузки
const previewImg = document.querySelector('.img-upload__preview img'); // изображение
const previewBlock = document.querySelector('.img-upload__preview'); // блок превью изображения
const previewImgEffects = document.querySelectorAll('.effects__preview'); // изображение эффект
const scaleSmallerImagesBtn = document.querySelector('.scale__control--smaller'); // кнопка уменьшения размера
const effectPreviewList = document.querySelector('.effects');
const scaleBiggerImagesBtn = document.querySelector('.scale__control--bigger'); // кнопка увеличения размера
const scaleControl = document.querySelector('.scale__control--value');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const formErrorText = document.querySelector('.form__error');

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0]; // Получаем файл из input'а

  if (file) {
    const reader = new FileReader(); // Создаем объект FileReader

    reader.onload = function (e) {

      previewImg.src = e.target.result; // При загрузке файла меняем src у изображения в блоке предпросмотра //
      editImagesForm.classList.remove('hidden');
      previewImgEffects.forEach((item) => {
        item.style.backgroundImage = `url(${e.target.result})`;
      });
    };

    reader.readAsDataURL(file); // Читаем содержимое файла как URL данных //

    applyEffect(Effect.NONE);
    scaleImg();
    resetFields();
    closeEditFormBtn();
    resetSize();
    resetEffects();
  }
});

let currentWidth = 100;

function scaleImg() {

  scaleSmallerImagesBtn.addEventListener('click', () => {
    currentWidth -= 1;
    previewBlock.style.overflow = 'hidden';
    previewImg.style.object = 'cover';
    previewImg.style.maxWidth = `${currentWidth}%`;

    let currentValue = parseInt(scaleControl.value, 10);
    currentValue -= 1;
    scaleControl.value = `${currentValue}%`;
  });

  scaleBiggerImagesBtn.addEventListener('click', () => {
    currentWidth += 1;
    previewBlock.style.overflow = 'hidden';
    previewImg.style.object = 'cover';
    previewImg.style.maxWidth = `${currentWidth}%`;

    let currentValue = parseInt(scaleControl.value, 10);
    currentValue += 1;
    scaleControl.value = `${currentValue}%`;
  });

}

function closeEditFormBtn() {
  closeEditImagesForm.addEventListener('click', () => {
    closeEditForm();
    handleKeyPress();
  });
}

export function closeEditForm() {
    document.addEventListener('keydown', handleKeyPress);
    editImagesForm.classList.add('hidden');
    applyEffect(Effect.NONE);
    scaleImg();
    resetFields();
    closeEditFormBtn();
    resetSize();
    resetEffects();
}

export const handleKeyPress = (event, flag) => {
  if (flag) {
    if (textHashtags === document.activeElement || textDescription === document.activeElement) {
      return;
    }
    if (event.key === 'Escape') {
      closeEditForm();
    }
  }
};

document.addEventListener('keydown', handleKeyPress);

const effectSliderContainer = document.querySelector('.img-upload__effect-level');
const effectSlider = document.querySelector('.effect-level__slider');
effectSliderContainer.style.display = 'none';

noUiSlider.create(effectSlider, {
  start: 0,
  step: 0.1,
  range: {
    min: 0,
    max: 1,
  },
});

const Effect = {
  NONE: 'none',
  GRAYSCALE: 'grayscale',
  SEPIA: 'sepia',
  INVERT: 'invert',
  BLUR: 'blur',
  BRIGHTNESS: 'brightness',
};

const EffectConfig = {
  [Effect.GRAYSCALE]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.INVERT]: {
    min: 0,
    max: 100,
    step: 1,

    to(value) {
      return `${value}%`;
    }
  },
  [Effect.BLUR]: {
    min: 0,
    max: 3,
    step: 0.1,
    to(value) {
      return `${value}px`;
    }
  },
  [Effect.BRIGHTNESS]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

// функция для изменения эффекта
function applyEffect(effect) {
  if (effect === Effect.NONE) {
    effectSliderContainer.style.display = 'none';
    return;
  }
  effectSliderContainer.style.display = 'block';

  effectSlider.noUiSlider.updateOptions({
    range: {
      min: EffectConfig[effect].min,
      max: EffectConfig[effect].max
    },

    start: EffectConfig[effect].min,
    step: EffectConfig[effect].step,

    format: {
      to: function (value) {
        if (!EffectConfig[effect].to) {
          return value;
        }
        return EffectConfig[effect].to(value);
      },

      from: function (value) {
        return value;
      },
    }
  });

  effectSlider.noUiSlider.on('update', () => {
    const value = effectSlider.noUiSlider.get(); // Получаем текущее значение ползунка
    console.log(value);

    previewImg.style.filter = `${Effect[effect.toUpperCase()]}(${value})`;
  });
}

effectPreviewList.addEventListener('change', () => {
  const value = effectPreviewList.querySelector('[name="effect"]:checked').value;

  applyEffect(value);
});


function resetEffects() {
  effectSliderContainer.style.display = 'none';
  previewImg.style.filter = 'none';
}

function resetSize() {
  currentWidth = 100;
  previewImg.style.maxWidth = `${currentWidth}%`;
  scaleControl.value = `${50}`;
}

function resetFields() {
  const textHashtags = document.querySelector('.text__hashtags');
  const textDescription = document.querySelector('.text__description');

  textHashtags.value = ''; // Сбрасываем теги
  textDescription.value = ''; // Сбрасываем комментарии
}
