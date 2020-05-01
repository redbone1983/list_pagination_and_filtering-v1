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

// Main view function
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

// Page navigation links
const appendPageLinks = list => {
  let pages;
  // Calculate how many page links to show
  let numOfPages = list.length / 10;
  numOfPages = Math.round(numOfPages);

  // Create Page DOM elements
  const navDiv = document.createElement('div');
  const ul = document.createElement('ul');
  navDiv.className = 'pagination';
  
  // Append Page DOM elements
  pageDiv.appendChild(navDiv);
  navDiv.appendChild(ul);

  // For each page, Create & Append liElement, AnchorElement
  for (let i = 1; i <= numOfPages; i += 1) {
    const listItem = document.createElement('li');
    const anchorLink = document.createElement('a');
    anchorLink.textContent = i;
    anchorLink.href = "#";
    listItem.appendChild(anchorLink);
    ul.appendChild(listItem);

    // Select page anchor tags to add selected view
    pages = document.querySelectorAll('a');
    pages = [...pages];

    anchorLink.addEventListener('click', (event) => {
      const pageNum = Number(event.target.textContent);
      
      // Deselect all page buttons
      for (let link in pages) {
        pages[link].className = 'inactive';
      }
      
      // Select page button if clicked
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

appendPageLinks(studentList);

// Calculate Search Results
const generateSearchResults = (currentList, results) => {
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
const noResults = document.createElement('p');
noResults.textContent = `Profile name is not found in this directory.`;
noResults.style.display = 'none';
pageDiv.insertBefore(noResults, mainUl);

// When a button on the keyboard is released
  // - its letter value is used to search for a match in the student names array
searchInput.addEventListener('keyup', (event) => {
  // Declare an empty array to store search results
  let searchResults = [];
  let studentProfiles = selectAndSpreadArray('.student-item');
  let studentNames = selectAndSpreadArray('h3');

  // Add/Subtract user input to nameSearch string
  if (event.key === 'Backspace') {
    let lastLetter = nameSearch[nameSearch.length - 1];
    nameSearch = nameSearch.replace(lastLetter, '');
  } else {
    nameSearch += event.key;
  }
  
  for (let word in studentNames){
    // If userInput renders a students name
    if (studentNames[word].textContent.includes(nameSearch)) {
      // Add the student profile to search results
      searchResults.push(studentProfiles[word]);
    }
  }
 
  if (searchResults.length === 0) {
    noResults.style.display = "";
    showPage(studentList);
  } else {
    noResults.style.display = "none";
  }

  // Pass the original studentList and current searchResults list to generate new results view
  generateSearchResults(studentList, searchResults);
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
