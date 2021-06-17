/* eslint-disable no-undef */
'use strict';

let cart;

const loadCartItems = function(){
  const cartItems = JSON.parse(localStorage.getItem('flightCart')) || [];
  cart = new Cart(cartItems);
};

const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

const clearResults = function(){
  document.querySelector('.results-container').innerHTML = '';
};

const renderFlights = function(flightsList, numLoops){
  const flightsContainerElement = document.querySelector('.results-container');
  for(let i = 0; i < numLoops; i++){
    const cartContainer = document.createElement('div');
    cartContainer.addEventListener('click', removeFromCart);
    cartContainer.classList.add('cart');
    cartContainer;
    let ticketPrice = 0;
    let startTime;
    let duration;
    let endTime;
    if(!hasOwn(flightsList[i], 'company_1')){

      ticketPrice = ( parseInt(flightsList[i].price ) * parseInt(flightsList[i].passengers));
      startTime = flightsList[i].departureTime.split('T')[1].split('-')[0];
      duration = timeFromMins(flightsList[i].duration);
      endTime = addTimes(startTime, duration);
      startTime = tConvert(startTime);
      endTime = tConvert(endTime);
      cartContainer.innerHTML = `<div class="cart__ticket">
                                  <div class="cart__time-and-company">
                                    <h3>Flight Time ${startTime} - ${endTime}</h3>
                                    <div class="flight-company-info">
                                      <img src="../img/${flightsList[i].company}.png" alt="company logo" class="company-img">
                                      <p>${flightsList[i].company}</p>
                                      <span class="flight-class">Class ${flightsList[i].flightClass}</span>
                                    </div>
                                  </div>
                                  <div class="cart__duration-and-destination">
                                    <h3>Duration ${duration}</h3>
                                    <p>${flightsList[i].origin} - ${flightsList[i].destination}</p>
                                  </div>
                                </div>
                                <div class="cart__price-and-add">
                                <h3>Ticket Price ${ticketPrice}$</h3>
                                  <span class="material-icons-outlined remove-from-cart" id="${i}">
                                  remove_circle
                                  </span>
                                </div>`;
    }else{

      const ticketPrice_1 = parseInt(flightsList[i].price_1);
      const ticketPrice_2 = parseInt(flightsList[i].price_2);
      const totalPrice = ticketPrice_1 + ticketPrice_2 * parseInt(flightsList[i].passengers);
      let startTime_1 = flightsList[i].departureTime_1.split('T')[1].split('-')[0];
      let startTime_2 = flightsList[i].departureTime_2.split('T')[1].split('-')[0];
      const duration_1 = timeFromMins(flightsList[i].duration_1);
      const duration_2 = timeFromMins(flightsList[i].duration_2);
      let endTime_1 = addTimes(startTime_1, duration_1);
      let endTime_2 = addTimes(startTime_2, duration_2);
      startTime_1 = tConvert(startTime_1);
      startTime_2 = tConvert(startTime_2);
      endTime_1 = tConvert(endTime_1);
      endTime_2 = tConvert(endTime_2);

      cartContainer.innerHTML = `<div class="cart__ticket">
                                    <div class="cart__time-and-company">
                                      <h3>Flight Time ${startTime_1} - ${endTime_1}</h3>
                                    <div class="flight-company-info">
                                    <img src="../img/${flightsList[i].company_1}.png" alt="company logo" class="company-img">
                                      <p>${flightsList[i].company_1}</p>
                                      <span class="flight-class">Class ${flightsList[i].flightClass_1}</span>
                                    </div>
                                    </div>
                                    <div class="cart__duration-and-destination">
                                      <h3>Duration ${duration_1}</h3>
                                      <p>${flightsList[i].origin_1} - ${flightsList[i].destination_1}</p>
                                    </div>
                                    <div class="flight-price_1">Ticket Price ${flightsList[i].price_1}</div>
                                  </div>
                                  <div class="cart__ticket">
                                        <div class="cart__time-and-company">
                                          <h3>Flight Time ${startTime_2} - ${endTime_2}</h3>
                                        <div class="flight-company-info">
                                        <img src="../img/${flightsList[i].company_2}.png" alt="company logo" class="company-img">
                                          <p>${flightsList[i].company_2}</p>
                                          <span class="flight-class">Class ${flightsList[i].flightClass_2}</span>
                                        </div>
                                        </div>
                                        <div class="cart__duration-and-destination">
                                          <h3>Duration ${duration_2}</h3>
                                          <p>${flightsList[i].origin_2} - ${flightsList[i].destination_2}</p>
                                        </div>
                                        <div class="flight-price_2">Ticket Price ${flightsList[i].price_2}</div>
                                      </div>
                                      <div class="cart__price-and-add">
                                        <h3>Total Price ${totalPrice}$</h3>
                                        <span class="material-icons-outlined remove-from-cart" id="${i}">
                                        remove_circle
                                        </span>
                                      </div>`;
    }
    flightsContainerElement.appendChild(cartContainer);
  }
};

//https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no
function tConvert (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1); // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}

//https://stackoverflow.com/questions/25764553/add-2-times-together-javascript
// Convert a time in hh:mm format to minutes
function timeToMins(time) {
  let b = time.split(':');
  return b[0]*60 + +b[1];
}

// Convert minutes to a time in format hh:mm
// Returned value is in range 00  to 24 hrs
function timeFromMins(mins) {
  function z(n){return (n<10? '0':'') + n;}
  let h = (mins/60 |0) % 24;
  let m = mins % 60;
  return z(h) + ':' + z(m);
}


// Add two times in hh:mm format
function addTimes(t0, t1) {
  return timeFromMins(timeToMins(t0) + timeToMins(t1));
}


const removeFromCart = function(event){
  if(event.target.classList.contains('remove-from-cart')){
    cart.removeItem(event.target.id);
    cart.saveToLocalStorage();
    loadCartItems();
    clearResults();
    renderFlights(cart.items, cart.items.length);
  }
};

loadCartItems();
renderFlights(cart.items, cart.items.length);


document.querySelector('#weight').addEventListener('keyup', calculate);

function calculate(e) {
  e.preventDefault();
  let fee = document.getElementById('fee');
  let extraF = document.createElement('p');
  fee.innerHTML = '';
  fee.appendChild(extraF);
  let weight = document.getElementById('weight').value;
  if (weight <= 20) {
    extraF.textContent = 'There is no Extra Fee';
  } else if (weight > 20) {
    extraF.textContent = `${(weight - 20) * 5} $`;
  }
}

let form1=document.getElementById('form1');
let form2=document.getElementById('form2');
let form3=document.getElementById('form3');
let next1=document.getElementById('next1');
let next2=document.getElementById('next2');
let back1=document.getElementById('back1');
let back2=document.getElementById('back2');
let progress=document.getElementById('progress');

next1.onclick= function(){
  form1.style.left='-450px';
  form2.style.left='70px';
  progress.style.width='330px';
};

back1.onclick= function(){
  form2.style.left='560px';
  form1.style.left='70px';
  progress.style.width='130px';
};

next2.onclick= function(){
  form2.style.left='-450px';
  form3.style.left='70px';
  progress.style.width='550px';
};

back2.onclick= function(){
  form2.style.left='70px';
  form3.style.left='560px';
  progress.style.width='330px';
};

document.getElementById('form3').addEventListener('submit',confirmFlight);
function confirmFlight(event) {
  alert(`${fullName.value} Thank you for confirming your reservation`);
  event.preventDefault();
  document.querySelector('.results-container').innerHTML='';
}

