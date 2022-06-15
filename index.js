// this is the container that will contain the grids
const grid = document.getElementById('container-1'); 
grid.style.flexDirection = "row";

let gridCellNum = 32; // drawing pad will be gridCellNum * gridCellNum

// ------------------- PREPARE THE GRID ---------------------------------------------------------

// algorithm to make n*n grid of squares
for (let j = 0; j < gridCellNum; j++) { // creating n number of columns
    const gridColumn = document.createElement('div'); 
    gridColumn.style.display = "flex";
    gridColumn.style.flex = '1 1 auto'; // height and width will automatically adjust
    gridColumn.id = `column-${j+1}`; // individually label the column cell with an ID
    gridColumn.style.flexDirection = "column";
    
    for (let i = 0; i < gridCellNum; i++) { // creating n number of rows per column
        const gridCell = document.createElement('div');
        gridCell.style.flex = '1 1 auto'; // height and width will automatically adjust
        //gridCell.style.border = "1px solid white";
        gridCell.id = `row-${i+1}`; // individually label the row cell with an ID
        gridCell.classList.add("cell");
        gridColumn.appendChild(gridCell);
    }// for
    
    grid.appendChild(gridColumn);
}// for

// variables that select divs that will update/change on screen
let cellHover = document.querySelectorAll(".cell"); // all of the cells in our grid
let ghostModeBtn = document.querySelector("#ghost-mode"); // button for ghost mode
let normalModeBtn = document.querySelector('#normal-mode'); // button for normal mode
let canvas = document.querySelector("#container-1"); // container for the canvas and grid
let screen = document.querySelector("#screen"); // screen that will be used when mouse is released

//--------------- EVENTS FOR THE CANVAS ---------------------------------------------------------

// event listener for normal mode button
normalModeBtn.addEventListener('click', function normalMode() {
    // creates a click and drag event when this button is pressed
    canvas.addEventListener('mousedown', () => {
        screen.style.display = "none"; // hide the screen 
        /* this works like accessing elements in an array, 
            but in JS we are accessing a nodelist of elements*/
        cellHover.forEach((itemCell) => { 
            itemCell.addEventListener('mouseover', function(e) {
                e.target.style.backgroundColor = "black";
            }); // itemCell mouseover event

            itemCell.addEventListener('mouseout', function(e) {
                e.target.style.backgroundColor = "black";
            });// itemCell mouseout event
        });// cellHover forEach item
    }); // canvas mousedown event
    
    /* when the user is done click-dragging, display the 
        screen so it prevents any more 'writing' when the cursor hovers*/
    canvas.addEventListener('mouseup', () => {
        screen.style.display = "block"; // show the screen
    });// 
});// normal button event

// event listener for ghost mode button
ghostModeBtn.addEventListener('click', function ghostMode() {
    // creates a click and drag event when this button is pressed
    canvas.addEventListener('mousedown', () => {
        screen.style.display = "none"; // hide the screen
        /* this works like accessing elements in an array, 
        but in JS we are accessing a nodelist of elements*/
        cellHover.forEach((itemCell) => {
            itemCell.addEventListener('mouseover', function(e) {
                e.target.style.backgroundColor = "black";
                e.target.style.transition = "background-color 0s linear"; // resets any transitions made previously
            });// itemCell mouseover event
        
            itemCell.addEventListener('mouseout', function(e) {
                e.target.style.backgroundColor = null;
                e.target.style.transition = "background-color 1s linear"; // creates a fading effect when you run the cursor over many grid cells
            });// itemCell mouseout event
        });// cellHover forEach item
    });// canvas mousedown event
    
    /* when the user is done click-dragging, display the 
    screen so it prevents any more 'writing' when the cursor hovers*/
    canvas.addEventListener('mouseup', () => {
        screen.style.display = "block"; // show the screen
    });// canvas mouseup event
});// ghost mode event