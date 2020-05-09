/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Select Main DOM elements
const itemsPerPage = 10;
// let searchResults = [];
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

const showPage = (list, page) => {
  list = [...list];
  let startIndex = (page * itemsPerPage) - itemsPerPage;
  let endIndex = page * itemsPerPage;
  
for (let item in list) {
    item = Number(item);
    if (item >= startIndex && item < endIndex) {
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

const appendPageLinks = list => {
  let numOfPages = Math.ceil(list.length / 10);
  
  // Create Page DOM elements
  const navDiv = document.createElement('div');
  const navUl = document.createElement('ul');
  navDiv.className = 'pagination';
    
  // Append Page DOM elements
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
      let pages = document.querySelectorAll('a');
      for (let i = 0; i < pages.length; i += 1) {
        pages[i].classList.remove('active');
      }
      let pageClicked = Number(event.target.textContent);
      event.target.className = 'active';
      showPage(studentLi, pageClicked);
    });
  }
};

const removePageLinks = (links) => {
  links = [...links];
  for (let i = 0; i < links.length; i += 1) {
    links[i].style.display = 'none';
  }
};

showPage(studentLi, 1);
appendPageLinks(studentLi);

// Add a button that toggles on/off the keyup and click eventListener functionality
searchInput.addEventListener('keyup', (event) => {
  event.preventDefault();
  let pageLinks = document.querySelectorAll('.pagination a');
  let searchResults = [];
  let names = [...studentNames];
  for (let i = 0; i < names.length; i += 1) {
    if (!names[i].textContent.includes(searchInput.value.toLowerCase())) {
      studentLi[i].style.display = 'none'
    } else {
      searchResults.push(studentLi[i]);
    }
  }

  // Refactor and Make into a function that doesnt add duplicate page links
  showPage(searchResults, 1);
  removePageLinks(pageLinks);
  appendPageLinks(searchResults);

  if (searchResults.length === 0) {
    notFoundMessage(searchInput.value);
    removePageLinks(searchResults);
  } 

  if (searchInput.value.length === 0) {
    message.style.display = 'none';
    showPage(studentLi, 1);
  }
});

// Older eventListeners for reference

// searchButton.addEventListener('click', (event) => {
//   event.preventDefault();
  
//   studentSearch2(searchInput, studentNames);
//   removePageLinks(searchResults);
  

//   if (searchResults.length === 0) {
//     notFoundMessage(searchInput.value);
//     removePageLinks(searchResults);
//   } 

//   if (searchInput.value.length === 0) {
//      message.style.display = 'none';
//     showPage(studentLi, 0)
//   }
// }); 

// searchInput.addEventListener('keyup', () => {
//   studentSearch(searchInput, studentNames);
//   showPage(searchResults, 1);
//   removePageLinks(searchResults);
  
  // if (searchResults.length === 0) {
  //   notFoundMessage(searchInput.value);
  //   removePageLinks(searchResults);
  // } 

  // if (searchInput.value.length === 0) {
  //     message.style.display = 'none';
  //     showPage(studentLi, 0)
  //   }
//   });