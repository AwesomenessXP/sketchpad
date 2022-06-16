# Sketch Pad
- Practicing more about JS and DOM by making a [sketch pad](https://awesomenessxp.github.io/sketchpad/).
# Challenges
## Creating a user-inputted grid
- used JS to dynamically make divs and appended them as children of the main container
- O(n^2) time complexity to create 2d grid using CSS flexbox
- had issue with inputting different sizes --> fixed by setting size of each grid cell as `flex: 1 1 auto` 
    - this fix allows grid cells to take up as much space in the div as needed
    - flex: 1 1 auto means: flex-shrink flex-grow flex-basis

## Implementing a click and drag motion to simulate writing
- used mousedown and mouseup (javascript mouse events) for determining the state of the user's cursor
    with event listeners
- had issues with grid cells not updating after changing color on the screen
    - created a separate div named screen, initialized it with `display:'none'` and set 
            `display: 'block'` after the user releases the cursor
        - I did this to solve an issue of the cursor still "writing" even when mouse is just hovering
    - after issue was resolved, I used for ALL of the buttons (which are the modes for drawing)

## "Ghost mode" (trailing effect) 
- learned about CSS transitions to change grid cell color with timed transitions
- fixed an issue where if a user hovers over a cell that is filled in, it will not update
    - I reset the transition state of the cells during mouseover

## Canvas Size Slider
- used .oninput() in JS to update the value of an html slider
- set an initial grid of 32x32, but when .oninput() is called, it deletes child (a column) in a loop
    then appends a new child (new column) to the container in a nested for-loop
- had issue where the cursor wouldn't draw anything after adjusting size
    - fixed this when i set `cellHover = document.querySelectorAll(".cell")` in functions that used the grid cells to update          CURRENT number of cells present

# Features to implement
- implement user-inputted size with a sliding bar
- rainbow mode
- rainbow ghost mode
