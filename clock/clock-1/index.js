window.onload = function() {
	// 生成刻度
	let markWrap = document.getElementById('minute-marks')

	for (let index = 0; index < 60; index++) {
		let markItem = document.createElement('li')
		markItem.style.cssText = "transform:rotate(" + index * 6 + "deg) translateY(-12.7em)";
		if (index % 5 == 0) {
			markItem.style.width = "0.3em";
			markItem.style.height = "1em";
		}
		markWrap.appendChild(markItem)
	}

	setInterval(function() {
		var time = new Date();
		var hour = time.getHours()
		var minute = time.getMinutes();
		var second = time.getSeconds();
		var hournum;
		if (hour > 12) {
			hournum = ((hour - 12) + minute / 60) * 30;
		} else {
			hournum = (hour + minute / 60 * 100) * 30;
		}
		var minnum = (minute + second / 60) * 6 + second / 60;
		var sennum = second * 6;
		document.getElementsByClassName("hours-hand")[0].style.transform = "rotate(" + hournum + "deg)";
		document.getElementsByClassName("minutes-hand")[0].style.transform = "rotate(" + minnum + "deg)";
		document.getElementsByClassName("seconds-hand")[0].style.transform = "rotate(" + sennum + "deg)";
		// 接到上面指针转动js后面
		if (hour < 10) {
			hour = "0" + parseInt(hour);
		}
		if (minute < 10) {
			minute = "0" + parseInt(minute);
		}
		if (second < 10) {
			second = "0" + parseInt(second);
		}
		document.getElementsByClassName("digit-hours")[0].innerHTML = hour;
		document.getElementsByClassName("digit-minutes")[0].innerHTML = minute;
		document.getElementsByClassName("digit-seconds")[0].innerHTML = second;
	}, 1000);
}