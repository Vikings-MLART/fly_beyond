'use strict';
let userStories = JSON.parse(localStorage.getItem('userStories')) || [];

const clearUsersStories = function(){
  document.querySelector('.users-stories').innerHTML = '';
};

const loadStories = function(){

  clearUsersStories();
  const userStoriesContainer = document.querySelector('.users-stories');
  if(userStories.length !== 0){
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
        for(let j = 0; j < userStories[i].picArray.length; j++)
          storyElement.innerHTML += `<img class="galary-img" src="${userStories[i].picArray[j]}">`;

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
  }else{
    const addNewStory = document.createElement('div');
    addNewStory.classList.add('story');
    addNewStory.innerHTML = `<div class="add-story">
                               <a href="pages/story.html">Add Your Story
                            <span class="material-icons-outlined">
                               add_circle
                            </span>
                            </a>
                            </div>`;
    userStoriesContainer.appendChild(addNewStory);
  }
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
  const userStories = document.querySelectorAll('.story');

  userStories.forEach(story => {
    const textContainer = story.querySelector('.story-text-container');
    const storyText = textContainer.querySelector('.story-text').textContent.length;
    if(storyText > 250){
      textContainer.querySelector('.story-text').style = 'overflow-x: hidden; overflow-y: scroll';
    }

  });
}

function setUserStoryImgGalary(){
  const stories = document.querySelectorAll('.story');
  stories.forEach( story =>{
    const galary = story.querySelector('.img-galary');
    if(galary.childElementCount > 4)
      galary.style = 'overflow-y: scroll; overflow-x: hidden;';
  });
}

function changeStory(index,length, list){

  if(index !== 0)
    list[index - 1].style = `order: ${index};`;

  list[index].style = 'order: 0';
  if(index < length - 1)
    index++;
  else
    index = 0;

  setTimeout(changeStory, time, index, length, list);
}

loadStories();

const storiesContainer = document.querySelector('.users-stories');
const storiesList = storiesContainer.querySelectorAll('.story');
const time = 3000;

if(userStories.length > 0)
  changeStory(0, storiesList.length, storiesList);



