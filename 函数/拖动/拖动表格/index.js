// 拖动行
/* document.addEventListener('DOMContentLoaded', () => {
	const table = document.getElementById('table');
	table.querySelectorAll('th').forEach(headerCell => {
		// 给可拖动元素添加一个样式类
		headerCell.classList.add('draggable');
		headerCell.addEventListener('mousedown', mouseDownHandler);
	});

	let draggingElement;
	// 记录拖动列的索引
	let draggingColumnIndex;
	let x = 0;
	let y = 0;
	let isDraggingStarted = false;

	function mouseDownHandler(e) {
		// 找到拖动列的索引
		draggingColumnIndex = [].slice.call(table.querySelectorAll('th')).indexOf(e.target);
		x = e.clientX - e.target.offsetLeft;
		y = e.clientY - e.target.offsetTop;
		document.addEventListener('mousemove', mouseMoveHandler);
		document.addEventListener('mouseup', mouseUpHandler);
	};

	function mouseMoveHandler(e) {
		if (!isDraggingStarted) {
			isDraggingStarted = true;
			createList();
			// 通过索引获取拖动元素
			draggingElement = [].slice.call(list.children)[draggingColumnIndex];
			draggingElement.classList.add('dragging');
			// 继续创建占位元素
			placeholder = document.createElement('div');
			placeholder.classList.add('placeholder');
			draggingElement.parentNode.insertBefore(placeholder, draggingElement.nextSibling);
			// 因为是flex布局，不用设置高度也可以
			placeholder.style.width = draggingElement.offsetWidth + 'px';
		}

		// 和元素拖动的过程一样
		draggingElement.style.position = 'absolute';
		draggingElement.style.top = (draggingElement.offsetTop + e.clientY - y) + 'px';
		draggingElement.style.left = (draggingElement.offsetLeft + e.clientX - x) + 'px';
		x = e.clientX;
		y = e.clientY;

		// 交换元素，与列表拖动的一样
		const prevEle = draggingElement.previousElementSibling;
		const nextEle = placeholder.nextElementSibling;
		if (prevEle && isOnLeft(draggingElement, prevEle)) {
			swap(placeholder, draggingElement);
			swap(placeholder, prevEle);
			return;
		}
		if (nextEle && isOnLeft(nextEle, draggingElement)) { // 元素换个位置而已，用!取反也是一样的
			swap(nextEle, placeholder);
			swap(nextEle, draggingElement);
		}
	}

	function swap(nodeA, nodeB) {
		const parentA = nodeA.parentNode;
		const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
		nodeB.parentNode.insertBefore(nodeA, nodeB);
		parentA.insertBefore(nodeB, siblingA);
	};

	function isOnLeft(nodeA, nodeB) {
		const rectA = nodeA.getBoundingClientRect();
		const rectB = nodeB.getBoundingClientRect();
		const centerPointA = rectA.left + rectA.width / 2;
		const centerPointB = rectB.left + rectB.width / 2;
		return centerPointA < centerPointB;
	};

	// 创建一个表格列表
	function createList() {
		const rect = table.getBoundingClientRect();
		list = document.createElement('div');
		list.classList.add('list');
		// 覆盖在表格上，如果是在局部，需要在共同的父元素上加上relative，小编这里父元素是body，就不用了。
		list.style.position = 'absolute';
		list.style.left = rect.left + 'px';
		list.style.top = rect.top + 'px';
		// 列表插入文档中
		table.parentNode.insertBefore(list, table);
		// 隐藏原表格
		table.style.visibility = 'hidden';
		// 获取表格所有的格子
		const originalCells = [].slice.call(table.querySelectorAll('tbody td'));
		// 获取表格的表头格子
		const originalHeaderCells = [].slice.call(table.querySelectorAll('th'));
		const numColumns = originalHeaderCells.length;
		// 循环列
		originalHeaderCells.forEach((headerCell, headerIndex) => {
			const {
				width
			} = window.getComputedStyle(headerCell);
			// 创建列表子项，也就是新的列
			const item = document.createElement('div');
			item.classList.add('draggable');
			// 子项是一个只有单列的表格，这就是上面样式中提到的列表的border如何保持和表格的边框一样的技巧
			const newTable = document.createElement('table');
			newTable.setAttribute('class', 'list__table');
			newTable.style.width = width;
			// 子项表格的表头
			const th = headerCell.cloneNode(true);
			let newRow = document.createElement('tr');
			newRow.appendChild(th);
			newTable.appendChild(newRow);
			// 子项表格的数据，在所有格子中找到属于这一列的格子
			const cells = originalCells.filter((c, idx) => {
				// 代入几个格子索引算算就清楚啦😉
				return (idx - headerIndex) % numColumns === 0;
			});
			// 找到这列的格子后，给格子加上对应列的宽度，再把它们包装成一个行tr，再插入就可以了
			cells.forEach(cell => {
				const newCell = cell.cloneNode(true);
				newCell.style.width = width + 'px';
				newRow = document.createElement('tr');
				newRow.appendChild(newCell);
				newTable.appendChild(newRow);
			});
			// 把子项表格追加到新列中，再把新列追加到列表中，完事
			item.appendChild(newTable);
			list.appendChild(item);
		});
	}

	function mouseUpHandler() {
		// 移除占位元素
		placeholder && placeholder.parentNode.removeChild(placeholder);
		// 恢复拖动元素样式
		draggingElement.classList.remove('dragging');
		draggingElement.style.removeProperty('top');
		draggingElement.style.removeProperty('left');
		draggingElement.style.removeProperty('position');
		// 获取拖动元素最后的索引
		const endColumnIndex = [].slice.call(list.children).indexOf(draggingElement);
		isDraggingStarted = false;
		// 移除创建的列表
		list.parentNode.removeChild(list);
		// 将列表的信息同步到原表格中
		table.querySelectorAll('tr').forEach(row => {
			// 获取每一行的格子
			const cells = [].slice.call(row.querySelectorAll('th, td'));
			if (draggingColumnIndex > endColumnIndex) { // 往左拖动
				// 将目标格子（cells[draggingColumnIndex]）放到最新的位置上
				cells[endColumnIndex].parentNode.insertBefore(
					cells[draggingColumnIndex], cells[endColumnIndex]);
			} else { // 往右拖动
				cells[endColumnIndex].parentNode.insertBefore(
					cells[draggingColumnIndex], cells[endColumnIndex].nextSibling);
			}
		});
		// 恢复原表格的展示
		table.style.removeProperty('visibility');
		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
	};
}); */

