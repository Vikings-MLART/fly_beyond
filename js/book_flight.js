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
};

let id = 0;


const Cart = function(items){
  this.items = items;
};


Cart.prototype.addItem = function(company, duration, departureTime, arrivalTime, origin, destination, price, luggageWight){
  let itemWight = new LuggageWight(luggageWight.economy, luggageWight.premiumEconomy, luggageWight.business, luggageWight.first);
  let itemPrice = new Price(price.economy, price.premiumEconomy, price.business, price.first);
  let newItem = new CartItem(company, duration, departureTime, arrivalTime, origin, destination,itemPrice,itemWight);
  newItem.id = id++;
  this.items.push(newItem);
  console.log(newItem.id);
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


const CartItem = function(company, duration, departureTime, arrivalTime, origin, destination, price, luggageWight){
  this.id;
  this.company = company;
  this.duration = duration;
  this.departureTime = departureTime;
  this.arrivalTime = arrivalTime;
  this.origin = origin;
  this.destination = destination;
  this.price = price;
  this.luggageWight = luggageWight;
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


const Price = function(economy, premiumEconomy, Business, First){
  this.economy = economy;
  this.premiumEconomy = premiumEconomy;
  this.Business = Business;
  this.First = First;
};


const LuggageWight = function(economy, premiumEconomy, business, first){
  this.economy = economy;
  this.premiumEconomy = premiumEconomy;
  this.business = business;
  this.first = first;
};
