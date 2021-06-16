/* eslint-disable no-undef */
'use strict';

const cartItems = JSON.parse(localStorage.getItem('flightCart')) || [];
const cart = new Cart(cartItems);


const renderFlights = function(isOneWay, flightClass ,passengers, flightsList, numLoops){
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
    if(isOneWay){

      ticketPrice = ( parseInt(flightsList[i].price[`${flightClass}`]) * parseInt(passengers));
      startTime = flightsList[i].departureTime.split('T')[1].split('-')[0];
      duration = timeFromMins(flightsList[i].duration);
      endTime = addTimes(startTime, duration);
      startTime = tConvert(startTime);
      endTime = tConvert(endTime);
      cartContainer.innerHTML = `<div class="cart__ticket">
                                      <div class="cart__time-and-company">
                                        <h3>${startTime} - ${endTime}</h3>
                                        <p>${flightsList[i].company}</p>
                                      </div>
                                      <div class="cart__duration-and-destination">
                                        <h3>${duration}</h3>
                                        <p>${flightsList[i].origin} - ${flightsList[i].destination}</p>
                                      </div>
                                    </div>
                                    <div class="cart__price-and-add">
                                    <h3>${ticketPrice}$</h3>
                                    <span class="material-icons-outlined remove-from-cart" id="${i}">
                                    remove_circle
                                    </span>
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
                                          <h3>${startTime} - ${endTime}</h3>
                                          <p>${desiredFlights[i][0].company}</p>
                                        </div>
                                        <div class="cart__duration-and-destination">
                                          <h3>${duration}</h3>
                                          <p>${flightsList[i][0].origin} - ${flightsList[i][0].destination}</p>
                                        </div>
                                      </div>`;

        if(j === 1){
          ticketPrice *= parseInt(passengers);
          cartContainer.innerHTML += ` 
                                       <div class="cart__ticket">
                                         <div class="cart__time-and-company">
                                           <h3>${startTime} - ${endTime}</h3>
                                           <p>${flightsList[i][1].company}</p>
                                         </div>
                                         <div class="cart__duration-and-destination">
                                           <h3>${duration}</h3>
                                           <p>${flightsList[i][1].origin} - ${flightsList[i][1].destination}</p>
                                         </div>
                                        </div>
                                        <div class="cart__price-and-add">
                                          <h3>${ticketPrice}$</h3>
                                          <span class="material-icons-outlined remove-from-cart" id="${i}">
                                          remove_circle
                                          </span>
                                        </div>`;
        }
      }
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
    if(isOneWay)
      cart.addItem(desiredFlights[event.target.id]);
    else
      cart.addTwoItem(desiredFlights[event.target.id][0], desiredFlights[event.target.id][1]);

    cart.saveToLocalStorage();
    event.target.classList.add('added');
  }
};


// let fees = document.getElementById('fees');
// let extraF = document.createElement('p');
// fees.appendChild(extraF);
// let father = document.getElementById('table');
// let table = document.createElement('table');
// let cardName=document.getElementById('fullName');

// let headArray = ['Flight Company ', ' duration ', ' Departure Time', ' Araival Time', 'Origin', 'Destination', 'Price', 'Allowed Luggage Wight', 'remove'];

// father.appendChild(table);
// table.setAttribute('style', 'border: solid black 1px;border-collapse: collapse;');


// document.getElementById('info').addEventListener('submit', validateForm);

// const cartItems = JSON.parse(localStorage.getItem('flightCart')) || [];
// const cart = new Cart(cartItems);

// let array = cart.items;

// function validateForm(event) {

//   alert(`${cardName.value} Thank you for confirming your reservation`);
//   event.preventDefault();

//   table.textContent='';
// }

// function calculate() {
//   let weight = document.getElementById('weight').value;

//   if (weight <= 20) {

//     extraF.textContent = 'There is no Extra Fee';

//   } else if (weight > 20) {

//     extraF.textContent = `${(weight - 20) * 5} $`;


//   }

// }


// //Table heading

// let getHeader = function () {

//   let trElement = document.createElement('tr');
//   table.append(trElement);
//   trElement.setAttribute('style', 'border: solid black 1px;border-collapse: collapse;');

//   for (let i = 0; i < headArray.length; i++) {

//     let thElement = document.createElement('th');
//     trElement.append(thElement);
//     thElement.setAttribute('style', 'border: solid black 1px;border-collapse: collapse;');

//     thElement.textContent = headArray[i];

//   }
// };

// getHeader();


// // table content
// // table content
// let total=0;
// let render = function () {
//   console.log('array = ' + array[0]);
//   total =0;
//   for (let j = 0; j < array.length; j++) {

//     let trElement = document.createElement('tr');

//     table.append(trElement);
//     trElement.setAttribute('style','border: solid black 1px;border-collapse: collapse;');


//     for(let y in array[j]){
//       let thElement = document.createElement('th');
//       trElement.append(thElement);
//       thElement.setAttribute('style','border: solid black 1px;border-collapse: collapse;');
//       thElement.textContent = array[j][y];
//     }

//     total+=array[j].price;
//     let thElement = document.createElement('th');
//     trElement.append(thElement);
//     thElement.setAttribute('style','border: solid black 1px;border-collapse: collapse;');
//     let btn= document.createElement('button');
//     thElement.append(btn);


//     // give the button an id related to the element index (for the first element the button id will be btn0, for the second element btn1 .... )
//     btn.setAttribute('id', 'btn'+j);
//     // trElement.appendChild(btn);
//     btn.textContent='remove';
//   }
// };

// render();
// addTotal();

// function addingClick(){

//   for (let i=0; i<array.length; i++){
//     // get all buttons we created in the render function and add onclick function

//     let btn=document.getElementById(`btn${i}`);
//     btn.onclick= function(){
//       console.log('total', total);
//       total-=array[i].price;
//       console.log('total', total);
//       console.log(array[i].price);

//       // the button id= btni then remove the i element from the array
//       array.splice(i,1);

//       table.textContent='';
//       getHeader();
//       //render again
//       render();


//       // console.log(array[i].price);
//       addingClick();

//       addTotal();
//     };
//   }
// }
// addingClick();

// function addTotal(){
//   console.log(total);
//   let footer= document.createElement('tfoot');
//   footer.setAttribute('style', 'border: solid black 1px;border-collapse: collapse;');

//   table.appendChild(footer);

//   let thBox=document.createElement('th');
//   thBox.setAttribute('style', 'border: solid black 1px;border-collapse: collapse;');
//   footer.appendChild(thBox);
//   thBox.textContent='Total:'+total;
// }
