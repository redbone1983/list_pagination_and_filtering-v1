/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Select Main DOM elements
const itemsPerPage = 10;
const studentLi = document.querySelectorAll('.student-item');
let runClick = false;
let runKeyup = false;

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

const appendPageLinks = list => {
  let numOfPages = Math.ceil(list.length / 10);
  let pageDiv = document.querySelector('.page');
  const navDiv = document.createElement('div');
  navDiv.className = 'pagination';
  const navUl = document.createElement('ul');
  
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
  document.querySelector('.page').removeChild(document.querySelector('div .pagination'));
};

// Shows default page view
showPage(studentLi, 1);

// Adds default page links
appendPageLinks(studentLi);

const createErrorMsg = () => {
  const studentUl = studentLi[0].parentNode;
  const pageDiv = studentUl.parentNode;
  let message = document.createElement('p');
  message.style.padding = '10px';
  message.style.display = 'none';
  pageDiv.insertBefore(message, studentUl);
};

createErrorMsg();

const showErrorMsg = (name) => {
  let message = document.querySelector('p');
  message.textContent = `${name} is not found in this directory.`;
  message.style.display = '';
};

const removeErrorMsg = () => {
  let message = document.querySelector('p');
  message.style.display = 'none';
};

const runSearch = (searchInput, list) => {
  removePageLinks();
  const searchResults = [];
  const studentNames = document.querySelectorAll('h3');
  let names = [...studentNames];

  for (let i = 0; i < names.length; i += 1) {
    if (!names[i].textContent.includes(searchInput.value.toLowerCase())) {
      list[i].style.display = 'none';
    } else {
      searchResults.push(list[i]);
    } 
  }

  // Updates browser view with searchResults
  showPage(searchResults, 1);
  
  // Updates pageLinks with searchResults
  appendPageLinks(searchResults);

  // Check Results 

  if (searchResults.length === 0) {
    showErrorMsg(searchInput.value);
  }

  if (searchInput.value.length === 0 || searchResults.length > 0) {
    removeErrorMsg();
  }
};

const addSearchBar = () => {
  const pageHeader = document.querySelector('.page-header');
  const searchDiv = document.createElement('div');
  const searchInput = document.createElement('input');
  searchDiv.className = 'student-search';
  searchInput.type = 'text';
  searchInput.placeholder = 'search for students...';
  
  // add search button set
  const clickSearchButton = document.createElement('button');
  const keyupEventButton = document.createElement('button');
  const resetButton = document.createElement('button');
  clickSearchButton.textContent = 'click search';
  keyupEventButton.textContent = 'keyup search';
  resetButton.textContent = 'reset';

  // Append Search Elements to the DOM
  pageHeader.appendChild(searchDiv);
  searchDiv.appendChild(clickSearchButton);
  searchDiv.appendChild(keyupEventButton);

  // Button to search with click feature
  clickSearchButton.addEventListener('click', () =>  {
    runClick = true;
    searchDiv.appendChild(searchInput);
    keyupEventButton.style.display = 'none';
    clickSearchButton.textContent = 'search';
    searchDiv.appendChild(clickSearchButton);
    searchDiv.appendChild(resetButton);
  });
 
  // Button to search with keyup feature
  keyupEventButton.addEventListener('click', () => {
    runKeyup = true;
    searchInput.placeholder = 'Enter text to search...';
    searchDiv.appendChild(searchInput);
    clickSearchButton.style.display = 'none';
    keyupEventButton.style.display = 'none';
    searchDiv.appendChild(resetButton);
  });

  // Reloads page
  resetButton.addEventListener('click', () => {
    location.reload();
    return false;
  });

  // Runs keyup search
  searchInput.addEventListener('keyup', (event) => {
    if (runKeyup) {
      runSearch(event.target, studentLi);
    } 
  });
  
  // Runs click search
  clickSearchButton.addEventListener('click', () => {
    if (runClick) {
      runSearch(searchInput, studentLi);
    } 
  });
};

addSearchBar();
