/* eslint-disable no-undef */
'use strict';

let isOneWay;
const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

const cartItems = JSON.parse(localStorage.getItem('flightCart')) || [];
const cart = new Cart(cartItems);

let desiredFlights = [];

const flightSearchHandler = function(event){
  event.preventDefault();
  const flightType = document.querySelector('#flight-type').value;
  const flightClass = document.querySelector('#flight-class').value;
  const passengers = document.querySelector('#passenger').value;
  const flyFrom = document.querySelector('#from').value;
  const flyTo = document.querySelector('#to').value;
  const departureDate = document.querySelector('#start-date').value;
  const arrivalDate = document.querySelector('#end-date').value;

  isOneWay = flightType === 'one way'? true: false;
  let oneWayFlightList = [];
  let twoWayFlightsList = [];
  oneWayFlightList = getFlights(flyFrom.trim().toLowerCase(), flyTo.trim().toLowerCase(), departureDate);

  if(!isOneWay){
    twoWayFlightsList = getFlights(flyTo.trim().toLowerCase(), flyFrom.trim().toLowerCase(), arrivalDate);
    desiredFlights = combineFlights(oneWayFlightList, twoWayFlightsList);
  }else
    desiredFlights = oneWayFlightList;

  renderFlights(isOneWay,flightClass, passengers, desiredFlights, desiredFlights.length);
};

const getFlights = function(flyFrom, flyTo, departureDate){
  let flightsList = [];
  for(let i = 0; i< Flight.flightList.length; i++){
    if(Flight.flightList[i].origin.toLowerCase() === flyFrom && Flight.flightList[i].destination.toLowerCase() === flyTo
    && Date.parse(Flight.flightList[i].departureTime.split('T')[0]) === Date.parse(departureDate))
      flightsList.push(Flight.flightList[i]);
  }
  return flightsList;
};

const combineFlights = function(oneWayFlightList, twoWayFlightsList){
  const roundTripFlightList =[];
  let combineFlightArray = [];
  for(let i = 0; i < oneWayFlightList.length; i++){
    for(let j = 0; j < twoWayFlightsList.length; j++){
      combineFlightArray.push(oneWayFlightList[i]);
      combineFlightArray.push(twoWayFlightsList[j]);
      roundTripFlightList.push(combineFlightArray);
      combineFlightArray = [];
    }
  }
  return roundTripFlightList;
};

const clearFlights = function(){
  // eslint-disable-next-line no-unused-vars
  const flightsContainerElement = document.querySelector('.search-results').innerHTML = '';
};

