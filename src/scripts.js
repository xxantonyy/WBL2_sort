import "../styles/style.css";
import { SortingMethods } from "./sortungMethods";
import { validateInput } from "./validation";

const input = document.querySelector('.input_array');


document.querySelector('.btn_1').addEventListener('click', () => {
   document.querySelector('.modal_wrapper').style.display = 'none';
   SortingMethods(validateInput(input)).BubbleSort();
});

document.querySelector('.btn_2').addEventListener('click', () => {
   document.querySelector('.modal_wrapper').style.display = 'none';
   SortingMethods(validateInput(input)).SelectSort();
});

document.querySelector('.btn_3').addEventListener('click', () => {
   document.querySelector('.modal_wrapper').style.display = 'none';
   SortingMethods(validateInput(input)).InsertionSort();
});

document.querySelector('.btn_4').addEventListener('click', () => {
   document.querySelector('.modal_wrapper').style.display = 'none';
   SortingMethods(validateInput(input)).CombSort();
});

document.querySelector('.btn_5').addEventListener('click', () => {
   document.querySelector('.modal_wrapper').style.display = 'none';
   SortingMethods(validateInput(input)).cocktailSort();
});
