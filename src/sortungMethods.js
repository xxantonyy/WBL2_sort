export const SortingMethods = (arr) => {
	let array = arr;
	const rootElement = document.getElementById("root");
	let isSorting = false;
	let currentIteration = 0;
	let intervalId;

		//1

	const BubbleSort = async () => {

		const toggleSorting = () => {
			isSorting = !isSorting;

			if (isSorting) {
				intervalId = setInterval(BubbleSort, 500);
			} else {
				clearInterval(intervalId);
			}
		};

		const btnElement = document.querySelector(".btn");
		btnElement.style.display = 'block';
		btnElement.addEventListener("click", toggleSorting);



		for (let i = currentIteration; i < array.length; i++) {
			if (!isSorting) {
				break;
			}

			rootElement.innerHTML = "";

			for (let j = 0; j < array.length; j++) {
				const value = array[j];
				const divElement = document.createElement("div");
				divElement.textContent = value;
				divElement.classList.add("item");
				rootElement.appendChild(divElement);
			}

			for (let t = 0; t < array.length - i - 1; t++) {
				let first_value = array[t];
				let second_value = array[t + 1];

				if (first_value >= second_value) {
					array[t] = second_value;
					array[t + 1] = first_value;
				}
			}

			currentIteration = i + 1;

			for (let j = array.length - 1; j > array.length - i - 1; j--) {
				rootElement.childNodes[j]?.classList.add('sorted');
			}

			await new Promise((resolve) => setTimeout(resolve, 500)); // Задержка в 500 мс
		}

		rootElement.childNodes[0]?.classList.remove('current');

		if (!isSorting) {
			rootElement.childNodes.forEach((node) => {
				node.classList.add('stopped');
			});
		} else {
			rootElement.childNodes.forEach((node) => {
				node.classList.add('sorted');
				node.classList.remove('stopped');
			});
		}

		clearInterval(intervalId);
		return array;
	};



		//2


	const btn2 = document.querySelector('.btn2');

	btn2.addEventListener('click', () => {
		if (isSorting) {
			startSorting();
			isSorting = true;
		} else {
			if (!isPaused) {
				pauseSorting();
				isPaused = true;
				rootElement.childNodes.forEach(node => node.classList.add('stopped'))
			} else {
				resumeSorting();
				isPaused = false;
				rootElement.childNodes.forEach(node => node.classList.remove('stopped'))
			}
		}
	});

	const startSorting = async () => {
		isSorting = true;
		currentIndex = 0;
		await SelectSort();
		isSorting = false;
	}

	const pauseSorting = () => {
		isPaused = true;
	}

	const resumeSorting = async () => {
		isPaused = false;
		await SelectSort();
	}


	let isPaused = false; // Флаг для отслеживания состояния паузы
	let currentIndex = 0; // Индекс текущего элемента для возобновления сортировки
	let originalArray = [...array]; // Сохранение исходного массива


	const SelectSort = async () => {
		btn2.style.display = 'block';
		let resolve = originalArray; // Использование исходного массива
		for (let i = currentIndex; i < resolve.length - 1; i++) {
			let minIndex = i;
			for (let j = i + 1; j < resolve.length; j++) {
				if (resolve[j] < resolve[minIndex]) {
					minIndex = j;
				}
			}
			let temp = resolve[i];
			resolve[i] = resolve[minIndex];
			resolve[minIndex] = temp;

			// Обновление отображения массива
			renderArray(resolve);

			// Анимация выбранного элемента
			await animateSelected(minIndex);

			// Анимация отсортированного элемента
			await animateSorted(i + 1);

			if (isPaused) {
				currentIndex = i;
				return;
			}
		}
		rootElement.childNodes.forEach(node => node.classList.add('sorted'));
		return resolve;
	}

	const animateSelected = async (index) => {
		const element = document.getElementById(`element-${index}`);
		element?.classList?.add('sorted');
		await new Promise(resolve => setTimeout(resolve, 500)); // Задержка в 0.5 секунды
		element?.classList?.remove('sorted');
	}

	const animateSorted = async (index) => {
		const element = document.getElementById(`element-${index}`);
		element?.classList?.add('current');
		await new Promise(resolve => setTimeout(resolve, 500)); // Задержка в 0.5 секунды
		element?.classList?.remove('current');
	}

	const renderArray = (array) => {
		const rootElement = document.getElementById('root');
		rootElement.innerHTML = ''; // Очистка содержимого элемента root

		array.forEach((value, index) => {
			const element = document.createElement('div');
			element.id = `element-${index}`;
			element.classList.add('item');
			element.textContent = value;
			rootElement.appendChild(element);
		});
	}



		//3




	let currentIndex2 = 0; // добавляем переменную currentIndex для хранения текущей позиции сортировки 
	let isSorting2 = false; // добавляем флаг isSorting для определения, идет ли сортировка 
	let isPaused2 = false; // добавляем флаг isPaused для определения, находится ли сортировка на паузе 
	let originalArray2 = [...array]; // добавляем сохраненный массив

	const btn3 = document.querySelector('.btn3');

	btn3.addEventListener('click', () => {
		if (isSorting2) {
			isSorting2 = true;
			startSorting2();
		} else {
			if (!isPaused2) {
				isPaused2 = true;
				pauseSorting2();
				rootElement.childNodes.forEach(node => node.classList.add('stopped'));
			} else {
				isPaused2 = false;
				resumeSorting2(originalArray);
				rootElement.childNodes.forEach(node => node.classList.remove('stopped'));
			}
		}
	});

	const startSorting2 = async () => {
		isSorting2 = true;
		await InsertionSort();
		isSorting2 = false;
	};

	const pauseSorting2 = () => {
		isPaused2 = true;
	};

	const resumeSorting2 = async () => {
		isPaused2 = false;
		await InsertionSort();
	};

	const InsertionSort = async () => {
		btn3.style.display = 'block';
		let resolve = originalArray2; // создаем копию исходного массива 
		for (let i = currentIndex2; i < resolve.length; i++) {
			let key = resolve[i];
			let j = i - 1;
			while (j >= 0 && resolve[j] > key) {
				resolve[j + 1] = resolve[j];
				j--;
			}
			resolve[j + 1] = key;

			// Обновление отображения массива 
			renderArray(resolve);

			let j_index = j + 1 == resolve.length ? j - 1 : j + 1;
			// Анимация выбранного элемента 
			await animateSelected(j_index);

			// Анимация отсортированного элемента 
			await animateSorted(i + 1);

			if (isPaused2) {
				currentIndex2 = i;
				return;
			}
		}
		rootElement.childNodes.forEach(node => node.classList.add('sorted'));
		return resolve;
	};





		//4



	let currentIndex3 = 0; // добавляем переменную currentIndex для хранения текущей позиции сортировки 
	let isSorting3 = false; // добавляем флаг isSorting для определения, идет ли сортировка 
	let isPaused3 = false; // добавляем флаг isPaused для определения, находится ли сортировка на паузе 
	let originalArray3 = [...array]; // добавляем сохраненный массив

	const btn4 = document.querySelector('.btn4');

	btn4.addEventListener('click', () => {
		if (isSorting3) {
			isSorting3 = true;
			startSorting3();
		} else {
			if (!isPaused3) {
				isPaused3 = true;
				pauseSorting3();
				rootElement.childNodes.forEach(node => node.classList.add('stopped'));
			} else {
				isPaused3 = false;
				resumeSorting3();
				rootElement.childNodes.forEach(node => node.classList.remove('stopped'));
			}
		}
	});

	const startSorting3 = async () => {
		isSorting3 = true;
		await CombSort();
		isSorting3 = false;
	};

	const pauseSorting3 = () => {
		isPaused3 = true;
	};

	const resumeSorting3 = async () => {
		isPaused3 = false;
		await CombSort();
	};

	const CombSort = async () => {
		btn4.style.display = 'block';
		let resolve = originalArray3; // создаем копию исходного массива 
		let gap = resolve.length;
		let shrink = 1.3;
		let sorted = false;

		while (!sorted) {
			gap = Math.floor(gap / shrink);
			if (gap > 1) {
				sorted = false;
			} else {
				gap = 1;
				sorted = true;
			}

			let i = 0;
			while (i + gap < resolve.length) {
				if (resolve[i] > resolve[i + gap]) {
					let temp = resolve[i];
					resolve[i] = resolve[i + gap];
					resolve[i + gap] = temp;

					// Обновление отображения массива 
					renderArray(resolve);

					// Анимация выбранного элемента 
					await animateSelected(i);

					// Анимация отсортированного элемента 
					await animateSorted(i + gap);

					if (isPaused3) {
						currentIndex3 = i;
						return;
					}

					sorted = false;
				}
				i++;
			}
		}

		rootElement.childNodes.forEach(node => node.classList.add('sorted'));
		return resolve;
	};






		// 5


	let currentIndex4 = 0; // добавляем переменную currentIndex для хранения текущей позиции сортировки
	let isSorting4 = true; // добавляем флаг isSorting для определения, идет ли сортировка
	let isPaused4 = false; // добавляем флаг isPaused для определения, находится ли сортировка на паузе
	let originalArray4 = [...array]; // добавляем сохраненный массив

	const btn5 = document.querySelector('.btn5');

	btn5.addEventListener('click', () => {
		if (!isSorting4) {
			isSorting4 = true;
			startSorting4();
		} else {
			if (!isPaused4) {
				rootElement.childNodes.forEach(node => node.classList.add('stopped'));
				isPaused4 = true;
				pauseSorting4();
			} else {
				rootElement.childNodes.forEach(node => node.classList.remove('stopped'));
				isPaused4 = false;
				resumeSorting4();
			}
		}
	});

	const startSorting4 = async () => {
		isPaused4 = true;
		await cocktailSort();
		isPaused4 = false;
	};

	const pauseSorting4 = () => {
		isPaused4 = true;
	};


	const resumeSorting4 = async () => {
		isPaused4 = false;
		await cocktailSort();
	};


	const cocktailSort = async () => {
		btn5.style.display = 'block';
		let arr = originalArray4; // создаем копию исходного массива
		let start = currentIndex4;
		let end = arr.length - 1;
		let swapped = true;

		while (swapped) {
			swapped = false;

			// Проход слева направо
			for (let i = start; i < end; i++) {
				if (arr[i] > arr[i + 1]) {
					[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
					swapped = true;

					// Обновление отображения массива
					renderArray(arr);

					// Анимация выбранного элемента
					await animateSelected(i);

					// Анимация отсортированного элемента
					await animateSorted(i + 2);

					if (isPaused4) {
						currentIndex4 = i;
						return;
					}

					if (!isSorting4) {
						return;
					}
				}
			}

			if (!swapped) {
				break;
			}

			swapped = false;
			end--;

			// Проход справа налево
			for (let i = end - 1; i >= start; i--) {
				if (arr[i] > arr[i + 1]) {
					[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
					swapped = true;

					// Обновление отображения массива
					renderArray(arr);

					// Анимация выбранного элемента
					await animateSelected(i + 1);

					// Анимация отсортированного элемента
					await animateSorted(i - 1);

					if (isPaused4) {
						currentIndex4 = i;
						return;
					}
					if (!isSorting4) {
						return;
					}

				}
			}

			start++;
		}

		rootElement.childNodes.forEach(node => node.classList.add('sorted'));
		return arr;
	};







	// Запасной мето сортировки


	// let currentIndex4 = 0;
	// let isSorting4 = false;
	// let isPaused4 = false;
	// let originalArray4 = [...array];

	// const btn5 = document.querySelector('.btn5');

	// btn5.addEventListener('click', () => {
	// 	if (isSorting4) {
	// 		startSorting4();
	// 		isSorting4 = true;
	// 	} else {
	// 		if (!isPaused4) {
	// 			pauseSorting4();
	// 			rootElement.childNodes.forEach(node => node.classList.add('stopped'));
	// 			isPaused4 = true;
	// 		} else {
	// 			resumeSorting4();
	// 			rootElement.childNodes.forEach(node => node.classList.remove('stopped'));
	// 			isPaused4 = false;
	// 		}
	// 	}
	// });

	// const startSorting4 = async () => {
	// 	isSorting4 = true;
	// 	await HeapSort();
	// 	isSorting4 = false;
	// };

	// const pauseSorting4 = () => {
	// 	isPaused4 = true;
	// };

	// const resumeSorting4 = async () => {
	// 	isPaused4 = false;
	// 	await HeapSort();
	// };

	// const HeapSort = async () => {
	// 	let resolve = [...originalArray4];
	// 	btn5.style.display = 'block';
	// 	let n = resolve.length;

	// 	for (let i = Math.floor(n / 2) - 1; i >= currentIndex4; i--) {
	// 		await heapify(resolve, n, i);
	// 	}

	// 	for (let i = n - 1; i > currentIndex4; i--)  {
	// 		let temp = resolve[0];
	// 		resolve[0] = resolve[i];
	// 		resolve[i] = temp;

	// 		renderArray(resolve);

	// 		await animateSelected(0);

	// 		await animateSorted(i);

	// 		if (isPaused4) {
	// 			currentIndex4 = i;
	// 			resolve= [...originalArray4];
	// 			return;
	// 		}

	// 		await heapify(resolve, i, 0);
	// 	}

	// 	rootElement.childNodes.forEach(node => node.classList.add('sorted'));
	// 	return resolve;
	// };

	// const heapify = async (arr, n, i) => {
	// 	let largest = i;
	// 	let l = 2 * i + 1;
	// 	let r = 2 * i + 2;

	// 	if (l < n && arr[l] > arr[largest]) {
	// 		largest = l;
	// 	}

	// 	if (r < n && arr[r] > arr[largest]) {
	// 		largest = r;
	// 	}

	// 	if (largest !== i) {
	// 		let swap = arr[i];
	// 		arr[i] = arr[largest];
	// 		arr[largest] = swap;

	// 		renderArray(arr);

	// 		await animateSorted(largest);
	// 		await animateSelected(largest);
	// 		await animateSorted(i);
	// 		await animateSorted(largest);

	// 		if (isPaused4) {
	// 			return;
	// 		}

	// 		await heapify(arr, n, largest);
	// 	}
	// };






	return { BubbleSort, SelectSort, InsertionSort, CombSort, cocktailSort };
};
