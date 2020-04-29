/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
const mainUl = document.querySelector('.student-list');
let studentList = document.querySelectorAll('li.student-item');
const pageHeader = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');

// append search to DOM
pageHeader.appendChild(searchDiv);
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);

searchDiv.className = 'student-search';
searchInput.type = 'text';
searchInput.placeholder = 'Search for students...';
searchButton.textContent = 'search';

/* Search Button Functionality
When the searchButton is clicked
  Take value from searchInput
Iterate through each studentName in studentList
  if studentName contains searchInput letter
    show all studentNames starting with that letter in the DOM
*/

const selectAndSpreadArray = (selector) => {
  let arr = document.querySelectorAll(selector);
  arr = [...arr];
  return arr;
};



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
// showPage(studentList);

const appendPageLinks = (list) => {
  let numOfPages = list.length / 10;
  numOfPages = Math.round(numOfPages);
  const pageDiv = document.querySelector('.page');
  const navDiv = document.createElement('div');
  const ul = document.createElement('ul');
  navDiv.className = 'pagination';
  
  let pages;

  pageDiv.appendChild(navDiv);
  navDiv.appendChild(ul);

  for (let i = 1; i <= numOfPages; i += 1) {
    const listItem = document.createElement('li');
    const anchorLink = document.createElement('a');
    anchorLink.textContent = i;
    anchorLink.href = "#";
    listItem.appendChild(anchorLink);
    ul.appendChild(listItem);

    pages = document.querySelectorAll('a');
    pages = [...pages];

    anchorLink.addEventListener('click', (event) => {
      const pageNum = Number(event.target.textContent);
      
      for (let link in pages) {
        pages[link].className = 'inactive';
      }
      
      event.target.className = 'active';
      if (pageNum === 1) {
        showPage(list, 0);
      } else {
        showPage(list, pageNum);
      }
    });
  }
};

appendPageLinks(studentList);

// If search input contains a student name, then it will render in the browser view
const appendSearchResults = (currentList, searchList) => {
  currentList = [...currentList];
  searchList = [...searchList];
  for (let i = 0; i < currentList.length; i += 1) {
    if (searchList.includes(currentList[i])) {
     currentList[i].style.display = '';
    } else {
      currentList[i].style.display = 'none';
    }
  }
};

// When a button on the keyboard is released, its letter value is used to search for a match in the student names array
let nameSearch = '';
searchInput.addEventListener('keyup', (event) => {
  let studentProfiles = selectAndSpreadArray('.student-item');
  let searchList = [];   
  let studentNames = selectAndSpreadArray('h3');

  // This dynamically builds up a string value that is assigned to the nameSearch variable
  nameSearch += event.key;
  for (let word in studentNames){
    if (studentNames[word].textContent.includes(nameSearch)) {
      searchList.push(studentProfiles[word]);
    }
  }
  appendSearchResults(studentList, searchList);
});

// Adds a click eventListener to the search button
// searchButton.addEventListener('click', (event) => {
//   let searchList = [];   
//   let nameSearch = searchInput.value;
//   let studentProfiles = document.querySelectorAll('.student-item');
//   studentProfiles = [...studentProfiles];
//   let studentNames = document.querySelectorAll('h3');
//   studentNames = [...studentNames];
//   for (let i = 0; i < studentNames.length; i += 1) {
//     if (studentNames[i].textContent.includes(nameSearch)) {
//       searchList.push(studentProfiles[i]);
//     } 
//   }
//   appendSearchResults(searchList);
// });






