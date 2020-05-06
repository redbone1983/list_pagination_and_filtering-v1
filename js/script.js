/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Select Main DOM elements
let searchResults = [];
const pageDiv = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const studentUl = document.querySelector('.student-list');
const studentLi = document.querySelectorAll('.student-item');
const studentNames = document.querySelectorAll('h3');

// Create Search Elements
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');

searchDiv.className = 'student-search';
searchInput.type = 'text';
searchInput.placeholder = 'Search for students...';
searchButton.textContent = 'search';

// Append Search Elements to the DOM
pageHeader.appendChild(searchDiv);
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);

const studentSearch = (searchInput, names) => {
  searchResults = [];
  for (let i = 0; i < names.length; i += 1) {
    studentLi[i].style.display = 'none';
    if (names[i].textContent.startsWith(searchInput.value.toLowerCase())) {
      studentLi[i].style.display = '';
      searchResults.push(studentLi[i]);
    }
  }
};

const showPage = (list, page) => {
  list = [...list];
  let firstItem = page * 10;
  let lastItem = firstItem + 9;
  
for (let item in list) {
    item = Number(item);
    if (item >= firstItem && item <= lastItem) {
      list[item].style.display = "";
    } else {
      list[item].style.display = "none";
    }
  }
};

let message = document.createElement('p');
message.style.padding = '10px';
message.style.display = 'none';
pageDiv.insertBefore(message, studentUl);

const notFoundMessage = (name) => {
  message.textContent = `${name} is not found in this directory.`;
  message.style.display = '';
};

// invoke to show default page view
showPage(studentLi, 0);

const removePageLinks = (list) => {
  let pageLinks = document.querySelectorAll('.pagination a');
  let numOfPageButtonsToShow = Math.ceil(list.length / 10);
  for (let i = 0; i < pageLinks.length; i += 1) {
    if (i >= numOfPageButtonsToShow) {
      pageLinks[i].style.display = 'none';
    } else {
      pageLinks[i].style.display = '';
    }
  }
};

let anchorLink;
const appendPageLinks = (list) => {
  let pageList;
  if (list.length < 10) {
    // set page default page and nav view
    pageList = 1;
  } else {
    pageList = Math.ceil(list.length / 10);
  }
  // Create Page DOM elements
  const navDiv = document.createElement('div');
  const ul = document.createElement('ul');
  navDiv.className = 'pagination';
    
  // Append Page DOM elements
  pageDiv.appendChild(navDiv);
  navDiv.appendChild(ul);
  
  for (let i = 1; i <= pageList; i += 1) {
    const listItem = document.createElement('li');
    anchorLink = document.createElement('a');
    anchorLink.href = "#";
    anchorLink.textContent = i;
    listItem.appendChild(anchorLink);
    ul.appendChild(listItem);
  

    // Adds click eventListener to each page link
    anchorLink.addEventListener('click', (event) => {
      let pageClicked = Number(event.target.textContent) - 1;
      let pages = document.querySelectorAll('a');
      pages = [...pages];
      for (let i = 0; i < pages.length; i += 1) {
        if (pages[i] === event.target) {
          pages[i].className = 'active';
        } else {
          pages[i].className = 'inactive';
        }
      }
      showPage(studentLi, pageClicked);
    });
  }
};

appendPageLinks(studentLi);

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  removePageLinks(searchResults);
  studentSearch(searchInput, studentNames);
  appendPageLinks(searchResults);
}); 

searchInput.addEventListener('keyup', () => {
  studentSearch(searchInput, studentNames);
  removePageLinks(searchResults);

  if (searchResults.length === 0) {
    notFoundMessage(searchInput.value);
    removePageLinks(searchResults);
  } 

  if (searchInput.value.length === 0) {
      message.style.display = 'none';
      showPage(studentLi, 0)
    }
  });


