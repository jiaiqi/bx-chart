const chartConfig = [{
        id: '01',
        chart_type: 'pie',
        chart_height: 300,
        chart_width: 400,
        chart_top: 200,
        chart_left: 200,
        chart_name: '这是一个饼图标题',
        background: 'url(' + require('@/assets/images/panel-l-t.png') + ') no-repeat',
        chartData: {
            columns: ['日期', '访问用户'],
            rows: [{
                    '日期': '1月1日',
                    '访问用户': 1523
                },
                {
                    '日期': '1月2日',
                    '访问用户': 1223
                },
                {
                    '日期': '1月3日',
                    '访问用户': 2123
                },
                {
                    '日期': '1月4日',
                    '访问用户': 4123
                },
                {
                    '日期': '1月5日',
                    '访问用户': 3123
                },
                {
                    '日期': '1月6日',
                    '访问用户': 7123
                }
            ]
        }
    }, {
        id: '02',
        chart_type: 'line',
        chart_height: 300,
        chart_width: 400,
        chart_top: 300,
        chart_left: 500,
        chart_name: '这是一个折线图标题',
        background: 'url(' + require('@/assets/images/panel-l-t.png') + ') no-repeat',
        chartData: {
            columns: ['日期', '访问用户'],
            rows: [{
                    '日期': '1月1日',
                    '访问用户': 1523
                },
                {
                    '日期': '1月2日',
                    '访问用户': 1223
                },
                {
                    '日期': '1月3日',
                    '访问用户': 2123
                },
                {
                    '日期': '1月4日',
                    '访问用户': 4123
                },
                {
                    '日期': '1月5日',
                    '访问用户': 3123
                },
                {
                    '日期': '1月6日',
                    '访问用户': 7123
                }
            ]
        }
    },
    {
        id: '03',
        chart_type: 'radar',
        chart_height: 300,
        chart_width: 400,
        chart_top: 0,
        chart_left: 500,
        chart_name: '这是一个雷达图标题',
        // 'url(' + require('@/assets/images/wrapper-bg.png') + ')'
        background: 'url(' + require('@/assets/images/panel-l-t.png') + ') 100% 100% no-repeat',
        chartData: {
            columns: ['日期', '访问用户', '下单用户', '下单率'],
            rows: [{
                    '日期': '1/1',
                    '访问用户': 1393,
                    '下单用户': 1093,
                    '下单率': 0.32
                },
                {
                    '日期': '1/2',
                    '访问用户': 3530,
                    '下单用户': 3230,
                    '下单率': 0.26
                },
                {
                    '日期': '1/3',
                    '访问用户': 2923,
                    '下单用户': 2623,
                    '下单率': 0.76
                },
                {
                    '日期': '1/4',
                    '访问用户': 1723,
                    '下单用户': 1423,
                    '下单率': 0.49
                },
                {
                    '日期': '1/5',
                    '访问用户': 3792,
                    '下单用户': 3492,
                    '下单率': 0.323
                },
                {
                    '日期': '1/6',
                    '访问用户': 4593,
                    '下单用户': 4293,
                    '下单率': 0.78
                }
            ]
        }
    }, {
        id: '04',
        chart_type: 'histogram',
        heapUp: true,
        chart_height: 300,
        chart_width: 400,
        chart_top: 300,
        chart_left: 0,
        chart_name: '这是一个柱状图标题',
        background: 'url(' + require('@/assets/images/panel-l-t.png') + ') no-repeat',
        chartSettings: {
            showLine: ['身份证']
        },
        chartData: {
            columns: ['日期', '访问用户'],
            rows: [{
                    '日期': '1月1日',
                    '访问用户': 1523
                },
                {
                    '日期': '1月2日',
                    '访问用户': 1223
                },
                {
                    '日期': '1月3日',
                    '访问用户': 2123
                },
                {
                    '日期': '1月4日',
                    '访问用户': 4123
                },
                {
                    '日期': '1月5日',
                    '访问用户': 3123
                },
                {
                    '日期': '1月6日',
                    '访问用户': 7123
                }
            ]
        }
    },
    //  {
    //         id: '05',
    //         type: 'map',
    //         height: 600,
    //         width: 800,
    //         top: 0,
    //         left: 1000,
    //         title: '这是一个延安地图',
    //         chartSettings: {
    //             position: 'province/beijing'
    //         },
    //         chartData: {
    //             columns: ['日期', '访问用户'],
    //             rows: [{
    //                     '日期': '1月1日',
    //                     '访问用户': 1523
    //                 },
    //                 {
    //                     '日期': '1月2日',
    //                     '访问用户': 1223
    //                 },
    //                 {
    //                     '日期': '1月3日',
    //                     '访问用户': 2123
    //                 },
    //                 {
    //                     '日期': '1月4日',
    //                     '访问用户': 4123
    //                 },
    //                 {
    //                     '日期': '1月5日',
    //                     '访问用户': 3123
    //                 },
    //                 {
    //                     '日期': '1月6日',
    //                     '访问用户': 7123
    //                 }
    //             ]
    //         }

    // },
    {
        id: '07',
        chart_type: 'gauge',
        chart_height: 300,
        chart_width: 380,
        chart_top: 300,
        chart_left: 0,
        chart_name: '这是一个仪表盘标题',
        background: 'url(' + require('@/assets/images/panel-l-t.png') + ') 100% 100% no-repeat',
        chartData: {

        }
    }, {
        id: '08',
        chart_type: 'map',
        chart_height: 700,
        chart_width: 400,
        chart_top: 0,
        chart_left: 800,
        chart_name: '这是一个陕西地图',
        background: 'url(' + require('@/assets/images/panel-l-t.png') + ') 100% 100% no-repeat',

        chartSettings: {
            // positionJsonLink: 'https://geo.datav.aliyun.com/areas/bound/610600_full.json',
            // position: 'yanan',
            // beforeRegisterMap (json) {
            //   // edit data here such as:
            //   // json.features[0].properties.cp = [121.509062, 26.044332]
            //   return json
            // }
        },
        chartData: {
            columns: ['日期', '访问用户'],
            rows: [{
                    '日期': '1月1日',
                    '访问用户': 1523
                },
                {
                    '日期': '1月2日',
                    '访问用户': 1223
                },
                {
                    '日期': '1月3日',
                    '访问用户': 2123
                },
                {
                    '日期': '1月4日',
                    '访问用户': 4123
                },
                {
                    '日期': '1月5日',
                    '访问用户': 3123
                },
                {
                    '日期': '1月6日',
                    '访问用户': 7123
                }
            ]
        }

    },
]
const mapData = {
    columns: ['position', 'create_time'],
    rows: [
        // {
        //     "name": "宝塔区",
        //     "value": 100
        // }, {
        //     "name": "黄陵县",
        //     "value": 180
        // }, {
        //     "name": "志丹县",
        //     "value": 220
        // }, {
        //     "name": "延长县",
        //     "value": 150
        // }, {
        //     "name": "安塞区",
        //     "value": 70
        // }, {
        //     "name": "洛川县",
        //     "value": 20
        // }, {
        //     "name": "黄龙县",
        //     "value": 25
        // }
        {
            "name": "宝塔区",
            "value": [{
                    "name": '门诊',
                    "value": 100
                },
                {
                    "name": '住院',
                    "value": 120
                },
                {
                    "name": '诊疗',
                    "value": 120
                }
            ]
        }, {
            "name": "黄陵县",
            "value": [{
                    "name": '门诊',
                    "value": 180
                },
                {
                    "name": '住院',
                    "value": 200
                },
                {
                    "name": '诊疗',
                    "value": 120
                }
            ]
        }, {
            "name": "志丹县",
            "value": [{
                    "name": '门诊',
                    "value": 200
                },
                {
                    "name": '住院',
                    "value": 220
                },
                {
                    "name": '诊疗',
                    "value": 120
                }
            ]
        }, {
            "name": "延长县",
            "value": [{
                    "name": '门诊',
                    "value": 150
                },
                {
                    "name": '住院',
                    "value": 160
                },
                {
                    "name": '诊疗',
                    "value": 120
                }
            ]
        }, {
            "name": "安塞区",
            "value": [{
                    "name": '门诊',
                    "value": 70
                },
                {
                    "name": '住院',
                    "value": 50
                },
                {
                    "name": '诊疗',
                    "value": 120
                }
            ]
        }, {
            "name": "洛川县",
            "value": [{
                    "name": '门诊',
                    "value": 20
                },
                {
                    "name": '住院',
                    "value": 100
                },
                {
                    "name": '诊疗',
                    "value": 120
                }
            ]
        }, {
            "name": "黄龙县",
            "value": [{
                    "name": '门诊',
                    "value": 25
                },
                {
                    "name": '住院',
                    "value": 125
                },
                {
                    "name": '诊疗',
                    "value": 120
                }
            ]
        }
    ]

}
const dataJson = [{
        "yljgmc": "博爱医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-05",
        "cmd": "门诊",
        "position": "宝塔区",
        "create_time": 1
    },
    {
        "yljgmc": "博爱医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-06",
        "cmd": "门诊",
        "position": "宝塔区",
        "create_time": 2
    },
    {
        "yljgmc": "博爱医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-08",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 1
    },
    {
        "yljgmc": "博爱医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-09",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 3
    },
    {
        "yljgmc": "博爱医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-10",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 3
    },
    {
        "yljgmc": "博爱医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-10",
        "position": "宝塔区",
        "cmd": "住院",
        "create_time": 2
    },
    {
        "yljgmc": "博爱医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-11",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 1
    },
    {
        "yljgmc": "博爱医院",
        "card_type": "社保卡",
        "ywfssj": "2019-09-05",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 1
    },
    {
        "yljgmc": "博爱医院",
        "card_type": "就诊卡",
        "ywfssj": "2019-09-05",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 2
    },
    {
        "yljgmc": "宝塔区医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-05",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 3
    },
    {
        "yljgmc": "宝塔区医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-07",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 3
    },
    {
        "yljgmc": "市中医医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-03",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 3
    },
    {
        "yljgmc": "市中医医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-05",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 9
    },
    {
        "yljgmc": "市中医医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-08",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 3
    },
    {
        "yljgmc": "市中医医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-08",
        "position": "宝塔区",
        "cmd": "住院",
        "create_time": 7
    },
    {
        "yljgmc": "市中医医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-09",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 2
    },
    {
        "yljgmc": "市中医医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-09",
        "position": "宝塔区",
        "cmd": "住院",
        "create_time": 2
    },
    {
        "yljgmc": "市中医医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-11",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 1
    },
    {
        "yljgmc": "市中医医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-18",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 1
    },
    {
        "yljgmc": "市中医医院",
        "card_type": "社保卡",
        "ywfssj": "2019-09-18",
        "position": "宝塔区",
        "cmd": "住院",
        "create_time": 1
    },
    {
        "yljgmc": "市人民医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-04",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 1
    },
    {
        "yljgmc": "市人民医院",
        "card_type": "身份证",
        "position": "宝塔区",
        "ywfssj": "2019-09-05",
        "cmd": "门诊",
        "create_time": 3
    },
    {
        "yljgmc": "市人民医院",
        "card_type": "身份证",
        "position": "宝塔区",
        "ywfssj": "2019-09-06",
        "cmd": "门诊",
        "create_time": 1
    },
    {
        "yljgmc": "市人民医院",
        "card_type": "身份证",
        "position": "宝塔区",
        "ywfssj": "2019-09-08",
        "cmd": "门诊",
        "create_time": 2
    },
    {
        "yljgmc": "市人民医院",
        "card_type": "身份证",
        "position": "宝塔区",
        "ywfssj": "2019-09-11",
        "cmd": "门诊",
        "create_time": 17
    },
    {
        "yljgmc": "市人民医院",
        "card_type": "身份证",
        "position": "宝塔区",
        "ywfssj": "2019-09-11",
        "cmd": "住院",
        "create_time": 14
    },
    {
        "yljgmc": "市人民医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-12",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 11
    },
    {
        "yljgmc": "市人民医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-12",
        "position": "宝塔区",
        "cmd": "住院",
        "create_time": 8
    },
    {
        "yljgmc": "市人民医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-16",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 1
    },
    {
        "yljgmc": "市人民医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-16",
        "position": "宝塔区",
        "cmd": "住院",
        "create_time": 1
    },
    {
        "yljgmc": "市人民医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-17",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 1
    },
    {
        "yljgmc": "市人民医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-17",
        "position": "宝塔区",
        "cmd": "住院",
        "create_time": 1
    },
    {
        "yljgmc": "市人民医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-18",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 3
    },
    {
        "yljgmc": "市人民医院",
        "card_type": "身份证",
        "ywfssj": "2019-09-18",
        "position": "宝塔区",
        "cmd": "住院",
        "create_time": 2
    },
    {
        "yljgmc": "市人民医院",
        "card_type": "社保卡",
        "ywfssj": "2019-09-05",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 1
    },
    {
        "yljgmc": "市人民医院",
        "card_type": "社保卡",
        "ywfssj": "2019-09-18",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 1
    },
    {
        "yljgmc": "市妇幼保健院",
        "card_type": "社保卡",
        "ywfssj": "2019-09-05",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 2
    },
    {
        "yljgmc": "市妇幼保健院",
        "card_type": "就诊卡",
        "ywfssj": "2019-09-05",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 1
    },
    {
        "yljgmc": "延大附院",
        "card_type": "身份证",
        "ywfssj": "2019-09-05",
        "position": "宝塔区",
        "cmd": "门诊",
        "create_time": 10
    },
    {
        "yljgmc": "延大附院",
        "card_type": "id卡",
        "ywfssj": "2019-09-06",
        "position": "洛川县",
        "cmd": "门诊",
        "create_time": 10
    },
    {
        "yljgmc": "延大附院",
        "card_type": "延安市",
        "ywfssj": "2019-09-07",
        "position": "洛川县",
        "cmd": "门诊",
        "create_time": 10
    }, {
        "yljgmc": "延大附院",
        "card_type": "身份",
        "ywfssj": "2019-09-08",
        "position": "洛川县",
        "cmd": "门诊",
        "create_time": 10
    },
    {
        "yljgmc": "延大附院",
        "card_type": "份证",
        "ywfssj": "2019-09-09",
        "position": "洛川县",
        "cmd": "门诊",
        "create_time": 10
    },
    {
        "yljgmc": "延大附院",
        "card_type": "西安市",
        "ywfssj": "2019-09-10",
        "position": "洛川县",
        "cmd": "门诊",
        "create_time": 10
    },
    {
        "yljgmc": "延大附院",
        "card_type": "宝鸡",
        "ywfssj": "2019-09-11",
        "position": "延长县",
        "cmd": "门诊",
        "create_time": 10
    },
    {
        "yljgmc": "延大附院",
        "card_type": "友好",
        "ywfssj": "2019-09-12",
        "cmd": "门诊",
        "position": "延长县",
        "create_time": 10
    },
    {
        "yljgmc": "延大附院",
        "card_type": "杨凌",
        "ywfssj": "2019-09-13",
        "cmd": "门诊",
        "position": "延长县",
        "create_time": 10
    },
    {
        "yljgmc": "延大附院",
        "card_type": "武功",
        "ywfssj": "2019-09-14",
        "position": "延长县",
        "cmd": "门诊",
        "create_time": 10
    }
]
const LineMapDataJson = [{
        time: 2015,
        data: [{
            "name": "宝塔",
            "value": [{
                    "name": '门诊',
                    "value": 15
                },
                {
                    "name": '住院',
                    "value": 116
                },
                {
                    "name": '诊疗',
                    "value": 20
                }
            ]
        }, {
            "name": "黄陵",
            "value": [{
                    "name": '门诊',
                    "value": 23
                },
                {
                    "name": '住院',
                    "value": 105
                },
                {
                    "name": '诊疗',
                    "value": 156
                }
            ]
        }, {
            "name": "志丹县",
            "value": [{
                    "name": '门诊',
                    "value": 153
                },
                {
                    "name": '住院',
                    "value": 110
                },
                {
                    "name": '诊疗',
                    "value": 142
                }
            ]
        }, {
            "name": "延长县",
            "value": [{
                    "name": '门诊',
                    "value": 120
                },
                {
                    "name": '住院',
                    "value": 56
                },
                {
                    "name": '诊疗',
                    "value": 165
                }
            ]
        }, {
            "name": "安塞区",
            "value": [{
                    "name": '门诊',
                    "value": 114
                },
                {
                    "name": '住院',
                    "value": 120
                },
                {
                    "name": '诊疗',
                    "value": 51
                }
            ]
        }, {
            "name": "洛川县",
            "value": [{
                    "name": '门诊',
                    "value": 151
                },
                {
                    "name": '住院',
                    "value": 95
                },
                {
                    "name": '诊疗',
                    "value": 41
                }
            ]
        }, {
            "name": "黄龙县",
            "value": [{
                    "name": '门诊',
                    "value": 25
                },
                {
                    "name": '住院',
                    "value": 21
                },
                {
                    "name": '诊疗',
                    "value": 124
                }
            ]
        }]
    },
    {
        time: 2016,
        data: [{
            "name": "宝塔区",
            "value": [{
                    "name": '门诊',
                    "value": 20
                },
                {
                    "name": '住院',
                    "value": 120
                },
                {
                    "name": '诊疗',
                    "value": 102
                }
            ]
        }, {
            "name": "黄陵县",
            "value": [{
                    "name": '门诊',
                    "value": 72
                },
                {
                    "name": '住院',
                    "value": 220
                },
                {
                    "name": '诊疗',
                    "value": 126
                }
            ]
        }, {
            "name": "志丹县",
            "value": [{
                    "name": '门诊',
                    "value": 215
                },
                {
                    "name": '住院',
                    "value": 120
                },
                {
                    "name": '诊疗',
                    "value": 226
                }
            ]
        }, {
            "name": "延长县",
            "value": [{
                    "name": '门诊',
                    "value": 110
                },
                {
                    "name": '住院',
                    "value": 123
                },
                {
                    "name": '诊疗',
                    "value": 120
                }
            ]
        }, {
            "name": "安塞区",
            "value": [{
                    "name": '门诊',
                    "value": 12
                },
                {
                    "name": '住院',
                    "value": 20
                },
                {
                    "name": '诊疗',
                    "value": 10
                }
            ]
        }, {
            "name": "洛川县",
            "value": [{
                    "name": '门诊',
                    "value": 20
                },
                {
                    "name": '住院',
                    "value": 10
                },
                {
                    "name": '诊疗',
                    "value": 4
                }
            ]
        }, {
            "name": "黄龙县",
            "value": [{
                    "name": '门诊',
                    "value": 25
                },
                {
                    "name": '住院',
                    "value": 2
                },
                {
                    "name": '诊疗',
                    "value": 12
                }
            ]
        }]
    },
    {
        time: 2017,
        data: [{
            "name": "宝塔区",
            "value": [{
                    "name": '门诊',
                    "value": 2
                },
                {
                    "name": '住院',
                    "value": 120
                },
                {
                    "name": '诊疗',
                    "value": 1
                }
            ]
        }, {
            "name": "黄陵县",
            "value": [{
                    "name": '门诊',
                    "value": 7
                },
                {
                    "name": '住院',
                    "value": 200
                },
                {
                    "name": '诊疗',
                    "value": 120
                }
            ]
        }, {
            "name": "志丹县",
            "value": [{
                    "name": '门诊',
                    "value": 200
                },
                {
                    "name": '住院',
                    "value": 220
                },
                {
                    "name": '诊疗',
                    "value": 2
                }
            ]
        }, {
            "name": "延长县",
            "value": [{
                    "name": '门诊',
                    "value": 150
                },
                {
                    "name": '住院',
                    "value": 160
                },
                {
                    "name": '诊疗',
                    "value": 120
                }
            ]
        }, {
            "name": "安塞区",
            "value": [{
                    "name": '门诊',
                    "value": 70
                },
                {
                    "name": '住院',
                    "value": 2
                },
                {
                    "name": '诊疗',
                    "value": 120
                }
            ]
        }, {
            "name": "洛川县",
            "value": [{
                    "name": '门诊',
                    "value": 20
                },
                {
                    "name": '住院',
                    "value": 100
                },
                {
                    "name": '诊疗',
                    "value": 4
                }
            ]
        }, {
            "name": "黄龙县",
            "value": [{
                    "name": '门诊',
                    "value": 25
                },
                {
                    "name": '住院',
                    "value": 2
                },
                {
                    "name": '诊疗',
                    "value": 120
                }
            ]
        }]
    }, {
        time: 2018,
        data: [{
            "name": "宝塔区",
            "value": [{
                    "name": '门诊',
                    "value": 50
                },
                {
                    "name": '住院',
                    "value": 2
                },
                {
                    "name": '诊疗',
                    "value": 10
                }
            ]
        }, {
            "name": "黄陵县",
            "value": [{
                    "name": '门诊',
                    "value": 7
                },
                {
                    "name": '住院',
                    "value": 100
                },
                {
                    "name": '诊疗',
                    "value": 120
                }
            ]
        }, {
            "name": "志丹县",
            "value": [{
                    "name": '门诊',
                    "value": 251
                },
                {
                    "name": '住院',
                    "value": 150
                },
                {
                    "name": '诊疗',
                    "value": 20
                }
            ]
        }, {
            "name": "延长县",
            "value": [{
                    "name": '门诊',
                    "value": 110
                },
                {
                    "name": '住院',
                    "value": 32
                },
                {
                    "name": '诊疗',
                    "value": 25
                }
            ]
        }, {
            "name": "安塞区",
            "value": [{
                    "name": '门诊',
                    "value": 70
                },
                {
                    "name": '住院',
                    "value": 2
                },
                {
                    "name": '诊疗',
                    "value": 120
                }
            ]
        }, {
            "name": "洛川县",
            "value": [{
                    "name": '门诊',
                    "value": 20
                },
                {
                    "name": '住院',
                    "value": 150
                },
                {
                    "name": '诊疗',
                    "value": 4
                }
            ]
        }, {
            "name": "黄龙县",
            "value": [{
                    "name": '门诊',
                    "value": 25
                },
                {
                    "name": '住院',
                    "value": 2
                },
                {
                    "name": '诊疗',
                    "value": 120
                }
            ]
        }]
    }, {
        time: 2019,
        data: [{
            "name": "宝塔区",
            "value": [{
                    "name": '门诊',
                    "value": 15
                },
                {
                    "name": '住院',
                    "value": 120
                },
                {
                    "name": '诊疗',
                    "value": 102
                }
            ]
        }, {
            "name": "黄陵县",
            "value": [{
                    "name": '门诊',
                    "value": 156
                },
                {
                    "name": '住院',
                    "value": 26
                },
                {
                    "name": '诊疗',
                    "value": 205
                }
            ]
        }, {
            "name": "志丹县",
            "value": [{
                    "name": '门诊',
                    "value": 58
                },
                {
                    "name": '住院',
                    "value": 25
                },
                {
                    "name": '诊疗',
                    "value": 32
                }
            ]
        }, {
            "name": "延长县",
            "value": [{
                    "name": '门诊',
                    "value": 25
                },
                {
                    "name": '住院',
                    "value": 24
                },
                {
                    "name": '诊疗',
                    "value": 94
                }
            ]
        }, {
            "name": "安塞区",
            "value": [{
                    "name": '门诊',
                    "value": 70
                },
                {
                    "name": '住院',
                    "value": 50
                },
                {
                    "name": '诊疗',
                    "value": 60
                }
            ]
        }, {
            "name": "洛川县",
            "value": [{
                    "name": '门诊',
                    "value": 20
                },
                {
                    "name": '住院',
                    "value": 25
                },
                {
                    "name": '诊疗',
                    "value": 140
                }
            ]
        }, {
            "name": "黄龙县",
            "value": [{
                    "name": '门诊',
                    "value": 25
                },
                {
                    "name": '住院',
                    "value": 12
                },
                {
                    "name": '诊疗',
                    "value": 160
                }
            ]
        }]
    },
]



export default {
    dataJson,
    chartConfig,
    mapData,
    LineMapDataJson
}