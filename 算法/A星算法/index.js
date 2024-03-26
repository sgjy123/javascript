const grid = createGrid();
let startCell = null; // 起点
let endCell = null; // 终点
// 点击格子事件处理函数
/* function handleCellClick(row, col, grid) {
  const cell = grid[row][col];
  if (!startCell) {
    // 如果起点为空，则设置为点击的格子，并更新样式为红色
    startCell = cell;
    startCell.element.style.backgroundColor = CELL_COLORS.START;
	grid.setStartCell(startCell);
  } else if (!endCell && cell !== startCell) {
    // 如果终点为空且点击的格子不是起点，则设置为终点，并更新样式为红色
    endCell = cell;
    endCell.element.style.backgroundColor = CELL_COLORS.END;
    grid.setEndCell(endCell);
	// 创建 A* 实例并执行搜索
	const astar = new AStar(grid);
	astar.search(startCell, endCell);
  }
} */
// 创建网格
function createGrid(rows = 10, cols = 10, containerId = 'grid') {
    const grid = new Grid(rows, cols, containerId);
    grid.createCells();
	return grid;
}

// 获取按钮元素
var button = document.getElementById('clearCell');
 
// 为按钮添加click事件监听
button.addEventListener('click', function() {
    console.log('111');
	grid.clear();
});

// 执行寻路
// 获取按钮元素
var button = document.getElementById('seekingWay');
 
// 为按钮添加click事件监听
button.addEventListener('click', function() {
    // 设置起点
	 startCell = grid.getStartCell();
	 // 设置终点
	 endCell = grid.getEndCell();
	 // 创建 A* 实例并执行搜索
	 const astar = new AStar(grid);
	 astar.search(startCell, endCell);
});
