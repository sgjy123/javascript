// 获取canvas元素
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 初始化变量
let isDrawing = false;
let points = [];

// 鼠标按下事件
canvas.addEventListener('mousedown', startDrawing, false);
canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('mouseup', stopDrawing, false);
canvas.addEventListener('mouseout', stopDrawing, false);

// 开始绘制
function startDrawing(e) {
  isDrawing = true;
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;
  points.push({ x, y });

  if (points.length > 1) {
    connectPoints(points[points.length - 2], points[points.length - 1]);
  }
}

// 绘制点和连线
function draw(e) {
  if (!isDrawing) return;
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;
  points.push({ x, y });

  if (points.length > 1) {
    connectPoints(points[points.length - 2], points[points.length - 1]);
  }
}

// 停止绘制
function stopDrawing() {
  isDrawing = false;
}

// 连接两点
function connectPoints(p1, p2) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

// 清除画布
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  points = [];
}

// 加载图片并绘制到画布
function loadImageAndDraw(url) {
  const img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
  img.src = url;
}

// 示例：加载一张图片
loadImageAndDraw('banner (1).jpg'); // 替换为你的图片URL