const steel = document.querySelector('#order-steel');
const aluminum = document.querySelector('#order-aluminum');
const iron = document.querySelector('#order-iron');
const form = document.querySelector('#forms');
const product = document.querySelector('#product');

steel.addEventListener('click', function() {
  form.style.display = 'initial';
  product.value = '1';
});

aluminum.addEventListener('click', function() {
  form.style.display = 'initial';
  product.value = '2';
});

iron.addEventListener('click', function() {
  form.style.display = 'initial';
  product.value = '3';
});
