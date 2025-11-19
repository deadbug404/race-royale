class Board{
    #length;

    constructor(length){
        this.#length = length;
    }

    isValidNeighbor(x,y,grid){
        if(x < 0 || y < 0 || x > this.#length-1 || y > this.#length-1 || grid[x][y] != 0){
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
        return Array.from({length:this.#length}, ()=>
            Array.from({length:this.#length}, ()=> 0 )
        )
    }

    randomlyGenerate(){
        let grid = this.createGrid();

        let currentX = this.#length-1;
        let currentY = 0;
        let currentStep = 1;

        grid[currentX][currentY] = currentStep;

        while(currentStep <= this.#length){
            try{
                console.log(`${currentStep}: x${currentX} y${currentY}`);
                let [dx,dy] = this.chooseRandomValidNeighbor(currentX,currentY,grid);

                currentStep += 1;
                grid[dx][dy] = currentStep;
                currentX = dx;
                currentY = dy;
            }catch(err){ // outside of the border
                console.log("Not long enough regenerating");
                grid = this.createGrid();
                currentX = this.#length-1;
                currentY = 0;
                currentStep = 1;
                grid[currentX][currentY] = currentStep;
            }
        }
        return grid;
    }
}