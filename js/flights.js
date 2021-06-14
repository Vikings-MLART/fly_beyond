/* eslint-disable no-undef */
'use strict';


const cartItems = JSON.parse(localStorage.getItem('flightCart')) || [];
const cart = new Cart(cartItems);


document.querySelector('#flight-type').addEventListener('change',function(){
  const flightType = document.querySelector('#flight-type').value;
  const arrivalDate = document.querySelector('#end-date');
  if(flightType === 'one way')
    arrivalDate.style = 'display: none;';
  else
    arrivalDate.style = 'display: inline-block;';

});

const setForm = function(){
  const departureDate = document.querySelector('#start-date');
  const arrivalDate = document.querySelector('#end-date');


  const date = new Date();
  const fromDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();

  departureDate.min = fromDate;
  departureDate.max = (date.getFullYear() + 1) + '-' + date.getMonth() + '-' + date.getDay();
  departureDate.value = fromDate;

  arrivalDate.min = fromDate;
  arrivalDate.max = (date.getFullYear() + 1) + '-' + date.getMonth() + '-' + date.getDay();
  departureDate.value = date.getFullYear() + '-' + date.getMonth() + '-' + (date.getDay() + 7);

  console.log(fromDate , '  ', arrivalDate);
};

setForm();

