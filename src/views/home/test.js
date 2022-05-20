more_config: {
  col_relation: [
    {
      watch_col: ['page_end', 'page_start'], //相关字段
      dest_col: 'page', //页数
      value: {
        type: 'calc', //col  || calc 计算或者某字段对应值
        value: {
          type: 'sub', //减
          value: [
            {
              type: 'col',
              val: 'page_end'
            },
            {
              type: 'col',
              val: 'page_start'
            },
            {
              type: 'value',
              val: '-1'
            }
          ]
        }
      }
    },
    {
      watch_col: ['unit_price', 'page'], //相关字段
      dest_col: 'total_price', //总价
      value: {
        type: 'calc', //col  || calc 计算或者某字段对应值
        value: {
          type: 'multi', //减
          value: [
            {
              type: 'col',
              val: 'unit_price'
            },
            {
              type: 'col',
              val: 'page'
            }
          ]
        }
      }
    }
  ],
  service_call_cfg: [
    {
      app: 'salesroom',
      service: 'srvsalesroom_print_price_calc_select',
      watch_col: ['page', 'paper_type',"duplex_print","color"],
      req: {
        condition: [
          {
            colName: 'page_num',
            ruleType: 'eq',
            value: {
              valueType: 'rowData',
              valueKey: 'page'
            }
          },
          {
            colName: 'paper_type',
            ruleType: 'eq',
            value: {
              valueType: 'rowData',
              valueKey: 'paper_type'
            }
          },
          {
            colName: 'duplex_print',
            ruleType: 'eq',
            value: {
              valueType: 'rowData',
              valueKey: 'duplex_print'
            }
          },
          {
            colName: 'color',
            ruleType: 'eq',
            value: {
              valueType: 'rowData',
              valueKey: 'color'
            }
          }
        ]
      },
      cols_value_set: [
        {
          dest_col: 'unit_price', //单价
          return_data_index: 0,
          value: {
            type: 'value',
            value: '100'
          }
        }
      ]
    }
  ]
}


this.more_config.col_relation.forEach(col_relation => {
  // if (col_relation.watch_col.includes(e.column)) {
  //当前字段是监控字段
  if (col_relation.watch_col.some(item => e.column === item)) {
    //当前改变值的字段存在于watch_col中
    let colArr = this.allField.filter(field => col_relation.watch_col.includes(field.column));
    if (colArr.every(item => item.value)) {
      self.setRelationColumnValue(self.allField, colArr, col_relation);
    }
  }
});
this.more_config.service_call_cfg.forEach(serviceCallCfg => {
  if (serviceCallCfg.watch_col.some(item => e.column === item)) {
    //当前字段是监控字段
    //拿到所有监控字段的数据
    let colArr = this.allField.filter(field => serviceCallCfg.watch_col.includes(field.column));
    //所有监控字段都有值
    if ( colArr.every(item => item.value)) {
      if (serviceCallCfg.req.condition) {
        serviceCallCfg.req.condition.forEach(cond => {
          if (cond.value.valueType && cond.value.valueType === 'rowData' && cond.value.valueKey) {
            cond.value = self.fieldModel[cond.value.valueKey];
          }
        });
        console.log('122222222233333333333333333333')
        self.setCallbackColumnValue(serviceCallCfg);
      }
    }
  }
});