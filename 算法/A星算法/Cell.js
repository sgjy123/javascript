/**
 * @description: 创建Cell
 * @method: Cell
 * @author: 上官靖宇
 * @date: 2024/3/25
 * @lastEditors: 上官靖宇
 */
class Cell {
	constructor(row, col) {
		this.row = row;
		this.col = col;
		this.isWall = false;
		this.g = 0;
		this.h = 0;
		this.f = 0;
		this.previous = null;
		this.hasStartCell = false;
		this.hasEndCell = false;
		this.element = this.createElement();
		// this.element.addEventListener("click", this.toggleWall.bind(this));
	}

	createElement() {
		const element = document.createElement("div");
		element.className = "cell";
		return element;
	}

	// toggleWall() {
	// 	this.isWall = !this.isWall;
	// 	this.element.style.backgroundColor = this.isWall ? CELL_COLORS.WALL : CELL_COLORS.DEFAULT;
	// }

	getNeighbors() {
		const neighbors = [];
		const offsets = [{
				row: -1,
				col: 0
			}, // 上方格子
			{
				row: 1,
				col: 0
			}, // 下方格子
			{
				row: 0,
				col: -1
			}, // 左侧格子
			{
				row: 0,
				col: 1
			}, // 右侧格子
		];
		for (const offset of offsets) {
			const neighborRow = this.row + offset.row;
			const neighborCol = this.col + offset.col;
			if (neighborRow >= 0 && neighborRow < grid.rows && neighborCol >= 0 && neighborCol < grid.cols) {
				neighbors.push(grid.cells[neighborRow][neighborCol]);
			}
		}
		return neighbors;
	}
}