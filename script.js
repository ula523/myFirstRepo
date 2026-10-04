let title = 'Проект';
let screens = 'Простые, сложные, интерактивные';
let screenPrise = 5255;
let rollback = 98;
let fullPrice = 200000;
let adaptive = true; 

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);


console.log('Стоимость верстки экранов ' + screenPrise + ' рублей');
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей');

console.log(screens.toLowerCase().split(", "));


console.log(fullPrice*(rollback / 100));

