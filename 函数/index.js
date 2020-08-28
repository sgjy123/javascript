/* function sum(num) {
	if(num < 1) {
		return 1;
	}else {
		return num * arguments.callee(num-1)
	}
}
var resulit = sum(4);
alert(resulit) */

/* function box(num1, num2) {
	return num1 + num2;
}

function sum2(num1, num2) {
	return box.apply(this, [num1,num2]);
}

alert(sum2(10,10)) */


/* function box(num1, num2, num3) {
	return num1 + num2 + num3;
}

function sum3(num1, num2, num3) {
	return box.apply(this, arguments);
}
alert(sum3(10, 10, 10)) */

var color = '红色的';
var box = {
	color: '蓝色的'
}
function sayColor() {
	alert(this.color)
}
sayColor.call(box)
