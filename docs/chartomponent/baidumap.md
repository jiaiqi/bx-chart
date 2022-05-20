# baidumap
## 图表设置
```json
  {
    "mapCenter": [108.7330380000, 34.4605530000],
    "zoomLevel":17,//缩放级别
    "rotationAngle":60,//旋转角度
    "tiltAngle":60,//倾斜角度
    "theme":"dark", //默认light，
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

## 图表url: 配置子表的url `/dataanalyze/select/srvanalyze_chart_map_data_select`

## 图表请求: 配置请求子表数据的请求参数
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

## 配置baidumap类型图表对应的子表
> 菜单：数据分析-地图数据

### 类别：地标
#### 图表字段:
```json
  {
      "name":"name", //地标要显示的文字标签对应字段
      "lon":"longitude",//经度对应字段
      "lat":"latitude" //纬度对应字段
  }
```

#### 请求url：`/video/select/srvvideo_police_location_select`
#### 图表请求
```json
  {
  "serviceName": "srvvideo_police_location_select", //服务名
  "colNames": ["name", "longitude", "latitude"], //有用的字段(*也可以)
  "order": [{
    "colName": "create_time",
    "orderType": "asc" //按时间升序排列
  }]
  }
```

### 类别:轨迹
#### 图表字段:

```json
  {
    "lon":"longitude",//经度对应字段
    "lat":"latitude" //纬度对应字段
  }
```

#### 请求url： `/video/select/srvvideo_track_select`
#### 图表请求
```json
  {
    "serviceName": "srvvideo_track_select",
    "colNames": ["*"],
    "order": [
      {
        "colName": "create_time",
        "orderType": "asc"
      }
    ]
  }
```
