// 检测拖动元素是否向上拖动
function isAbove(nodeA, nodeB) {
	const rectA = nodeA.getBoundingClientRect();
	const rectB = nodeB.getBoundingClientRect();
	// 计算中心点纵坐标
	const centerPointA = rectA.top + rectA.height / 2;
	const centerPointB = rectB.top + rectB.height / 2;
	return centerPointA < centerPointB;
};
// 交换两个相邻的元素位置
function swap(nodeA, nodeB) {
	// 获取父节点，为后续插入提供一个支点
	const parentA = nodeA.parentNode;
	// 获取参照节点
	const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
	// 将A节点移动到参照节点之前
	nodeB.parentNode.insertBefore(nodeA, nodeB);
	// 将B节点移动到参照节点之前
	parentA.insertBefore(nodeB, siblingA);
};

document.addEventListener('DOMContentLoaded', () => {
	const list = document.getElementById('list');
	list.querySelectorAll('.item').forEach(item => {
		// 批量添加事件
		item.addEventListener('mousedown', mouseDownHandler);
	});
	// 记录鼠标在拖动元素上的位置信息
	let x = 0;
	let y = 0;
	// 记录当前的拖动元素

	let draggingElement;
	// 站位元素
	let placeholder;
	// 是否正在拖动中
	let isDraggingStarted = false;

	function mouseDownHandler(e) {
		// 记录拖动元素
		draggingElement = e.target;
		// 计算鼠标在拖动元素上的位置信息
		const rect = draggingElement.getBoundingClientRect();
		x = e.clientX - rect.left;
		y = e.clientY - rect.top;
		document.addEventListener('mousemove', mouseMoveHandler);
		document.addEventListener('mouseup', mouseUpHandler);
	};

	function mouseMoveHandler(e) {
		// 仅在移动中初次创建一次
		if (!isDraggingStarted) {
			isDraggingStarted = true;
			// 创建占位元素
			placeholder = document.createElement('div');
			// 给占位元素添加class
			placeholder.classList.add('placeholder');
			// 插入占位元素
			draggingElement.parentNode.insertBefore(placeholder, draggingElement.nextSibling);
			// 保持占位元素与拖动元素一样大小
			const {
				width,
				height
			} = draggingElement.getBoundingClientRect();
			placeholder.style.width = width + 'px';
			placeholder.style.height = height + 'px';
		}
		// 计算拖动元素的最新位置
		const left = e.clientX - x;
		const top = e.clientY - y;
		// 将移动距离赋值给目标元素
		draggingElement.style.position = 'absolute';
		draggingElement.style.top = `${top}px`;
		draggingElement.style.left = `${left}px`;

		// 获取拖动时的上下元素
		const prevEle = draggingElement.previousElementSibling;
		const nextEle = placeholder.nextElementSibling;
		// 向上移动（没上一个元素了，代表到边界了，不用处理）
		if (prevEle && isAbove(draggingElement, prevEle)) {
			// 占位元素要先与拖动元素交换位置❗
			swap(placeholder, draggingElement);
			// 占位元素与上一个元素交换位置
			swap(placeholder, prevEle);
			return;
		}
		// 向下移动
		if (nextEle && !isAbove(draggingElement, nextEle)) {
			swap(nextEle, placeholder);
			swap(nextEle, draggingElement);
		}
	};

	function mouseUpHandler() {
		// 拖动结束清除占位元素
		placeholder && placeholder.parentNode.removeChild(placeholder);
		isDraggingStarted = false;
		// 布局恢复原样（列表布局肯定一直是一个样啦）
		draggingElement.style.removeProperty('top');
		draggingElement.style.removeProperty('left');
		draggingElement.style.removeProperty('position');
		x = 0;
		y = 0;
		draggingElement = null;
		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
	}
});