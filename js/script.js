/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const studentList = document.querySelectorAll('li.student-item');
const body = document.querySelector('body');
const div = document.querySelector('div');
let linkDiv = document.createElement('div');


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

     Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/


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

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

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















// Remember to delete the comments that came with this file, and replace them with your own code comments.