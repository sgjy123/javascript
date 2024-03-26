/**
 * @description: AStar算法
 * @method: AStar
 * @author: 上官靖宇
 * @date: 2024/3/25
 * @lastEditors: 上官靖宇
 */
class AStar {
    constructor(grid) {
        this.grid = grid;
        this.openSet = [];
        this.closedSet = [];
        this.currentCell = null;
        this.path = [];
        this.interval = null;
        this.animationSpeed = 100; // 动画速度（毫秒）
        this.finished = false;
    }

    heuristic(cellA, cellB) {
        // 使用曼哈顿距离作为启发式函数
        const dx = Math.abs(cellA.col - cellB.col);
        const dy = Math.abs(cellA.row - cellB.row);
        return dx + dy;
    }

    startAnimation() {
        this.interval = setInterval(() => {
            this.nextStep();
            if (this.finished) {
                clearInterval(this.interval);
            }
        }, this.animationSpeed);
    }

    nextStep() {
        if (this.openSet.length > 0) {
            let lowestIndex = 0;
            for (let i = 0; i < this.openSet.length; i++) {
                if (this.openSet[i].f < this.openSet[lowestIndex].f) {
                    lowestIndex = i;
                }
            }

            this.currentCell = this.openSet[lowestIndex];

            if (this.currentCell === this.endCell) {
                this.finished = true;
                this.reconstructPath();
            }

            this.openSet.splice(lowestIndex, 1);
            this.closedSet.push(this.currentCell);

            const neighbors = this.currentCell.getNeighbors();
            for (const neighbor of neighbors) {
                if (!neighbor.isWall && !this.closedSet.includes(neighbor)) {
                    const tentativeG = this.currentCell.g + 1;
                    if (this.openSet.includes(neighbor)) {
                        if (tentativeG < neighbor.g) {
                            neighbor.g = tentativeG;
                            neighbor.previous = this.currentCell;
                        }
                    } else {
                        neighbor.g = tentativeG;
                        neighbor.h = this.heuristic(neighbor, this.endCell);
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.previous = this.currentCell;
                        this.openSet.push(neighbor);
                    }
                }
            }
        } else {
            this.finished = true;
        }

        this.updatePath();
    }

    search(startCell, endCell) {
        this.startCell = startCell;
        this.endCell = endCell;
        this.startCell.g = 0;
        this.startCell.h = this.heuristic(this.startCell, this.endCell);
        this.startCell.f = this.startCell.g + this.startCell.h;
        this.openSet.push(this.startCell);

        this.startAnimation();

        return this.path;
    }

    updatePath() {
        this.path = [];
        let tempCell = this.currentCell;
        while (tempCell) {
            this.path.unshift(tempCell);
            tempCell = tempCell.previous;
        }
    }

    reconstructPath() {
        for (let i = 0; i < this.path.length; i++) {
            setTimeout(() => {
                const cell = this.path[i];
                if (cell !== this.startCell && cell !== this.endCell) {
                    cell.element.style.backgroundColor = CELL_COLORS.PATH;
                }
            }, i * this.animationSpeed);
        }
    }
}
