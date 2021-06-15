'use strict';
let userStories = JSON.parse(localStorage.getItem('userStories')) || [];


const addNewStory = function(){
  const storyElement = document.createElement('div');
  const addStoryLink = document.createElement('a');
  const addStoryIcon = document.createElement('span');

  addStoryIcon.classList.add('material-icons-outlined');
  addStoryIcon.textContent = 'add_circle';
  addStoryLink.href = 'pages/story.html';
  addStoryLink.textContent = 'Add Your Story';
  storyElement.classList.add('user-story');
  storyElement.appendChild(addStoryLink);
  storyElement.appendChild(addStoryIcon);

  return storyElement;
};

const clearUsersStories = function(){
  document.querySelector('.users-stories').innerHTML = '';
  console.log('clearUsersStories ');
};

const loadStories = function(){

  clearUsersStories();
  const userStoriesContainer = document.querySelector('.users-stories');

  console.log('length ' + userStories.length);

  let stop = userStories.length - 1 > 3 ? (userStories.length - 1) - 3 : 0;
  for(let i = userStories.length - 1; i >= stop; i--){
    const storyElement = document.createElement('div');
    const storyTextContainer = document.createElement('div');
    const userName = document.createElement('h3');
    const userImage = document.createElement('img');
    const userStoryText = document.createElement('p');

    userName.textContent = userStories[i].name;
    userImage.src = userStories[i].imgPath;
    userStoryText.textContent = userStories[i].storyText;
    storyElement.classList.add('user-story');
    storyTextContainer.classList.add('story-text-container');

    storyTextContainer.appendChild(userName);
    storyTextContainer.appendChild(userStoryText);
    storyElement.appendChild(userImage);
    storyElement.appendChild(storyTextContainer);
    userStoriesContainer.appendChild(storyElement);
  }

  userStoriesContainer.appendChild(addNewStory());
};


loadStories();
