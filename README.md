# Sketch Pad
- Practicing more about JS and DOM
# Challenges
## Creating a user-inputted grid
    - used JS to dynamically make divs and appended them as children of the main container
    - O(n^2) time complexity to create 2d grid using CSS flexbox
    - had issue with inputting different sizes --> fixed with flex: 1 1 auto 
        - this fix allows grid cells to take up as much space in the div as needed
        - flex: 1 1 auto means: flex-shrink flex-grow flex-basis
## Implementing a click and drag motion to simulate writing
    - used mousedown and mouseup for determining the state of the user's cursor
        with event listeners
    - had issues with grid cells not updating after changing color on the screen
        - created a separate div named screen, initialized it with display:'none' and set 
                display: 'block' after the user releases the cursor
            - I did this to solve an issue of the cursor still "writing" after mouse is released
## "Ghost mode" (trailing effect) 
    - learned about CSS transitions to change grid cell color with timed transitions
    - fixed an issue where if a user hovers over a cell that is filled in, it will not update
        - I reset the transition state of the cells during mouseover