
const inputText = document.getElementById('text')
const btn = document.getElementById('btn')
const square = document.getElementById('square')
const btn2 = document.getElementById('e_btn')
const range = document.getElementById('range')
const rangeSpan = document.getElementById('range-span')
const circle = document.getElementById('circle')

const saveText = function(event) {
    btn.onclick(event.target.value);

}

inputText.addEventListener('focus', saveText);

const backgroundColor = function() {
    square.style.backgroundColor = inputText.value;
}

btn.onclick = function () {
   backgroundColor();
}

btn2.style.display = "none";

const sizeRange = function() {
  rangeSpan.textContent = range.value;
  circle.style.width = circle.style.height = range.value + '%';
}

range.addEventListener('input', sizeRange);

console.log(rangeSpan)

