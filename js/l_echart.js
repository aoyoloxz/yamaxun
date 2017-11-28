$(function() {
	var myChart = echarts.init(document.getElementById('main'));
	var category = [];
	var dottedBase = new Date();
	var dottedBase1 = +new Date(dottedBase -= (1000 * 3600 * 24) * 8);
	//			var dottedBase = +new Date();
	var lineData = [];
	var barData = [];

	for(var i = 0; i < 7; i++) {
		var date = new Date(dottedBase1 += 1000 * 3600 * 24);
		category.push([
			date.getFullYear(),
			date.getMonth() + 1,
			date.getDate()
		].join('-'));
		var b = 0;
		var d =0;
		barData.push(b)
		lineData.push(d + b);
	} // option
	option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
				label: {
					show: true,
					backgroundColor: '#333'
				}
			}
		},
		legend: {
			data: ['line'],
			textStyle: {
				color: '#ccc'
			}
		},
		xAxis: {
			splitLine: {
				show: true
			},
			data: category,
			axisLine: {
				lineStyle: {
					color: '#ccc'
				}
			}
		},
		yAxis: {
			splitLine: {
				show: true
			},
			axisLine: {
				lineStyle: {
					color: '#ccc'
				}
			}
		},
		series: [{
			name: 'line',
			type: 'line',
			smooth: true,
			showAllSymbol: true,
			symbol: 'emptyCircle',
			symbolSize: 15,
			itemStyle: {
            normal: {
                color: 'rgb(122,201,67)'
            }
        },
			data: lineData
		}]
	};
	myChart.setOption(option);
});