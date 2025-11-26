let board = new Board(50);
let grid = board.randomlyGenerate();

console.log(grid);

let boardDiv = document.querySelector(".board");

grid.forEach(row => {
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    row.forEach(column => {
        let tile = document.createElement("div");
        tile.textContent = column.tile;
        tile.classList.add("tile");
        rowDiv.append(tile);
    })

    boardDiv.append(rowDiv);
})