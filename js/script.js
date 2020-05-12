/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Select Main DOM elements
const itemsPerPage = 10;
const pageDiv = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const studentUl = document.querySelector('.student-list');
const studentLi = document.querySelectorAll('.student-item');
const studentNames = document.querySelectorAll('h3');

// Add search components
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');
const keyupEventButton = document.createElement('button');
const resetButton = document.createElement('button');

searchDiv.className = 'student-search';
searchInput.type = 'text';
searchInput.placeholder = 'search for students...';
searchButton.textContent = 'click search';
keyupEventButton.textContent = 'keyup search';
resetButton.textContent = 'reset';

// Append Search Elements to the DOM
pageHeader.appendChild(searchDiv);
searchDiv.appendChild(searchButton);
searchDiv.appendChild(keyupEventButton);

// Initializes global boolean to false so search feature can be set by user
let runClick = false;
let runKeyup = false;

// ** Adds EventListener to buttons to activate 'exceeds' features **

// Button to search with click feature
searchButton.addEventListener('click', (event) =>  {
  runClick = true;
  searchDiv.appendChild(searchInput);
  keyupEventButton.style.display = 'none';
  event.target.textContent = 'search';
  searchDiv.appendChild(searchButton);
  searchDiv.appendChild(resetButton);
});
 
// Button to search with keyup feature
keyupEventButton.addEventListener('click', () => {
  runKeyup = true;
  searchInput.placeholder = 'Enter text to search...';
  searchDiv.appendChild(searchInput);
  searchButton.style.display = 'none';
  keyupEventButton.style.display = 'none';
  searchDiv.appendChild(resetButton);
});

// Reloads page
resetButton.addEventListener('click', () => {
  location.reload();
  return false;
});

// Shows 10 list items per selected page
const showPage = (list, page) => {
  list = [...list];
  let startIndex = (page * itemsPerPage) - itemsPerPage;
  let endIndex = page * itemsPerPage;
  
for (let item in list) {
    if (item >= startIndex && item < endIndex) {
      list[item].style.display = "";
    } else {
      list[item].style.display = "none";
    }
  }
};

// Creates and appends element to store 'No Results' message
let message = document.createElement('p');
message.style.padding = '10px';
message.style.display = 'none';
pageDiv.insertBefore(message, studentUl);


// Handles no results returned
const notFoundMessage = (name) => {
  message.textContent = `${name} is not found in this directory.`;
  message.style.display = '';
};

// Sets navDiv globally so page links can reset after each search
let navDiv;

const appendPageLinks = list => {
  let numOfPages = Math.ceil(list.length / 10);
  
  // Create Page Link DOM elements
  navDiv = document.createElement('div');
  const navUl = document.createElement('ul');
  navDiv.className = 'pagination';
    
  // Append Page Link DOM elements
  pageDiv.appendChild(navDiv);
  navDiv.appendChild(navUl);
  
  for (let i = 1; i <= numOfPages; i += 1) {
    const listItem = document.createElement('li');
    let anchorLink = document.createElement('a');
    if (i === 1) {
      anchorLink.className = 'active';
    }
    anchorLink.href = "#";
    anchorLink.textContent = i;
    listItem.appendChild(anchorLink);
    navUl.appendChild(listItem);
  
    anchorLink.addEventListener('click', (event) => {
      let pageClicked = Number(event.target.textContent);
      let pages = document.querySelectorAll('a');
      for (let i = 0; i < pages.length; i += 1) {
        pages[i].classList.remove('active');
      }
      event.target.className = 'active';
      showPage(list, pageClicked);
    });
  }
};

// Removes page links in order to avoid appending duplicates to the DOM
const removePageLinks = () => {
  pageDiv.removeChild(navDiv);
};

// Shows default page view
showPage(studentLi, 1);

// Adds default page links
appendPageLinks(studentLi);

// ** Adds functionality to the search component **

// Search Event Handler
const runSearchEvent = () => {
  let searchResults = [];
  let names = [...studentNames];
  for (let i = 0; i < names.length; i += 1) {
    if (!names[i].textContent.includes(searchInput.value.toLowerCase())) {
      studentLi[i].style.display = 'none';
    } else {
    // Paginate search results
      searchResults.push(studentLi[i]);
    } 
  }

  // Removes default page links
  removePageLinks();
  
  // Updates browser view with searchResults
  showPage(searchResults, 1);
  
  // Updates pageLinks with searchResults
  appendPageLinks(searchResults);
   
  // Displays 'No Results' message
  if (searchResults.length === 0) {
    notFoundMessage(searchInput.value);
  } 

  // Removes 'No Results' message if searchInput is empty
  if (searchInput.value.length === 0 || searchResults.length > 0) {
    message.style.display = 'none';
  }
};

searchInput.addEventListener('keyup', () => {
  if (runKeyup) {
    runSearchEvent();
  } 
});

searchButton.addEventListener('click', () => {
  if (runClick) {
    runSearchEvent();
  } 
}); 
