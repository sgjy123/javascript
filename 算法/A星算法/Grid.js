/**
 * @description: 创建Grid
 * @method: Grid
 * @author: 上官靖宇
 * @date: 2024/3/25
 * @lastEditors: 上官靖宇
 */
class Grid {
    constructor(rows, cols, containerId) {
        this.rows = rows;
        this.cols = cols;
        this.container = document.getElementById(containerId);
        this.cells = [];
        this.startCell = null;
        this.endCell = null;
    }

    createCells() {
        for (let row = 0; row < this.rows; row++) {
            const rowCells = [];
            for (let col = 0; col < this.cols; col++) {
                const cell = new Cell(row, col);
				cell.element.addEventListener('click', () => {
					this.addStartAndEndCell(cell);
				});
                rowCells.push(cell);
                this.container.appendChild(cell.element);
            }
            this.cells.push(rowCells);
        }
    }

    clear() {
        for (const rowCells of this.cells) {
            for (const cell of rowCells) {
                if (cell) {
                    cell.isWall = false;
                    cell.g = 0;
                    cell.h = 0;
                    cell.f = 0;
                    cell.previous = null;
                    cell.element.style.backgroundColor = CELL_COLORS.DEFAULT;
                }
            }
        }
		this.startCell = null;
		this.endCell = null;
    }

    setStartCell(cell) {
        this.startCell = cell;
        cell.element.style.backgroundColor = CELL_COLORS.START;
    }

    setEndCell(cell) {
        this.endCell = cell;
        cell.element.style.backgroundColor = CELL_COLORS.END;
    }
	
	getStartCell() {
		return this.startCell;
	}
	
	getEndCell() {
		return this.endCell;
	}
	
	addStartAndEndCell(cell) {
		console.log(cell);
		if(!this.startCell) {
			this.setStartCell(cell);
		} else if (!this.endCell && cell !== this.startCell) {
			this.setEndCell(cell);
		}
	}
}
