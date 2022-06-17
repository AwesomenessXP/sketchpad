// ----------------------------- INITIALIZE GLOBAL VARIABLES -------------------------------------------------------------------

// this is the container that will contain the grids
const grid = document.getElementById('container-1'); 
let screen; // not constant because screen can be deleted/created
let allCells; // not constant because cells can be deleted/created
const cellSlider = document.getElementById("cell-count"); // drawing pad will be gridCellNum * gridCellNum
const checkBox = document.getElementById("checkbox");
let cellSize = 0;

// these are the divs that will update/change on user's screen
const normalModeBtn = document.querySelector('#normal-mode'); // button for normal mode
const ghostModeBtn = document.querySelector("#ghost-mode"); // button for ghost mode
const rbgModeBtn = document.querySelector('#rainbow-mode');
const clearBtn = document.querySelector('#clear-grid');

// initialize color to monochrome
let isMonochrome; // bool that checks if the current color is in monochrome mode or rgb mode
let randomColor; // value of some random color

// toggle grid visibility
let showGrid;

//----------------------------------- DEFINE EVENT LISTENERS ------------------------------------------------------------------

// THIS IS OUR MAIN FUNCTION, RUN IT ON START UP
window.addEventListener('load', () => {
    // initialize screen and grid
    cellSize = 32;
    showGrid = true;
    isMonochrome = true; // on startup, the default color is black;
    renderNewCanvas();
});// window.onload()

// ADJUST THE SIZE OF CELLS
cellSlider.addEventListener('input', () => {
    deleteGrid(); // delete all the old columns in the container
    createGrid(cellSlider.value); // make new columns for the container, then append them
    allCells = document.querySelectorAll(".cell"); // store data of ALL the cells in our grid
}); // cellSlider.oninput()

// event listener for normal mode button
normalModeBtn.addEventListener('click', () => {
    isMonochrome = true;
    grid.addEventListener('mousedown', () => normalMode()); // mouseup
    grid.addEventListener('mouseup', () => screen.style.display = "block"); // mouseup
});// normal button event

// event listener for ghost mode button
ghostModeBtn.addEventListener('click', () => {
    grid.addEventListener('mousedown', () => ghostMode()); // grid mousedown event
    grid.addEventListener('mouseup', () => screen.style.display = "block");// grid  mouseup event
});// ghost mode button event

// event listener for rainbow mode button
rbgModeBtn.addEventListener('click', () => {
    isMonochrome = false;
    grid.addEventListener('mousedown', () => rgbMode()); // grid mousedown event
    grid.addEventListener('mouseup', () => screen.style.display = "block");// 
});// ghost mode button event

// event listener for check box
checkBox.addEventListener('click', () => {
    showGrid ? allCells.forEach((cell) => cell.style.border = "none") : allCells.forEach((cell) => cell.style.border = "1px solid rgba(255, 255, 255, 0.685)");
    showGrid = !showGrid; // negate the bool
});// checkBox event

// event listener for clearing the grid 
clearBtn.addEventListener('click', () => {
    renderNewCanvas ();
});// clearBtn event

// ------------------------------ DEFINE FUNCTIONS  --------------------------------------------------------------------------------

function renderNewCanvas () {
    deleteGrid();
    grid.style.flexDirection = "row";
    screen = document.querySelector("#screen"); // screen that will be used when mouse is released
    createGrid(cellSize);
    allCells = document.querySelectorAll(".cell"); // all of the cells in our grid
} //renderNewCanvas()

function createGrid (size) {
    // create new screen
    cellSize = size;
    screen = document.createElement('div');
    screen.id = "screen";
    grid.appendChild(screen);

    // update text on screen
    document.getElementById("text").textContent = `Grid size: ${size}x${size}`; 

    // create the new grid
    for (let j = 0; j < size; j++) { // creating n number of columns
        const gridColumn = document.createElement('div'); 
        gridColumn.id = `column-${j+1}`; // individually label the column cell with an ID
        gridColumn.classList.add("column");
        gridColumn.style.flexDirection = "column";
        
        for (let i = 0; i < size; i++) { // creating n number of rows
            const gridCell = document.createElement('div');
            gridCell.id = `row-${i+1}`; // individually label the row cell with an ID
            gridCell.classList.add("cell");
            showGrid ? gridCell.style.border = "1px solid rgba(255, 255, 255, 0.685)" : gridCell.style.border = "none";
            gridColumn.appendChild(gridCell);
        }// for
        
        grid.appendChild(gridColumn);
    }// for
}// createGrid()

function deleteGrid () {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }// while()
}// deleteGrid()

function normalMode() {
    screen.style.display = "none"; // hide the screen 
    allCells.forEach((cell) => { 
        cell.addEventListener('mouseover', function(e) {
            e.target.style.backgroundColor = "white";
        }); // cell mouseover event

        cell.addEventListener('mouseout', function(e) {
            e.target.style.backgroundColor = "white";
        });// cell mouseout event
    });// allCells forEach item
}// normalMode()

function ghostMode() {
    screen.style.display = "none"; // hide the screen 
    allCells.forEach((cell) => {
        cell.addEventListener('mouseover', function(e) {
            isMonochrome ? e.target.style.backgroundColor = "white" : e.target.style.backgroundColor = randomColor;
            e.target.style.transition = "background-color 0s linear"; // resets any transitions made previously
        });// cell mouseover event
    
        cell.addEventListener('mouseout', function(e) {
            e.target.style.backgroundColor = null;
            e.target.style.transition = "background-color 1s linear"; // creates a fading effect when you run the cursor over many grid cells
        });// cell mouseout event
    });// allCells forEach item
}// ghostMode()

function rgbMode() {
    screen.style.display = "none"; // hide the screen 
    allCells.forEach((cell) => { 
        cell.addEventListener('mouseover', function(e) {
            let rgbValue = () => Math.floor(Math.random() * 255); // variable that returns a random rgb value
            e.target.style.backgroundColor = `rgb(${rgbValue()}, ${rgbValue()}, ${rgbValue()})`; // calls rgbValue() three times to return 3 random values
            randomColor = e.target.style.backgroundColor;
        }); // cell mouseover event

        cell.addEventListener('mouseout', function(e) {
            e.target.style.backgroundColor = randomColor;
        });// cell mouseout event
    });// allCells forEach item
}// rgbMode()