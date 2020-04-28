/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
const studentList = document.querySelectorAll('li.student-item');
const pageHeader = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');


// append search to DOM
pageHeader.appendChild(searchDiv);
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);

searchDiv.className = 'student-search';
searchInput.placeholder = 'Search for students...';
searchButton.textContent = 'search';


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
