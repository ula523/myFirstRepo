let num = 266219;

let result = String(num).split("").reduce((res, item) => item * res, 1);
console.log(result);

let degree = result ** 3;
console.log(String(degree).slice(0 ,2));

