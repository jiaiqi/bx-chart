# 数字列表
## 图表设置:
```json
{
	"showBorder": false,  //是否显示边框
	"hideTitle": true, //是否隐藏大标题
	"title": {
		"position": "bottom", //标题位置 top||bottom
		"color": "#13f1eb", //标题文字颜色
		"column": "type" //标题对应字段
	},
	"number": [ //数字列表有几个数字就要在number里配几个对象
    {
      "color": "#f1e523", //数字颜色
      "column": "count", // 字段名
      "fontSize":"30px" //
    },
    {
    "color":"#f4530f",
    "column": "count",
      "fontSize":"30px"
    },
    {
    "color":"#26a82b",
    "column": "count",
      "fontSize":"30px"
    }
	],
	"theme":"led", // 数字风格 
	"size":3, //数字大小 1-5
	"duration":0 //数字滚动动画时长
}
```
## 图表请求
### url 
```

```
### 请求参数
```json
{
	"serviceName": "srvxqaf_camera_select",
	"colNames": [
		"*"
	],
	"group":[
	   {
		"colName": "type",
		"type": "by",
		"aliasName":"label"
	},
	{
		"colName": "camera_no",
		"type": "count",
		"aliasName":"count"
	}
	   ],
	"condition": [],
	"order": []
}
```