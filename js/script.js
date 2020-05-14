/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Select Main Global Variables
const studentLi = document.querySelectorAll('.student-item');
const itemsPerPage = 10;

// Shows 10 list items per selected page
const showPage = (list, page) => {
  let startIndex = (page * itemsPerPage) - itemsPerPage;
  let endIndex = page * itemsPerPage;

  for (let i = 0; i < list.length; i += 1) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
};

// Adds Pagination to each page
const appendPageLinks = list => {
  const numOfPages = Math.ceil(list.length / 10);
  const pageDiv = document.querySelector('.page');
  const navDiv = document.createElement('div');
  const navUl = document.createElement('ul');
  navDiv.className = 'pagination';
  
  // Appends div container to store list of page links
  pageDiv.appendChild(navDiv);
  navDiv.appendChild(navUl);
  
  // Creates a list item and anchor link for each page
  for (let i = 1; i <= numOfPages; i += 1) {
    const navli = document.createElement('li');
    let anchorLink = document.createElement('a');
    if (i === 1) {
      anchorLink.className = 'active';
    }
    anchorLink.href = "#";
    anchorLink.textContent = i;
    navli.appendChild(anchorLink);
    navUl.appendChild(navli);
    
    // Highlights page link selection
    anchorLink.addEventListener('click', (event) => {
      let pageClicked = Number(event.target.textContent);
      let pages = document.querySelectorAll('a');
      for (let i = 0; i < pages.length; i += 1) {
        pages[i].classList.remove('active');
      }
      event.target.className = 'active';
      // Shows page selected
      showPage(list, pageClicked);
    });
  }
};

// Removes page links in order to avoid appending duplicates to the DOM
const removePageLinks = () => {
  document.querySelector('.page').removeChild(document.querySelector('.pagination'));
};

// Shows default page view
showPage(studentLi, 1);

// Adds default page links
appendPageLinks(studentLi);

const createErrorMsg = list => {
  const studentUl = list[0].parentNode;
  const pageDiv = studentUl.parentNode;
  let message = document.createElement('p');
  message.style.padding = '10px';
  message.style.display = 'none';
  pageDiv.insertBefore(message, studentUl);
};

// Creates 'No results' message 
createErrorMsg(studentLi);

const showErrorMsg = (name, message) => {
  message.textContent = `${name} is not found in this directory.`;
  message.style.display = '';
};

const hideErrorMsg = message => message.style.display = 'none';

const runSearch = (searchInput, list) => {
  removePageLinks();
  const searchResults = [];
  const studentNames = document.querySelectorAll('h3');
  const message = document.querySelector('p');
  
  // Iterates over each name in list
  for (let i = 0; i < studentNames.length; i += 1) {
    // If user input value IS NOT present in name
    if (!studentNames[i].textContent.includes(searchInput.value.toLowerCase())) {
      // Hides student profile
      list[i].style.display = 'none';
    } else {
      // Adds student profile to search results
      searchResults.push(list[i]);
    } 
  }

  // Updates browser view with searchResults
  showPage(searchResults, 1);
  
  // Updates pageLinks with searchResults
  appendPageLinks(searchResults);

  // Shows 'No results' message
  if (searchResults.length === 0) {
    showErrorMsg(searchInput.value, message);
  }
  // Hides 'No results' message
  if (searchInput.value.length === 0 || searchResults.length > 0) {
    hideErrorMsg(message);
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

  // Activates click search feature
  clickSearchButton.addEventListener('click', (event) =>  {
    searchDiv.appendChild(searchInput);
    keyupEventButton.style.display = 'none';
    event.target.textContent = 'search';
    searchDiv.appendChild(event.target);
    searchDiv.appendChild(resetButton);
  });
 
  // Activates keyup search feature
  keyupEventButton.addEventListener('click', (event) => {
    searchInput.placeholder = 'Enter text to search...';
    searchDiv.appendChild(searchInput);
    clickSearchButton.style.display = 'none';
    event.target.style.display = 'none';
    searchDiv.appendChild(resetButton);
  });

  // Reloads page to reset search and view
  resetButton.addEventListener('click', () => {
    location.reload();
    return false;
  });

  // Runs keyup search
  searchInput.addEventListener('keyup', (event) => {
    if (event.target.placeholder === 'Enter text to search...') {
      runSearch(event.target, studentLi);
    }
  });
  
  // Runs click search
  clickSearchButton.addEventListener('click', (event) => {
    if (event.target.textContent === 'search') {
      runSearch(searchInput, studentLi);
    }
  });
};

addSearchBar();
