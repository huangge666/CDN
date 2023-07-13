if(typeof myVariable === 'undefined'){
	var echartConfigId = Date.now()

	var notDataText = data => {
	  return {
		type: 'text', // 类型：文本
		left: 'center',
		top: 'middle',
		silent: true, // 不响应事件
		invisible: data.length > 0, // 有数据就隐藏
		style: {
		  fill: '#9d9d9d',
		  fontWeight: 'bold',
		  text: '暂无数据',
		  fontFamily: 'Microsoft YaHei',
		  fontSize: '25px'
		}
	  }
	}

	var legendConfig = {
	  icon: 'rect',
	  itemGap: 20,
	  itemWidth: 12,
	  itemHeight: 4,
	  textStyle: {
		color: '#B5C5D4',
		fontFamily: 'MicrosoftYaHei Microsoft YaHei',
		fontSize: 14,
		rich: {
		  a: {
			verticalAlign: 'middle'
		  }
		},
		padding: [0, 0, -2, 3] // [上、右、下、左]
	  },
	  selectedMode: false
	}

	var labelFontConfig = {
	  color: '#F6F9FE',
	  fontFamily: 'Microsoft YaHei',
	  fontSize: 14
	}

	var titleConfigFn = (text, data) => {
	  data = data === undefined ? [] : data
	  return {
		show: data.length > 0,
		text,
		textStyle: {
		  ...labelFontConfig
		},
		left: 0
	  }
	}

	var getXLabel = () => {
	  return new Array(12).fill(0).map((item, index) => index + 1)
	}

	var getDayLabel = () => {
	  const year = new Date().getFullYear()
	  const month = new Date().getMonth() + 1
	  let days = new Date(year, month, 0).getDate()
	  return new Array(days).fill(0).map((item, index) => index + 1)
	}

	var splitLineLineStyle = {
	  type: 'dashed',
	  color: 'rgba(246,249,254,0.3)',
	  width: 1
	}
	var axisLineConfig = {
	  lineStyle: {
		color: '#2D458D',
		width: 2
	  }
	}

	var barAddRoof = (
	  modal,
	  data,
	  deepData,
	  normalColor1 = '#E2D71B',
	  normalColor2 = '#EAF3AB',
	  warningColor1 = '#B52C21',
	  warningColor2 = '#F9857B'
	) => {
	  let barData = data.map(item => {
		let itemStyle = {
		  // 柱形图圆角，初始化效果
		  borderRadius: [0, 0, 7, 7],
		  color: new modal.LinearGradient(
			0,
			1,
			0,
			0,
			[
			  {
				offset: 0,
				color: normalColor1 // 0% 处的颜色
			  },
			  {
				offset: 1,
				color: normalColor2 // 100% 处的颜色
			  }
			],
			false
		  )
		}
		if (item < deepData && warningColor1 !== null) {
		  itemStyle.color = new modal.LinearGradient(
			0,
			1,
			0,
			0,
			[
			  {
				offset: 0,
				color: warningColor1 // 0% 处的颜色
			  },
			  {
				offset: 1,
				color: warningColor2 // 100% 处的颜色
			  }
			],
			false
		  )
		}
		return {
		  value: item,
		  itemStyle: itemStyle
		}
	  })
	  let pictorialBarData = barData.map(item => {
		const itemStyle = {
		  color: item.itemStyle.color,
		  symbol: 'circle',
		  // symbolSize: ['18', '8'],
		  // symbolOffset: [0, -1],
		  symbolSize: [18, 9],
		  symbolOffset: [0, 0],
		  symbolPosition: 'end',
		  z: 3
		}
		return {
		  value: item.value,
		  itemStyle: itemStyle
		}
	  })
	  return {
		barData,
		pictorialBarData
	  }
	}
}
