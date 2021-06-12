'use strict';
//Random user images for https://randomuser.me/
let randomUserImageURL;
const generateRandomUser =function(userGender){
  return new Promise(function(resolve){
    fetch('https://randomuser.me/api/?results=1')
      .then(res => res.json())
      .then(data => {
        if(data.results[0].gender === userGender)
          return resolve( data.results[0].picture.large);
        else{
          return resolve(generateRandomUser(userGender));
        }
      });
  });
};
async function storySubmtionHandler(event){
  event.preventDefault();
  const userName = event.target.name.value;
  const usetStoryText = event.target.description.value;
  const userGender = event.target.gender.value;
  randomUserImageURL = await generateRandomUser(userGender);
  new Story(userName, usetStoryText, randomUserImageURL);
  localStorage.setItem('userStories',JSON.stringify(Story.storiesList));
  renderStories();
  event.target.reset();
}
function Story(name, storyText, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.storyText = storyText;
  Story.storiesList.push(this);
}
Story.storiesList = [];
const clearStories = function(){
  document.querySelector('.users-stories-container').innerHTML = '';
};
const loadStorage = function(){
  Story.storiesList = JSON.parse(localStorage.getItem('userStories')) || [];
};
const renderStories = function(){
  console.log('out');
  clearStories();
  loadStorage();
  const userStoriesContainer = document.querySelector('.users-stories-container');
  console.log(Story.storiesList.length);
  for(let i = Story.storiesList.length - 1; i >= 0; i--){
    console.log('in');
    const storyElement = document.createElement('div');
    const storyTextContainer = document.createElement('div');
    const userName = document.createElement('h3');
    const userImage = document.createElement('img');
    const userStoryText = document.createElement('p');
    userName.textContent = Story.storiesList[i].name;
    userImage.src = Story.storiesList[i].imgPath;
    userStoryText.textContent = Story.storiesList[i].storyText;
    storyElement.classList.add('user-story');
    storyTextContainer.classList.add('story-text-container');
    storyTextContainer.appendChild(userName);
    storyTextContainer.appendChild(userStoryText);
    storyElement.appendChild(userImage);
    storyElement.appendChild(storyTextContainer);
    userStoriesContainer.appendChild(storyElement);
  }
};
document.querySelector('.story-form').addEventListener('submit', storySubmtionHandler);
renderStories();