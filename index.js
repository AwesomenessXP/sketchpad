const grid = document.getElementById('container-1'); // this is the container that will contain the grids
grid.style.flexDirection = "row";

let gridCellNum = 64; // drawing pad will be gridCellNum * gridCellNum

for (let j = 0; j < gridCellNum; j++) {
    const gridColumn = document.createElement('div');
    gridColumn.style.display = "flex";
    gridColumn.style.flex = '1 1 auto'; // height and width will automatically adjust
    gridColumn.id = `column-${j}`;
    gridColumn.style.flexDirection = "column";
    
    for (let i = 0; i < gridCellNum; i++) {
        const gridCell = document.createElement('div');
        gridCell.style.flex = '1 1 auto'; // height and width will automatically adjust
        gridCell.id = `row-${i}`;
        gridCell.classList.add("cell");
        gridColumn.appendChild(gridCell);
    }// for
    
    grid.appendChild(gridColumn);
}// for

let cellHover = document.querySelectorAll(".cell");

// functions for drawing/undrawing the cell

function cellAppear() {
    e.target.style.backgroundColor = "black";
}

function cellDisappear() {
    // COOL ANIMATION STUFF TO ADD LATER
    e.target.style.backgroundColor = "white";
    e.target.style.transition = "background-color 1s linear";
}

// is the cell visited?
let cellVisited = false;

cellHover.forEach((itemCell) => {
    itemCell.addEventListener('mouseout', function(e) {
        if (!cellVisited) {
                    // COOL ANIMATION STUFF TO ADD LATER
            e.target.style.backgroundColor = "black";
            e.target.style.transition = "background-color 1s linear";
        }
        else {
            
        }
    });
});