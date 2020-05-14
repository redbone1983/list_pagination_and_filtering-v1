# list_pagination_and_filtering-v1

[Link to browser view of App](https://redbone1983.github.io/list_pagination_and_filtering-v1/)

This program uses Javascript for DOM manipulation.

## What does it do?

Paginates and filters html of a long list of student profiles
 
## How does it do it?

- ### Pagination

    - Breaks a long list of student profiles into (x) amount of pages depending on length of student list

    - Adds page links to the bottom of each page so that user can navigate through each page of list

- ### Filtering

    - Adds 3 types of search button features for User to choose from

      1. `Search` - When clicked, User can input a student name into the text field and output search results by doing either of the following: 
        - clicking the 'search' button 
        - pressing down the 'enter/return' button 
    
      2. `Keyup` - When clicked, User can input a student name into the text field and the input dynamically renders the search results to the DOM in real time.
    
      3. `Reset` - This button appears after user picks a search type. When clicked, it reloads the page, resetting the button selection and default page views.
    
    - Search Results are then Paginated
    
    **Stretch Goals:**
    *I would like to refactor this code to keep duplicate student profiles from rendering in the DOM. I hope to implement this feature by storing the search results in a Set Object instead of an Array Object.* 




