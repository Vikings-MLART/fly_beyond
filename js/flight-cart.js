/* eslint-disable no-undef */
'use strict';

let requestURL = '../json/flights-list.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
  const flights = request.response;


  for(let i =0; i < flights.length; i++){
    new Flight(flights[i].company, flights[i].duration, flights[i].departureTime, flights[i].arrivalTime
      , flights[i].origin, flights[i].destination, flights[i].price, flights[i].luggageWight);
  }


  renderFlights(true, 'economy', 1, Flight.flightList, 50);
};

let id = 0;


const Cart = function(items){
  this.items = items;
};


Cart.prototype.addItem = function(flightObj){
  let newItem = new CartItemOneWay(flightObj);
  newItem.id = id++;
  this.items.push(newItem);
};

Cart.prototype.addTwoItem = function(flightObj, flightObj2){
  let newItem = new CartItemTowWay(flightObj, flightObj2);
  newItem.id = id++;
  this.items.push(newItem);
};

Cart.prototype.removeItem = function(id){
  this.items.forEach( (item,index) =>{
    if(item.id === id){
      this.items.splice(index, 1);
    }
  });
};


Cart.prototype.saveToLocalStorage = function(){
  localStorage.setItem('flightCart', JSON.stringify(this.items));
};


const CartItemOneWay = function(flightObj){

  this.id;

  this.company = flightObj.company;
  this.duration = flightObj.duration;
  this.departureTime = flightObj.departureTime;
  this.arrivalTime = flightObj.arrivalTime;
  this.origin = flightObj.origin;
  this.destination = flightObj.destination;
  this.price = flightObj.price;
  this.luggageWight = flightObj.luggageWight;

};

const CartItemTowWay = function(flightObj_1, flightObj_2){

  this.id;

  this.company_1 = flightObj_1.company;
  this.duration_1 = flightObj_1.duration;
  this.departureTime_1 = flightObj_1.departureTime;
  this.arrivalTime_1 = flightObj_1.arrivalTime;
  this.origin_1 = flightObj_1.origin;
  this.destination_1 = flightObj_1.destination;
  this.price_1 = flightObj_1.price;
  this.luggageWight_1 = flightObj_1.luggageWight;

  this.company_2 = flightObj_2.company;
  this.duration_2 = flightObj_2.duration;
  this.departureTime_2 = flightObj_2.departureTime;
  this.arrivalTime_2 = flightObj_2.arrivalTime;
  this.origin_2 = flightObj_2.origin;
  this.destination_2 = flightObj_2.destination;
  this.price_2 = flightObj_2.price;
  this.luggageWight_2 = flightObj_2.luggageWight;

};


const Flight = function(company, duration, departureTime, arrivalTime, origin, destination, price, luggageWight){
  this.company = company;
  this.duration = duration;
  this.departureTime = departureTime;
  this.arrivalTime = arrivalTime;
  this.origin = origin;
  this.destination = destination;
  this.price = price;
  this.luggageWight = luggageWight;


  Flight.flightList.push(this);
};


Flight.flightList = [];
