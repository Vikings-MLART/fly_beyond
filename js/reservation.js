
let buttons = document.getElementById('submits');

document.addEventListener('submit', validateForm);

function validateForm(event) {
  event.preventDefault();
  alert('Thank you for confirming your reservation');

}



//for 20kg no fee
//for every extra 1kg the fee is 5 dollars

let button = document.getElementById('calc');
button.addEventListener('click', calculate);

let fees = document.getElementById('fees');





let extraF = document.createElement('p');

fees.appendChild(extraF);

function calculate(event) {

  event.preventDefault();

  let weight=document.getElementById('weight').value;
  // console.log(weight);

  if (weight <= 20) {

    extraF.textContent = 'There is no Extra Fee';

  }else{

    extraF.textContent= (weight-20)*5 ;

  }
}




let array=[{name:'John' ,price:500 , destination:'spain', class:'First'}, {name:'sara' ,price:600 , destination:'italy', class:'economy'} ];

let headArray=['name', 'price', 'destination', 'class'];



let father=document.getElementById('table');

let table=document.createElement('table');

father.appendChild(table);
table.setAttribute('style','border: solid black 1px;border-collapse: collapse;');

//Table heading

let getHeader = function () {

  let trElement = document.createElement('tr');
  table.append(trElement);
  trElement.setAttribute('style','border: solid black 1px;border-collapse: collapse;');

  for (let i = 0; i < headArray.length; i++) {

    let thElement = document.createElement('th');
    trElement.append(thElement);
    thElement.setAttribute('style','border: solid black 1px;border-collapse: collapse;');

    thElement.textContent = headArray[i];

  }
};

getHeader();


// table content
let render = function () {

  for (let j = 0; j < array.length; j++) {

    let trElement = document.createElement('tr');
    table.append(trElement);
    trElement.setAttribute('style','border: solid black 1px;border-collapse: collapse;');

    for(let y in array[j]){
      let thElement = document.createElement('th');
      trElement.append(thElement);
      thElement.setAttribute('style','border: solid black 1px;border-collapse: collapse;');

      thElement.textContent = array[j][y];

      // console.log(y + " => " + array[j][y]);
    }

  }
};
render();
