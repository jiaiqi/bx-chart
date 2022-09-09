/**
 * 全局v-chart数据构造类
 */
export class vChartInfo {
    constructor() {
        this.data = {
            "columns": [],
            "rows": []
        }
        this.dataType = true
        this.getChartColumns = (data, dimName, chartType, dataType, isMultiseriate) => {
            // data : 原始数据, dimName: 图表数据 ‘维度’,‘指标’的合计
            this.resData = data
            let colsData = {}
            let arr = []
            if (dimName) {
                for (let i = 0; i < dimName.length; i++) {
                    let col = dimName[i]
                    let dimNameArr = data.map((item) => {
                        return item[col]
                    })
                    dimNameArr = Array.from(new Set(dimNameArr))
                    colsData[dimName[i]] = dimNameArr
                }
            }
            if (dataType) {
                let dataTypeVal = data.map((item) => {
                    return item[dataType]
                })
                dataTypeVal = Array.from(new Set(dataTypeVal))
                colsData[dataType] = dataTypeVal
            }
            if (dimName && Array.isArray(dimName) && dimName.length > 0) {
                arr.push(dimName[0])
                arr = arr.concat(colsData[dimName[dimName.length - 1]])

            }
            //   返回 维度和指标的集合
            this.columns = {}
            this.columns['arrs'] = colsData
            this.columns['columns'] = arr
            if (chartType === 'pie' || chartType === 'ring') { // 增加饼图处理 2019年9月27日
                this.columns['columns'] = dimName
            }
            if (chartType === 'radar' && isMultiseriate) {
                this.columns['columns'] = dimName
            }
            return this.columns
        }
        this.getChart = (dimcols, countCol, chartType, norm, dataTypeCol, isMultiseriate, colList) => {
            // dimcols : 指标维度合集 countCol: 值对应字段, chartType：图标type, dataType : data分图标统计字段,isMultiseriate数据是否是多列中取得
            let datas = this.resData
            let timeArr = []
            if (dimcols && Array.isArray(dimcols) && dimcols.length > 0) {
                timeArr = dimcols[0]
            }
            let timeArrKey = this.columns.arrs[timeArr]
            let dataMap = []
            let dataMapkey = []
            if (dimcols && Array.isArray(dimcols) && dimcols.length > 1) {
                dataMap = dimcols.slice(1, dimcols.length)
                dataMapkey = this.columns.columns.slice(1, this.columns.columns.length)
            } else {
                dataMap = dimcols
                dataMapkey = this.columns.columns.slice(1, this.columns.columns.length)
            }
            if (dataTypeCol) {
                this.isDataType = true
            } else {
                this.isDataType = false
            }
            let datasType = dataTypeCol ? datas.map((item) => {
                return item[dataTypeCol]
            }) : ['all']
            datasType = Array.from(new Set(datasType))
            this.datasType = {}
            this.datasType[dataTypeCol] = datasType
            let vChartType = chartType || 'line'
            let arr = []
            let allChartData = {

            }
            // if (vChartType === 'line' || vChartType === 'histogram' || vChartType === 'pie' ) {
            if (vChartType === 'line' || vChartType === "histogram" || vChartType === 'pie' || vChartType === 'ring' || vChartType === "radar") {
                for (let i = 0; i < datasType.length; i++) {
                    allChartData[datasType[i]] = {}
                    // allChartData[datasType[i]].columns = ['时间', "门诊", "住院"]
                    allChartData[datasType[i]].columns = this.columns.columns
                    allChartData[datasType[i]].rows = []
                    for (let j = 0; j < timeArrKey.length; j++) {
                        let itemData = {}
                        let itemCol = {}
                        let itemColArr = []
                        for (let n = 0; n < dataMapkey.length; n++) {
                            // itemColArr.push(dataTypeCol)
                            // itemColArr.push(timeArr)
                            itemCol['dataTypeCol'] = {
                                "key": dataTypeCol,
                                "value": datasType[i]
                            }
                            itemCol['timeArr'] = {
                                "key": timeArr,
                                "value": timeArrKey[j]
                            }
                            itemCol['dataMap'] = {
                                "key": dataMap[0],
                                "value": dataMapkey[n]
                            }
                            itemData[dataMapkey[n]] = this.getDataCount(itemCol, datas, vChartType, countCol)
                            // itemData['时间'] = timeArrKey[j] + "点"
                            if (timeArrKey[j]) {
                                itemData[timeArr] = timeArrKey[j].toString()
                            } else {
                                itemData[timeArr] = null
                            }
                        }
                        if (vChartType === "gauge") {
                            allChartData[datasType[i]].rows = [itemData]
                        }
                        allChartData[datasType[i]].rows.push(itemData)
                    }
                }
            } else if (vChartType === 'map') {
                let MapAll = []
                let target = norm.metrics
                let labelNorm = norm.labelMap
                let names = norm.dimension[0]
                for (let a = 0; a < datas.length; a++) {
                    let MapItem = {}
                    MapItem['value'] = []
                    MapItem['name'] = datas[a][names]
                    for (let b = 0; b < target.length; b++) {
                        let valueItem = {}
                        for (let c in labelNorm) {
                            if (target[b] === c) {
                                valueItem['name'] = labelNorm[c]
                                valueItem['value'] = datas[a][target[b]]
                            }
                        }
                        MapItem['value'].push(valueItem)
                    }
                    MapAll.push(MapItem)
                }
                allChartData = MapAll
            } else if (vChartType === 'table') {
                let data = this.resData
                let arr = []
                console.log(data, dimcols, countCol, chartType, norm, dataTypeCol, colList)
                if (colList && Array.isArray(colList)) {


                    colList.forEach(cols => {

                        data.forEach(d => {

                        })
                        dimcols.forEach(col => {

                        })

                    })
                } else {
                    data.map(datas => {
                        let obj = {
                            ...datas,
                            name: '',
                            value: ''
                        }
                        obj.name = datas[dimcols[0]]
                        obj.value = datas[dimcols[1]]
                        if (dimcols.length > 2) {
                            dimcols.forEach((key, index) => {
                                if (index == 0) {
                                    obj.name = datas[key]
                                } else if (index == 1) {
                                    obj.value = datas[key]
                                }
                                obj[key] = datas[key]

                            })
                        }
                        arr.push(obj)
                    })
                }
                allChartData.all = {}
                allChartData.all['data'] = arr
            } else if (vChartType === 'gauge') {
                let data = this.resData
                if (data && data.length > 0) {
                    let chartData = {
                        columns: ['type', 'value'],
                        rows: [{
                            type: 'name',
                            value: data[0][dimcols[1]]
                        }]
                    }
                    allChartData.all = chartData
                }
            } else if (vChartType === 'liquidfill') {
                let max = norm.max
                let data1 = this.resData
                if (data1 && data1.length > 0) {
                    for (let d in data1[0]) {
                        let num = data1[0][dimcols[1]]
                        if (num > 1 && num <= max) { // 原始数据是一个数值，max必须大于1
                            num = num / max
                        } else if (num <= 1 && num >= 0 & max == 1) { // 原始数据是百分比，max必须设置为1即100%
                            num = num
                        }
                        if (typeof (data1[0][d]) !== 'number') {
                            let chartData = {
                                columns: ['type', 'value'],
                                rows: [{
                                    type: data1[0][d],
                                    value: num
                                }]
                            }
                            allChartData.all = chartData
                        }
                    }
                }
            } else if (vChartType === 'digital') {
                let data = this.resData
                let num = data[0][dimcols]
                allChartData.all = {}
                allChartData.all["num"] = Number(num)
            }
            if (vChartType === "radar" && isMultiseriate) {
                let data = this.resData
                allChartData.all['columns'] = dimcols
                allChartData.all['rows'] = data
            }
            if (vChartType === 'heatmap') {
                let data = this.resData
                allChartData.all = {
                    columns: [],
                    rows: []
                }
                allChartData.all['columns'] = dimcols
                allChartData.all['rows'] = data
            }
            return allChartData
        }
        this.getDataCount = (itemCol, data, chartType, countCol) => {
            // itemcol：条件的key 和 value 必须 ， data  原始data 必须；chartType：图标类型 必须；countcol： count 字段 || 选填
            let count = 0
            let colkeys = Object.keys(itemCol)
            if (chartType === 'line' || chartType === 'histogram' || chartType === 'radar' || chartType === 'heatmap') {
                for (let i = 0; i < data.length; i++) {
                    if ((itemCol.dataTypeCol.value !== 'all' ? (data[i][itemCol.dataTypeCol.key] === itemCol.dataTypeCol.value) : true) && data[i][itemCol.timeArr.key] == itemCol.timeArr.value && data[i][itemCol.dataMap.key] === itemCol.dataMap.value)
                        count += data[i][countCol]
                }
            } else if (chartType === 'pie' || chartType === 'gauge' || chartType === 'ring') { // 增加饼图处理 2019年9月27日
                for (let i = 0; i < data.length; i++) {
                    if ((itemCol.dataTypeCol.value !== 'all' ? (data[i][itemCol.dataTypeCol.key] === itemCol.dataTypeCol
                        .value) : true) && data[i][itemCol.timeArr.key] == itemCol.timeArr.value)
                        count += data[i][countCol]
                }
            }
            return count
        }
    }
}