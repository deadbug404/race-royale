class Board{
    #length;
    #boardSize;

    constructor(length){
        this.#length = length;
        this.#boardSize = Math.ceil(this.#length/2);
    }

    isValidNeighbor(x,y,grid){
        if(x < 0 || y < 0 || x > this.#boardSize-1 || y > this.#boardSize-1 || grid[x][y] != 0){
            return false;
        }
        return true;
    }

    getValidNeighbors(currentX,currentY,grid){
        const N = [currentX-1, currentY];
        const W = [currentX, currentY-1];
        const S = [currentX+1, currentY];
        const E = [currentX, currentY+1];

        let positions = [N,W,S,E];
        let validNeighbors = [];

        positions.forEach(position => {
            if(this.isValidNeighbor(position[0],position[1],grid)){
                validNeighbors.push(position);
            }
        })

        return validNeighbors;
    }

    chooseRandomValidNeighbor(currentX,currentY,grid){
        const validNeighbors = this.getValidNeighbors(currentX,currentY,grid);
        return validNeighbors[Math.floor(Math.random()*validNeighbors.length)];
    }

    createGrid(){
        return Array.from({length:this.#boardSize}, ()=>
            Array.from({length:this.#boardSize}, () => 0 )
        )
    }

    removeExcessTiles(grid,lowestHeightIndex,highestWidthIndex){
        grid.splice(0,lowestHeightIndex);
        grid.forEach(row => {
            row.splice(highestWidthIndex+1);
        })
    }

    randomlyGenerate(){
        let grid = this.createGrid();
        let currentX = this.#boardSize-1;
        let currentY = 0;
        let currentStep = 1;
        let highestWidthIndex = 0;
        let lowestHeightIndex = currentX;

        grid[currentX][currentY] = {tile:currentStep, contains:[]};
        while(currentStep < this.#length){
            try{
                console.log(`${currentStep}: x${currentX} y${currentY}`);
                let [dx,dy] = this.chooseRandomValidNeighbor(currentX,currentY,grid);
                if(dy > highestWidthIndex){highestWidthIndex = dy};
                if(dx < lowestHeightIndex){lowestHeightIndex = dx};
                currentStep += 1;
                grid[dx][dy] = {tile:currentStep, contains:[]};
                currentX = dx;
                currentY = dy;
            }catch(err){ //instance where theres no valid neighbor
                grid = this.createGrid();
                currentX = this.#boardSize-1;
                currentY = 0;
                currentStep = 1;
                lowestHeightIndex = currentX;
                highestWidthIndex = 0;
                grid[currentX][currentY] = {tile: currentStep, contains:[]};
            }
        }
        
        this.removeExcessTiles(grid,lowestHeightIndex,highestWidthIndex);
        return grid;
    }
}