const renderFlights = function(isOneWay, flightClass ,passengers, flightsList, numLoops){
  clearFlights();
  desiredFlights = flightsList;
  const flightsContainerElement = document.querySelector('.search-results');
  for(let i = 0; i < numLoops; i++){

    const cartContainer = document.createElement('div');
    cartContainer.addEventListener('click', addToCartHandler);
    cartContainer.classList.add('cart');
    cartContainer.id = i;
    cartContainer;

    let ticketPrice = 0;
    let startTime;
    let duration;
    let endTime;
    if(isOneWay){

      ticketPrice = ( parseInt(flightsList[i].price[`${flightClass}`]) * parseInt(passengers));
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
                                        <span class="flight-class">Class ${flightClass}</span>
                                      </div>
                                    </div>
                                    <div class="cart__duration-and-destination">
                                      <h3>Duration ${duration}</h3>
                                      <p>${flightsList[i].origin} - ${flightsList[i].destination}</p>
                                    </div>
                                  </div>
                                  <div class="cart__price-and-add">
                                  <h3>Ticket Price ${ticketPrice}$</h3>
                                  <span class="material-icons-outlined add-to-cart" id="${i}">
                                    add_circle
                                  </span>
                                  <div class="flight-passengers" style="display: none;">${passengers}</div>
                                  </div>`;
    }else{

      for(let j = 0; j < flightsList[i].length; j++){

        ticketPrice += parseInt(flightsList[i][j].price[`${flightClass}`]);
        startTime = flightsList[i][j].departureTime.split('T')[1].split('-')[0];
        duration = timeFromMins(flightsList[i][j].duration);
        endTime = addTimes(startTime, duration);
        startTime = tConvert(startTime);
        endTime = tConvert(endTime);
        cartContainer.innerHTML = `<div class="cart__ticket">
                                      <div class="cart__time-and-company">
                                        <h3>Flight Time ${startTime} - ${endTime}</h3>
                                      <div class="flight-company-info">
                                      <img src="../img/${flightsList[i][0].company}.png" alt="company logo" class="company-img">
                                        <p>${flightsList[i][0].company}</p>
                                        <span class="flight-class">Class ${flightClass}</span>
                                      </div>
                                      </div>
                                      <div class="cart__duration-and-destination">
                                        <h3>Duration ${duration}</h3>
                                        <p>${flightsList[i][0].origin} - ${flightsList[i][0].destination}</p>
                                      </div>
                                      <div class="flight-price_1">Ticket Price ${flightsList[i][0].price[`${flightClass}`]}</div>
                                    </div>`;

        if(j === 1){
          ticketPrice *= parseInt(passengers);
          cartContainer.innerHTML += ` 
                                     <div class="cart__ticket">
                                       <div class="cart__time-and-company">
                                         <h3>Flight Time ${startTime} - ${endTime}</h3>
                                       <div class="flight-company-info">
                                       <img src="../img/${flightsList[i][1].company}.png" alt="company logo" class="company-img">
                                         <p>${flightsList[i][1].company}</p>
                                         <span class="flight-class">Class ${flightClass}</span>
                                       </div>
                                       </div>
                                       <div class="cart__duration-and-destination">
                                         <h3>Duration ${duration}</h3>
                                         <p>${flightsList[i][1].origin} - ${flightsList[i][1].destination}</p>
                                       </div>
                                       <div class="flight-price_2">Ticket Price ${flightsList[i][1].price[`${flightClass}`]}</div>
                                      </div>
                                      <div class="cart__price-and-add">
                                        <h3>Total Price ${ticketPrice}$</h3>
                                        <span class="material-icons-outlined add-to-cart" id="${i}">
                                           add_circle
                                        </span>
                                        <div class="flight-passengers" style="display: none;">${passengers}</div>
                                      </div>`;
        }
      }
    }
    flightsContainerElement.appendChild(cartContainer);
  }

  const filterBtn =  document.querySelector('.filter-btn');
  filterBtn.removeAttribute('disabled');
  filterBtn.addEventListener('click', filterHandler);
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

const filterHandler = function(e){
  e.preventDefault();
  const filterOn = document.querySelector('#filter-options').value;
  let filteredList = Flight.flightList;

  if(filterOn === 'cheapest')
    filteredList.sort(filterOnChepest);
  else if(filterOn === 'best')
    filteredList.sort(filterOnBest);
  else
    filteredList.sort(filterOnClosest);

  renderFlights(true, 'economy', 1, filteredList, filteredList.length);
};

function filterOnChepest(a, b) {

  if ( a.price['economy'] < b.price['economy'] ){
    return -1;
  }
  if ( a.price['economy'] > b.price['economy'] ){
    return 1;
  }
  return 0;
}


function filterOnClosest(a, b) {

  if ( Date.parse(a.departureTime.split('T')[0]) < Date.parse(b.departureTime.split('T')[0]) ){
    return -1;
  }
  if ( Date.parse(a.departureTime.split('T')[0]) > Date.parse(b.departureTime.split('T')[0]) ){
    return 1;
  }
  return 0;
}


function filterOnBest(a, b) {

  if ( (a.price['economy'] < b.price['economy'])
     && ( Date.parse(a.departureTime.split('T')[0]) < Date.parse(b.departureTime.split('T')[0])) ){
    return -1;
  }
  if ( (a.price['economy'] > b.price['economy'])
  && ( Date.parse(a.departureTime.split('T')[0]) > Date.parse(b.departureTime.split('T')[0])) ){
    return 1;
  }
  return 0;
}

const getOneWayTicketData = function(id){
  let list = [];

  list.push(document.getElementById(`${id}`).querySelector('.flight-passengers').textContent);
  list.push(document.getElementById(`${id}`).querySelector('.flight-class').textContent.split(' ')[1]);
  list.push(document.getElementById(`${id}`).querySelector('.cart__price-and-add h3').textContent.split(' ')[2]);

  return list;
};

const getTwoWayTicketData = function(id){
  let list = [];

  list.push(document.getElementById(`${id}`).querySelector('.flight-passengers').textContent);
  list.push(document.getElementById(`${id}`).querySelector('.flight-class').textContent.split(' ')[1]);
  list.push(document.getElementById(`${id}`).querySelector('.flight-price_1').textContent.split(' ')[2]);
  list.push(document.getElementById(`${id}`).querySelector('.flight-price_2').textContent.split(' ')[2]);

  return list;
};


const addToCartHandler = function(event){
  event.preventDefault();

  /*Use desieredFlight[0].hasOwnProperty('company') true => oneWay*/
  if(event.target.classList.contains('add-to-cart') && !event.target.classList.contains('added')){
    let ticketDataList = [];
    if(hasOwn(desiredFlights[event.target.id], 'company')){
      ticketDataList = getOneWayTicketData(event.target.id);
      cart.addItem(desiredFlights[event.target.id], ticketDataList[0], ticketDataList[1], ticketDataList[2]);
    }
    else{
      ticketDataList = getTwoWayTicketData(event.target.id);
      cart.addTwoItem(desiredFlights[event.target.id][0], ticketDataList[1], ticketDataList[2],
        desiredFlights[event.target.id][1], ticketDataList[1], ticketDataList[3], ticketDataList[0]);
    }

    cart.saveToLocalStorage();
    event.target.classList.add('added');
  }
};

document.querySelector('.flight-form').addEventListener('submit', flightSearchHandler);

const listChangeHandler = function(){
  const flightType = document.querySelector('#flight-type').value;
  const arrivalDate = document.querySelector('#end-date');
  if(flightType === 'one way')
    arrivalDate.style = 'display: none;';
  else{
    arrivalDate.style = 'display: inline-block;';
    arrivalDate.setAttribute('required', 'required');
  }
};

document.querySelector('#flight-type').addEventListener('change', listChangeHandler);

const setForm = function(){
  listChangeHandler();
  const departureDate = document.querySelector('#start-date');
  const arrivalDate = document.querySelector('#end-date');

  //https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  departureDate.min = today;
  departureDate.max = (yyyy + 1) + '-' + mm + '-' + dd;
  departureDate.value = today;

  arrivalDate.min = today;
  arrivalDate.max = (yyyy + 1) + '-' + mm + '-' + dd;
  arrivalDate.value = yyyy + '-' + mm + '-' + (parseInt(dd) + 7);

  document.querySelector('.filter-btn').setAttribute('disabled', 'disabled');
};

setForm();

