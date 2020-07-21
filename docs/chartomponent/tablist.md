# tablist
## 图表设置

```json
[
        {
            "tabTitle":"", //tab标题
            "type":"progress",//类型 - progress/table/detail/cardList - 进度条/表格/单条详情/卡片详情列表
						"pictureCol":"icon", //图片字段,若type为detail并需要展示一张图片,则必须配置此属性
						"pictureStyle":{
							"width":"100px",
							"heigth":"150px"
						},//图片样式
            "picturePosition": "left", //图片位置 top/left/bottom/right 注意:position为left时,图片宽度设为100%,则图片会在上方,position为right时,图片宽度设为100%,则图片会在下方
            "requestUrl":"", //请求url
            "requestParams":{},//请求参数
            "max":"",//若类型为progress,则必须配置最大值
            "colList": [ //要展示的字段及字段中文名
                {
            		"colName": "name",
            		"label": "姓名",
								"style": {
									"width": "40%" //单元格所占宽度
								}
            	}, {
            		"colName": "report_time",
            		"label": "上报时间"
            	}, {
            		"colName": "location_no",
            		"label": "编号"
            	}
            ],
            "progress": { //若类型为progress,可以选择性配置
        		"radius": false, //进度条是否圆角
        		"showAnimation": true, //是否展示进度条动画
        		"infinite": false //是否无限循环进度条动画，false则只展示一次
        	},
            "fieldMap":{ //类型为progress时必须配置 
                "first":"", //标签字段
                "end":""//数字字段 //最后一列,若类型为progress,此字段对应数据必须为数字或可以转成数字的字符串
            }
        }
]

```