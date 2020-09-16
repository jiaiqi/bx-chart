/**
 * @param {Array} data 通用接口返回的数据
 * @param {Array} dimension 表示维度的字段
 * @param {String} chartType 图表类型
 * @param {Object} labelMap 指标别名
 * @param {Boolean} isMultiDim 是否是多维度
 */
function buildChartData (data, dimension, chartType, labelMap, isMultiDim) {
  let result = {
    "columns": [], // 单维度时columns第一项为维度，其余项为指标
    "rows": [], // 数据的合集
  }
  let metrics = [] //指标字段集合
  if (chartType === 'line' || chartType === 'histogram' || chartType === 'pie') {
    if (!isMultiDim && Array.isArray(dimension) && dimension.length === 1) {
      // 此图表非多维度，即单维度图表
      if (Array.isArray(data) && data.length > 0) {
        // 拿到数据所有字段，过滤维度字段，得到指标数组
        metrics = Object.keys(data[ 0 ]).filter(item => {
          if (item !== dimension[ 0 ]) {
            return item
          }
        })
      }
      //将维度放到指标数组的第一项，组成图表的columns
      metrics.unshift(dimension[ 0 ])
      result.columns = metrics
      result.rows = data
      if (labelMap && typeof labelMap === 'object') {
        let labelKey = Object.keys(labelMap)
        result.rows = data.map(item => {
          Object.keys(item).forEach(key => {
            if (labelKey.includes(key)) {
              item[ labelMap[ key ] ] = item[ key ]
              delete item[ key ]
            }
          })
          return item
        })
        labelKey.forEach(key => {
          result.columns.splice(result.columns.indexOf(key), 1, labelMap[ key ])
        })
      }
    }
  }
  return result
}

export default buildChartData