// 拖动列-第一列的第一个格子才能拖动
document.addEventListener('DOMContentLoaded', () => {
	const table = document.getElementById('table');
	table.querySelectorAll('tr').forEach((row, index) => {
		// 表格不能拖动，跳过
		if (index === 0) return;
		// 第一列的第一个格子才能拖动
		const firstCell = row.firstElementChild;
		firstCell.classList.add('draggable');
		firstCell.addEventListener('mousedown', mouseDownHandler);
	});

	// 记录拖动的行索引
	let draggingColumnIndex;
	let x = 0;
	let y = 0;
	let isDraggingStarted = false;
	let list;
	let draggingElement;
	let placeholder;

	function mouseDownHandler(e) {
		const originalRow = e.target.parentNode;
		draggingRowIndex = [].slice.call(table.querySelectorAll('tr')).indexOf(originalRow);
		x = e.clientX;
		y = e.clientY;
		document.addEventListener('mousemove', mouseMoveHandler);
		document.addEventListener('mouseup', mouseUpHandler);
	};

	function mouseMoveHandler(e) {
		if (!isDraggingStarted) {
			isDraggingStarted = true;
			createList();
			draggingElement = [].slice.call(list.children)[draggingRowIndex];
			draggingElement.classList.add('dragging');
			placeholder = document.createElement('div');
			placeholder.classList.add('placeholder');
			draggingElement.parentNode.insertBefore(placeholder, draggingElement.nextSibling);
			placeholder.style.height = draggingElement.offsetHeight + 'px';
		}
		draggingElement.style.position = 'absolute';
		draggingElement.style.top = (draggingElement.offsetTop + e.clientY - y) + 'px';
		draggingElement.style.left = (draggingElement.offsetLeft + e.clientX - x) + 'px';
		x = e.clientX;
		y = e.clientY;
		const prevEle = draggingElement.previousElementSibling;
		const nextEle = placeholder.nextElementSibling;
		if (prevEle && prevEle.previousElementSibling && isAbove(draggingElement, prevEle)) {
			swap(placeholder, draggingElement);
			swap(placeholder, prevEle);
			return;
		}
		if (nextEle && isAbove(nextEle, draggingElement)) {
			swap(nextEle, placeholder);
			swap(nextEle, draggingElement);
		}
	};

	function createList() {
		const rect = table.getBoundingClientRect();
		const width = window.getComputedStyle(table).width;
		list = document.createElement('div');
		list.classList.add('list');
		list.style.position = 'absolute';
		list.style.left = rect.left + 'px';
		list.style.top = rect.top + 'px';
		table.parentNode.insertBefore(list, table);
		table.style.visibility = 'hidden';
		// 循环行
		table.querySelectorAll('tr').forEach(row => {
			const item = document.createElement('div');
			item.classList.add('draggable');
			// 子项是一个只有一行的表格，这就是上面样式中提到的列表的border如何保持和表格的边框一样的技巧
			const newTable = document.createElement('table');
			newTable.setAttribute('class', 'list__table');
			newTable.style.width = width;
			const newRow = document.createElement('tr');
			const cells = [].slice.call(row.children);
			cells.forEach(cell => {
				const newCell = cell.cloneNode(true);
				// 每个格子还是原来格子的宽度
				newCell.style.width = window.getComputedStyle(cell).width;
				newRow.appendChild(newCell);
			});
			newTable.appendChild(newRow);
			item.appendChild(newTable);
			list.appendChild(item);
		});
	};

	function swap(nodeA, nodeB) {
		const parentA = nodeA.parentNode;
		const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
		nodeB.parentNode.insertBefore(nodeA, nodeB);
		parentA.insertBefore(nodeB, siblingA);
	};

	function isAbove(nodeA, nodeB) {
		const rectA = nodeA.getBoundingClientRect();
		const rectB = nodeB.getBoundingClientRect();
		const centerPointA = rectA.top + rectA.height / 2;
		const centerPointB = rectB.top + rectB.height / 2;
		return centerPointA < centerPointB;
	};

	function mouseUpHandler() {
		placeholder && placeholder.parentNode.removeChild(placeholder);
		draggingElement.classList.remove('dragging');
		draggingElement.style.removeProperty('top');
		draggingElement.style.removeProperty('left');
		draggingElement.style.removeProperty('position');
		const endRowIndex = [].slice.call(list.children).indexOf(draggingElement);
		isDraggingStarted = false;
		list.parentNode.removeChild(list);
		let rows = [].slice.call(table.querySelectorAll('tr'));
		// 行的交换就简单了，直接整行换就行了
		if (draggingRowIndex > endRowIndex) {
			rows[endRowIndex].parentNode.insertBefore(
				rows[draggingRowIndex],
				rows[endRowIndex]
			);
		} else {
			rows[endRowIndex].parentNode.insertBefore(
				rows[draggingRowIndex],
				rows[endRowIndex].nextSibling
			);
		}
		table.style.removeProperty('visibility');
		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
	};
});