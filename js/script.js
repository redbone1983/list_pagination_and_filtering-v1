/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
// Select Main DOM elements
const pageDiv = document.querySelector('.page');
const studentList = document.querySelectorAll('.student-item');
const mainUl = document.querySelector('.student-list');
const pageHeader = document.querySelector('.page-header');

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

// Helper Functions
const selectAndSpreadArray = (selector) => {
  let arr = document.querySelectorAll(selector);
  arr = [...arr];
  return arr;
};

// Show or Hide page of list items based on User's selection of Page number
const showPage = (list, page = 0) => {
  let firstItem = page * 10;
  let lastItem = firstItem + 9;
  list = [...list];

for (let item in list) {
    item = Number(item);
    if (item >= firstItem && item <= lastItem) {
      list[item].style.display = "";
    } else {
      list[item].style.display = "none";
    }
  }
};

// invoke to show default page view
showPage(studentList);

// Creates and Appends Pagination Links to the DOM
const appendPageLinks = list => {
  let pages;
  let numOfPages = Math.ceil(list.length / 10);
 
  // Create Page DOM elements
  const navDiv = document.createElement('div');
  const ul = document.createElement('ul');
  navDiv.className = 'pagination';
  
  // Append Page DOM elements
  pageDiv.appendChild(navDiv);
  navDiv.appendChild(ul);

  // For each page, Create & Append liElement, AnchorElement
  for (let i = 1; i < numOfPages; i += 1) {
    // Create and Append Page Anchor Link Buttons
    const listItem = document.createElement('li');
    const anchorLink = document.createElement('a');
    anchorLink.textContent = i;
    anchorLink.href = "#";
    listItem.appendChild(anchorLink);
    ul.appendChild(listItem);

    // Selects all Page Anchor Link Buttons
    pages = document.querySelectorAll('a');
    pages = [...pages];

    // Highlights Page Anchor Link Button when clicked
    anchorLink.addEventListener('click', (event) => {

      // Stores the number value of the page button clicked
      const pageNum = Number(event.target.textContent);
      
      // Iterates through array of all Page Anchor Links
      for (let link in pages) {
        // Sets their default className to inactive
        pages[link].className = 'inactive';
      }
      
      // Highlights Page Anchor Link Button if clicked
      event.target.className = 'active';

      //Check if on page 1
      if (pageNum === 1) {
        showPage(list, 0);
      } else {
        showPage(list, pageNum);
      }
    });
  }
};

// invoke to Create and Append Pagination Links
appendPageLinks(studentList); 

// Calculate Search Results
const generateSearchResults = (currentList, results) => {
  if (results.length === 0) {
    showPage(studentList);
    return;
  }
  currentList = [...currentList];
  results = [...results];
  
  for (let i = 0; i < currentList.length; i += 1) {
    if (results.includes(currentList[i])) {
      currentList[i].style.display = '';
    } else {
      currentList[i].style.display = 'none';
    }
  }
};

// Declare an empty string to store user input
let nameSearch = '';

// No results message/handler
let nameError = '';
const noResults = document.createElement('p');

  const notFound = (namesArr) => {
    pageDiv.insertBefore(noResults, mainUl);
  
    for (let name in namesArr) {
      nameError = namesArr[name];
      noResults.textContent = `${nameError} is not found in this directory.`;
    }
  };


// When a button on the keyboard is released
  // its letter value is used to search for a match in the student names array
searchInput.addEventListener('keyup', (event) => {
  let keyUpSearchResults = [];
  let nameNotFound = [];
  let studentProfiles = selectAndSpreadArray('.student-item');
  let studentNames = selectAndSpreadArray('h3');

  // Add/Subtract user input to nameSearch string
  let nextToLastIndex = nameSearch.length - 1;
  if (event.key === 'Backspace') {
    nameSearch = nameSearch.slice(0, nextToLastIndex);
    console.log(nameSearch);
  } else {
    nameSearch += event.key;
  }
  
  for (let i = 0; i < studentNames.length; i += 1){
    if (nameSearch !== '' && studentNames[i].textContent.includes(nameSearch)) {
      keyUpSearchResults.push(studentProfiles[i]);
    } else {
      nameNotFound.push(nameSearch);
    }
  }
  
  // Shows No results message if keyUpSearchResults array is empty
  if (keyUpSearchResults.length === 0 && nameSearch !== ''){
    notFound(nameNotFound);
    noResults.style.display = "";
  } else {
    noResults.style.display = 'none';
  }

  console.log(keyUpSearchResults.length);
  
  generateSearchResults(studentList, keyUpSearchResults);
});

// Adds a click eventListener to the search button
searchButton.addEventListener('click', (event) => {
  let searchList = [];   
  let nameSearch = searchInput.value;
  searchInput.value = '';
  let studentProfiles = document.querySelectorAll('.student-item');
  studentProfiles = [...studentProfiles];
  let studentNames = document.querySelectorAll('h3');
  studentNames = [...studentNames];
  for (let i = 0; i < studentNames.length; i += 1) {
    if (studentNames[i].textContent.includes(nameSearch)) {
      searchList.push(studentProfiles[i]);
    } 
  }
  generateSearchResults(studentList, searchList);
});
