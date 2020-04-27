/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

const studentList = document.querySelectorAll('li.student-item');

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
  
  pageDiv.appendChild(navDiv);
  navDiv.appendChild(ul);

  
  let pages;

  for (let i = 1; i <= numOfPages; i += 1) {
    const listItem = document.createElement('li');
    pages = document.querySelectorAll('a');
    pages = [...pages];
    const anchorLink = document.createElement('a');
    anchorLink.textContent = i;
    anchorLink.href = "#";

    
    listItem.appendChild(anchorLink);
    ul.appendChild(listItem);

    anchorLink.addEventListener('click', (event) => {
      const pageNum = Number(event.target.textContent);
      
      for (let anchor in pages) {
        if (pages[anchor].className === 'active') {
          pages[anchor].className = 'inactive';
        } 
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
