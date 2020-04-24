# 数据可视化项目组件配置说明

## 百度地图组件

1. 创建baidumap类型图表

   - 图表设置

      ```json
      {
      	"mapCenter": [108.7330380000, 34.4605530000],
        "zoomLevel":17,//缩放级别
      	"rotationAngle":60,//旋转角度
      	"tiltAngle":60,//倾斜角度
      	"pointLine": {
      	    "labelColumn":["name"], //label对应字段,多个字段的话可以写在一个数组中,如:["name","track_type","track_time"],单个字段可以直接写一个字符串
      		"lineStyle": {
      			"strokeColor": "#fff", //线条颜色
      			"strokeWeight": 1 //线条宽度
      		},
      		"labelStyle": {
                  "background":"",//背景颜色
                  "color":"#fff", //字体颜色
                  "fontSize":""//字体大小 //div标签支持的css属性都可以配置。属性名使用小驼峰命名。
      		}
      	},
      	"marker": {
      		"labelStyle": {
                  "background":"",//背景颜色
                  "color":"#fff", //字体颜色
                  "fontSize":""//字体大小 //div标签支持的css属性都可以配置。属性名使用小驼峰命名。
      		}
      	}
      }
      ```

   - 图表url: 配置子表的url `/dataanalyze/select/srvanalyze_chart_map_data_select`

   - 图表请求: 配置请求子表数据的请求参数

      ```json
      {
      	"condition": [{
      		"colName": "chart_no",//图表编码
      		"ruleType": "eq",
      		"value": "CR202004140081" //当前创建的图表的编号
      	}],
      	"colNames": ["*"],
      	"serviceName": "srvanalyze_chart_map_data_select"
      }
      ```

2. 配置上面创建的图表的子表

   - 菜单：数据分析-地图数据

   - 类别：地标

     - 图表字段:

       ```json
       {
           "name":"name", //地标要显示的文字标签对应字段
           "lon":"longitude",//经度对应字段
           "lat":"latitude" //纬度对应字段
       }
       ```

     - 请求url：`/video/select/srvvideo_police_location_select`

     - ```json
       {
       	"serviceName": "srvvideo_police_location_select", //服务名
       	"colNames": ["name", "longitude", "latitude"], //有用的字段(*也可以)
       	"order": [{
       		"colName": "create_time",
       		"orderType": "asc" //按时间升序排列
       	}]
       }
       ```

   - 类别:轨迹

     - 图表字段:

       ```json
       {
           "lon":"longitude",//经度对应字段
           "lat":"latitude" //纬度对应字段
       }
       ```

     - 请求url： `/video/select/srvvideo_track_select`

     - ```json
       {
       	"serviceName": "srvvideo_track_select",
       	"colNames": ["*"],
       	"order": [{
       		"colName": "create_time",
       		"orderType": "asc"
       	}]
       }
       ```

## tabList组件

### 图表设置

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
            "requestUrl":"", //请求url
            "requestParams":{},//请求参数
            "max":"",//若类型为progress,则必须配置最大值
            "colList": [ //要展示的字段及字段中文名
                {
            		"colName": "name",
            		"label": "姓名"
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

## custompage组件
### 图表设置
```json
{"src":"/bx-chart/#/dataView/DS201909240001"}
```