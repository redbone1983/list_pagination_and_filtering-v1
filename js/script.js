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

// Refactor version 3 starts here (Mon, May 4th, 8:48pm) 

const studentSearch = (searchInput, names) => {
  searchResults = [];
  console.log(searchInput.value);
  console.log(names);
  for (let i = 0; i < names.length; i += 1) {
    studentLi[i].style.display = 'none';
    if (searchInput.value.length !== 0 && names[i].textContent.includes(searchInput.value)) {
      studentLi[i].style.display = '';
      searchResults.push(studentLi[i]);
    }
  }
  
};

// Show or Hide page of list items based on User's selection of Page number
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


// invoke to show default page view
showPage(studentLi, 0);

let anchorLink;

// For each page, Create & Append liElement, AnchorElement
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
  
  for (let i = 0; i < pageList; i += 1) {
    const listItem = document.createElement('li');
    anchorLink = document.createElement('a');
    anchorLink.textContent = i;
    anchorLink.href = "#";
    listItem.appendChild(anchorLink);
    ul.appendChild(listItem);
  

    // Adds click eventListener to each page link
    anchorLink.addEventListener('click', (event) => {
      let pageClicked = Number(event.target.textContent);
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

const removePageLinks = () => {
  let pageLinks = document.querySelectorAll('.pagination a');
  for (let i = 0; i < pageLinks.length; i += 1) {
    let parent = pageLinks[i].parentNode;
    parent.removeChild(pageLinks[i]);
  }
};

searchInput.addEventListener('keyup', () => {
  removePageLinks();
  studentSearch(searchInput, studentNames);
  appendPageLinks(searchResults);
  console.log('keyup works!');
  if (searchResults.length === 0) {
    // show default view
    showPage(studentLi, 0)
    removePageLinks();
    appendPageLinks(studentLi);
  } 
  });


searchButton.addEventListener('click', (event) => {
  // event.preventDefault();
  removePageLinks();
  studentSearch(searchInput, studentNames);
  appendPageLinks(searchResults);
  console.log('search button works!');
}); 

// Old code starts here...

// // Helper Functions
// const selectAndSpreadArray = (selector) => {
//   let arr = document.querySelectorAll(selector);
//   arr = [...arr];
//   return arr;
// };

// // Calculate Search Results
// const generateSearchResults = (currentList, results) => {
//   if (results.length === 0) {
//     showPage(studentLi);
//     return;
//   } else {
//     currentList = [...currentList];
//     results = [...results];
//   }
  
//   for (let i = 0; i < currentList.length; i += 1) {
//     if (results.includes(currentList[i])) {
//       currentList[i].style.display = '';
//     } else {
//       currentList[i].style.display = 'none';
//     }
//   }
// };

// // Declare an empty string to store user input
// let nameSearch = '';

// // No results message/handler
// let nameError = '';
// const noResults = document.createElement('p');

//   const notFoundMessage = (namesArr) => {
//     pageDiv.insertBefore(noResults, studentUl);
  
//     for (let name in namesArr) {
//       nameError = namesArr[name];
//       noResults.textContent = `${nameError} is not found in this directory.`;
//     }
//   };


// // When a button on the keyboard is released
//   // its letter value is used to search for a match in the student names array
// searchInput.addEventListener('keyup', (event) => {
//   let keyUpSearchResults = [];
//   let nameNotFound = [];
//   let studentProfiles = selectAndSpreadArray('.student-item');
//   let studentNames = selectAndSpreadArray('h3');

//   // Add/Subtract user input to nameSearch string
//   let nextToLastIndex = nameSearch.length - 1;
//   if (event.key === 'Backspace') {
//     nameSearch = nameSearch.slice(0, nextToLastIndex);
//   } else {
//     nameSearch += event.key;
//   }
  
//   // If a result is found, add it to keyUpSearchResults array
//   for (let i = 0; i < studentNames.length; i += 1){
//     if (nameSearch !== '' && studentNames[i].textContent.includes(nameSearch)) {
//       keyUpSearchResults.push(studentProfiles[i]);
//     } else {
//        // If a result is NOT found, add it to nameNotFound array
//       nameNotFound.push(nameSearch);
//     }
//   }
  
//   // Shows No results message if keyUpSearchResults array is empty or text input is emptu
//   if (keyUpSearchResults.length === 0 && nameSearch !== ''){
//     notFoundMessage(nameNotFound);
//     noResults.style.display = "";
//   } else {
//     noResults.style.display = 'none';
//   }

//   // invoke to Create and Append Pagination Links
//   generateSearchResults(studentLi, keyUpSearchResults);
// });

// // Adds a click eventListener to the search button
// searchButton.addEventListener('click', (event) => {
//   let searchList = [];   
//   let nameSearch = searchInput.value;
//   searchInput.value = '';
//   let studentProfiles = document.querySelectorAll('.student-item');
//   studentProfiles = [...studentProfiles];
//   let studentNames = document.querySelectorAll('h3');
//   studentNames = [...studentNames];
//   for (let i = 0; i < studentNames.length; i += 1) {
//     if (studentNames[i].textContent.includes(nameSearch)) {
//       searchList.push(studentProfiles[i]);
//     } 
//   }
//   generateSearchResults(studentLi, searchList);
// });
