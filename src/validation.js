export function validateInput(input) {
   // Удаление всех символов, кроме цифр и запятых
   input.value = input.value.replace(/[^0-9,-]/g, '');

   // Удаление повторяющихся запятых
   input.value = input.value.replace(/,{2,}/g, ',');

   // Проверка наличия только цифр и запятых
   const isValid = /^[0-9,-]*$/.test(input.value);

   // Если введенное значение не является валидным, добавить класс с ошибкой
   if (!isValid) {
      input.classList.add('error');
   } else {
      input.classList.remove('error');
      return input.value.split(',').map(Number);
   }
}

const input = document.querySelector('.input_array');

input.addEventListener('input', function () {
   validateInput(this);
});
