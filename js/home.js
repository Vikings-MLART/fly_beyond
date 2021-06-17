'use strict';
let userStories = JSON.parse(localStorage.getItem('userStories')) || [];

const clearUsersStories = function(){
  document.querySelector('.users-stories').innerHTML = '';
};

const loadStories = function(){

  clearUsersStories();
  const userStoriesContainer = document.querySelector('.users-stories');

  let stop = userStories.length - 1 > 3 ? (userStories.length - 1) - 3 : 0;
  for(let i = userStories.length - 1; i >= stop; i--){
    let storyElement = document.createElement('div');
    storyElement.classList.add('story');
    storyElement.innerHTML = `<div class="user-img-name">
                                <img class="user-img" src="${userStories[i].imgPath}">
                                <h3>${userStories[i].name}</h3>
                              </div>
                              <div class="story-text-container">
                                <p class="story-text">${userStories[i].storyText}</p>
                              </div>
                              <div class="img-galary"></div>`;
    if(userStories[i].picArray.length){
      console.log('in if');
      for(let j = 0; j < userStories[i].picArray.length; j++){
        console.log('in for');
        storyElement.innerHTML += `<img class="galary-img" src="${userStories[i].picArray[j]}">`;
      }

      storyElement.innerHTML += `<div class="add-story">
                                   <a href="pages/story.html">Add Your Story
                                     <span class="material-icons-outlined">
                                       add_circle
                                     </span>
                                    </a>
                                 </div>`;
    }
    userStoriesContainer.appendChild(storyElement);
  }
  appendImgs();
  setUserStoryText();
  setUserStoryImgGalary();
};

function appendImgs(){
  const userStories = document.querySelectorAll('.story');

  userStories.forEach(story =>{
    const galary = story.querySelector('.img-galary');
    const imgList = story.querySelectorAll('.galary-img');
    imgList.forEach(img =>{
      galary.appendChild(img);
    });
  });

}

function setUserStoryText(){
  const textContainer = document.querySelector('.story-text-container');
  const textLength = document.querySelector('.story-text').textContent.length;

  if(textLength > 500){
    textContainer.style = 'overflow-y: scroll; overflow-x: hidden;';
  }
}

function setUserStoryImgGalary(){
  const imgGalary = document.querySelector('.img-galary');
  if(imgGalary.childElementCount > 4){
    imgGalary.style = 'overflow-y: scroll; overflow-x: hidden;';
  }
}

loadStories();


