// ----------------------------- INITIALIZE GLOBAL VARIABLES ------------------------------------------------------------------------

// this is the container that will contain the grids
const grid = document.getElementById('container-1'); 
let screen;
let allCells;
let cellSize = 0;
const cellSlider = document.getElementById("cell-count"); // drawing pad will be gridCellNum * gridCellNum

// these are the divs that will update/change on user's screen
let normalModeBtn = document.querySelector('#normal-mode'); // button for normal mode
let ghostModeBtn = document.querySelector("#ghost-mode"); // button for ghost mode
let rbgModeBtn = document.querySelector('#rainbow-mode');

// initialize color to monochrome
let isMonochrome; // bool that checks if the current color is in monochrome mode or rgb mode
let randomColor; // value of some random color

// ----------------------- PREPARE THE GRID -------------------------------------------------------------------------------------

// THIS IS OUR MAIN FUNCTION, RUN IT ON START UP
window.onload = () => {
    // initialize screen and grid
    grid.style.flexDirection = "row";
    screen = document.querySelector("#screen"); // screen that will be used when mouse is released
    cellSize = 32;
    createGrid(cellSize);
    allCells = document.querySelectorAll(".cell"); // all of the cells in our grid

    // on startup, the default color is black;
    isMonochrome = true;
};// onStartUp

// ADJUST THE SIZE OF CELLS
cellSlider.oninput = () => {
    // delete all the columns of the container 
    deleteGrid();

    // set new cell size
    cellSize = cellSlider.value; 
    const gridSizeText = document.getElementById("text");

    // update text on screen
    gridSizeText.textContent = `Grid size: ${cellSize}x${cellSize}`; 

    // create new screen
    screen = document.createElement('div');
    screen.id = "screen";
    grid.appendChild(screen);

    // make new columns for the container, then append them
    createGrid(cellSize); 

    // store data of ALL the cells in our grid
    allCells = document.querySelectorAll(".cell"); 
}// cellSlider.oninput()

//--------------- EVENTS FOR THE CANVAS ------------------------------------------------------------------------------------------

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

// ------------------------------ DEFINE FUNCTIONS  --------------------------------------------------------------------------------

function createGrid (size) {
    for (let j = 0; j < size; j++) { // creating n number of columns
        const gridColumn = document.createElement('div'); 
        gridColumn.id = `column-${j+1}`; // individually label the column cell with an ID

        // style the column
        gridColumn.style.display = "flex";
        gridColumn.style.flex = '1 1 auto'; // height and width will automatically adjust
        gridColumn.style.flexDirection = "column";
        
        for (let i = 0; i < size; i++) { // creating n number of rows
            const gridCell = document.createElement('div');
            gridCell.id = `row-${i+1}`; // individually label the row cell with an ID

            // style the row
            gridCell.style.flex = '1 1 auto'; // height and width will automatically adjust
            gridCell.classList.add("cell");
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
            e.target.style.backgroundColor = "black";
        }); // cell mouseover event

        cell.addEventListener('mouseout', function(e) {
            e.target.style.backgroundColor = "black";
        });// cell mouseout event
    });// allCells forEach item
}// normalMode()

function ghostMode() {
    screen.style.display = "none"; // hide the screen 
    allCells.forEach((cell) => {
        cell.addEventListener('mouseover', function(e) {
            isMonochrome ? e.target.style.backgroundColor = "black" : e.target.style.backgroundColor = randomColor;
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
            // variable that returns a random rgb value
            let rgbValue = () => Math.floor(Math.random() * 255);
            e.target.style.backgroundColor = `rgb(${rgbValue()}, ${rgbValue()}, ${rgbValue()})`;
            randomColor = e.target.style.backgroundColor;
        }); // cell mouseover event

        cell.addEventListener('mouseout', function(e) {
            e.target.style.backgroundColor = randomColor;
        });// cell mouseout event
    });// allCells forEach item
}// rgbMode()