'use strict';
let buttons = document.getElementById('confirm');

document.addEventListener('submit', validateForm);

let cardName=document.getElementById('fullName');
function validateForm(event) {

  alert(`${cardName.value} Thank you for confirming your reservation`);

}



//for 20kg no fee
//for every extra 1kg the fee is 5 dollars


let fees = document.getElementById('fees');


let extraF = document.createElement('p');

fees.appendChild(extraF);
function calculate() {
  let weight = document.getElementById('weight').value;

  console.log(weight);

  if (weight <= 20) {

    extraF.textContent = 'There is no Extra Fee';

  } else if (weight > 20) {

    extraF.textContent = `${(weight - 20) * 5} $`;

  }
}




let array = [{ name: 'John', price: 500, destination: 'spain', class: 'First' }, { name: 'sara', price: 600, destination: 'italy', class: 'economy' }];

let headArray = ['name', 'price', 'destination', 'class','remove'];



let father = document.getElementById('table');

let table = document.createElement('table');

father.appendChild(table);
table.setAttribute('style', 'border: solid black 1px;border-collapse: collapse;');

//Table heading

let getHeader = function () {

  let trElement = document.createElement('tr');
  table.append(trElement);
  trElement.setAttribute('style', 'border: solid black 1px;border-collapse: collapse;');

  for (let i = 0; i < headArray.length; i++) {

    let thElement = document.createElement('th');
    trElement.append(thElement);
    thElement.setAttribute('style', 'border: solid black 1px;border-collapse: collapse;');

    thElement.textContent = headArray[i];

  }
};

getHeader();


// table content
// table content
let total=0;
let render = function () {
  total =0;
  for (let j = 0; j < array.length; j++) {

    let trElement = document.createElement('tr');

    table.append(trElement);
    trElement.setAttribute('style','border: solid black 1px;border-collapse: collapse;');


    for(let y in array[j]){
      let thElement = document.createElement('th');
      trElement.append(thElement);
      thElement.setAttribute('style','border: solid black 1px;border-collapse: collapse;');
      thElement.textContent = array[j][y];

    }

    total+=array[j].price;
    let thElement = document.createElement('th');
    trElement.append(thElement);
    thElement.setAttribute('style','border: solid black 1px;border-collapse: collapse;');
    let btn= document.createElement('button');
    thElement.append(btn);


    // give the button an id related to the element index (for the first element the button id will be btn0, for the second element btn1 .... )
    btn.setAttribute('id', 'btn'+j);
    // trElement.appendChild(btn);
    btn.textContent='remove';
  }
};

render();
addTotal();

function addingClick(){

  for (let i=0; i<array.length; i++){
    // get all buttons we created in the render function and add onclick function

    let btn=document.getElementById(`btn${i}`);
    btn.onclick= function(){
      console.log('total', total);
      total-=array[i].price;
      console.log('total', total);
      console.log(array[i].price);

      // the button id= btni then remove the i element from the array
      array.splice(i,1);




      table.textContent='';
      getHeader();
      //render again
      render();


      // console.log(array[i].price);
      addingClick();

      addTotal();
    };
  }

}
addingClick();





function addTotal(){
  console.log(total);
  let footer= document.createElement('tfoot');
  footer.setAttribute('style', 'border: solid black 1px;border-collapse: collapse;');

  table.appendChild(footer);

  let thBox=document.createElement('th');
  thBox.setAttribute('style', 'border: solid black 1px;border-collapse: collapse;');
  footer.appendChild(thBox);
  thBox.textContent='Total:'+total;
}




















