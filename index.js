// this is the container that will contain the grids
const grid = document.getElementById('container-1'); 
grid.style.flexDirection = "row";
let screen = document.querySelector("#screen"); // screen that will be used when mouse is released
let cellHover;
let cellSlider = document.getElementById("cell-count"); // drawing pad will be gridCellNum * gridCellNum
// ------------------- PREPARE THE GRID ---------------------------------------------------------

// algorithm to make n*n grid of squares

// INITIAL SIZE OF CELLS
for (let j = 0; j < 32; j++) { // creating n number of columns
    const gridColumn = document.createElement('div'); 
    gridColumn.style.display = "flex";
    gridColumn.style.flex = '1 1 auto'; // height and width will automatically adjust
    gridColumn.id = `column-${j+1}`; // individually label the column cell with an ID
    gridColumn.style.flexDirection = "column";
    
    for (let i = 0; i < 32; i++) { // creating n number of rows per column
        const gridCell = document.createElement('div');
        gridCell.style.flex = '1 1 auto'; // height and width will automatically adjust
        //gridCell.style.border = "1px solid white";
        gridCell.id = `row-${i+1}`; // individually label the row cell with an ID
        gridCell.classList.add("cell");
        gridColumn.appendChild(gridCell);
    }// for
    
    grid.appendChild(gridColumn);
}// for

cellHover = document.querySelectorAll(".cell"); // all of the cells in our grid

// ADJUST THE SIZE OF CELLS
cellSlider.oninput = function() {
    // delete all the columns of the container
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    // make new columns for the container, then append them

    screen = document.createElement('div');
    screen.id = "screen";
    grid.appendChild(screen);

    let cellSize = cellSlider.value;
    for (let j = 0; j < cellSize; j++) { // creating n number of columns
        const gridColumn = document.createElement('div'); 
        gridColumn.style.display = "flex";
        gridColumn.style.flex = '1 1 auto'; // height and width will automatically adjust
        gridColumn.id = `column-${j+1}`; // individually label the column cell with an ID
        gridColumn.style.flexDirection = "column";
        
        for (let i = 0; i < cellSize; i++) { // creating n number of rows per column
            const gridCell = document.createElement('div');
            gridCell.style.flex = '1 1 auto'; // height and width will automatically adjust
            //gridCell.style.border = "1px solid white";
            gridCell.id = `row-${i+1}`; // individually label the row cell with an ID
            gridCell.classList.add("cell");
            gridColumn.appendChild(gridCell);
        }// for
        
        grid.appendChild(gridColumn);
    }// for

    cellHover = document.querySelectorAll(".cell"); // all of the cells in our grid
}

// these are the divs that will update/change on user's screen
let normalModeBtn = document.querySelector('#normal-mode'); // button for normal mode
let ghostModeBtn = document.querySelector("#ghost-mode"); // button for ghost mode
let rbgModeBtn = document.querySelector('#rainbow-mode');

// RGB RANDOMIZER FOR RAINBOW BTN 

let rgbValue = () => {
    return Math.floor(Math.random() * 255);
};

// initialize color to monochrome
let isMonochrome = true // bool that checks if the current color is in monochrome mode or rgb mode
let randomColor; // value of some random color
//--------------- EVENTS FOR THE CANVAS ---------------------------------------------------------

// event listener for normal mode button
normalModeBtn.addEventListener('click', function normalMode() {
    isMonochrome = true;
    // creates a click and drag event when this button is pressed
    grid.addEventListener('mousedown', () => {
        console.log("in normal btn");
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
    grid.addEventListener('mouseup', () => {
        screen.style.display = "block"; // show the screen
    });// 
});// normal button event

// event listener for ghost mode button
ghostModeBtn.addEventListener('click', function ghostMode() {
    // creates a click and drag event when this button is pressed
    grid.addEventListener('mousedown', () => {
        console.log("in ghost btn");
        screen.style.display = "none"; // hide the screen
        /* this works like accessing elements in an array, 
        but in JS we are accessing a nodelist of elements*/
        cellHover.forEach((itemCell) => {
            itemCell.addEventListener('mouseover', function(e) {
                if (isMonochrome) {
                    e.target.style.backgroundColor = "black";
                    e.target.style.transition = "background-color 0s linear"; // resets any transitions made previously
                }// if
                else {
                    e.target.style.backgroundColor = randomColor;
                    e.target.style.transition = "background-color 0s linear"; // resets any transitions made previously
                }
            });// itemCell mouseover event
        
            itemCell.addEventListener('mouseout', function(e) {
                e.target.style.backgroundColor = null;
                e.target.style.transition = "background-color 1s linear"; // creates a fading effect when you run the cursor over many grid cells
            });// itemCell mouseout event
        });// cellHover forEach item
    });// canvas mousedown event
    
    /* when the user is done click-dragging, display the 
    screen so it prevents any more 'writing' when the cursor hovers*/
    grid.addEventListener('mouseup', () => {
        screen.style.display = "block"; // show the screen
    });// canvas mouseup event
});// ghost mode button event

// event listener for rainbow mode button
rbgModeBtn.addEventListener('click', function rgbMode() {
    isMonochrome = false;
    // creates a click and drag event when this button is pressed
    grid.addEventListener('mousedown', () => {
        console.log("in rgb btn");
        screen.style.display = "none"; // hide the screen 
        cellHover.forEach((itemCell) => { 
            itemCell.addEventListener('mouseover', function(e) {
                e.target.style.backgroundColor = `rgb(${rgbValue()}, ${rgbValue()}, ${rgbValue()})`;
                randomColor = e.target.style.backgroundColor;
            }); // itemCell mouseover event

            itemCell.addEventListener('mouseout', function(e) {
                e.target.style.backgroundColor = randomColor;
            });// itemCell mouseout event
        });// cellHover forEach item
    }); // canvas mousedown event
    
    /* when the user is done click-dragging, display the 
        screen so it prevents any more 'writing' when the cursor hovers*/
    grid.addEventListener('mouseup', () => {
        screen.style.display = "block"; // show the screen
    });// 
});// ghost mode button event