/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
const studentList = document.querySelectorAll('li.student-item');
const body = document.querySelector('body');
const div = document.querySelector('div');
let linkDiv = document.createElement('div');

const showPage = (list, page) => {
  list = [...list];
  console.log(`Page Number is : ${page}`);
  let start;
  let end;
  if (page > 1 && page < 5){
    end = page * 10
    start = end - 10;
  } else if (page === 5) {
    start = page * 10;
    end = list.length;
  } else {
    start = page;
    end = page + 10;
  }

  for (let i = 0; i < list.length; i += 1) {
    if (i < start || i >= end) {
      list[i].style.display = 'none';
    } else {
      list[i].style.display = '';
    }
  }
};

const appendPageLinks = (list) => {
  let newLinkButton;
  list = [...list];
  let numOfButtons = list.length / 10;
  numOfButtons = Math.round(numOfButtons);
  for (let i = 1; i <= numOfButtons; i += 1) {
    newLinkButton = document.createElement('button');
    newLinkButton.textContent = i;
    newLinkButton.className = 'nav';
    linkDiv.appendChild(newLinkButton);
    linkDiv.style.textAlign = 'center';
    linkDiv.style.paddingTop = '10px';
    div.appendChild(linkDiv);
  }
  body.appendChild(div);
  // Set Default view to page 1
  showPage(studentList, 0);
};

appendPageLinks(studentList);

linkDiv.addEventListener('click', (event) => {
  let pageButton = event.target;
  let pageNum = pageButton.textContent;
  pageNum = Number(pageNum);
  if (pageButton.tagName === 'BUTTON' && pageNum !== 1) {
    showPage(studentList, pageNum);
  } else {
    showPage(studentList, 0);
  }
});
