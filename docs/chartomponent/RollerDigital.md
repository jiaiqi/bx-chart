# 数字
## 参数:
```json
{
  color: {
    //颜色
    type: String,
    default: '#333'
  },
  number: {
    //数值
    type: Number,
    default: 0
  },
  duration: {
    // 动画时长
    type: Number,
    default: 3
  },
  size: {
    // 数字大小  默认大小为28*50px 对应5
    // size配置为1时为默认大小的1/5 ，配置为2时大小为默认大小的2/5，以此类推
    type: Number,
    default: 5
  }
}

```
## 图表配置示例:
```json
{
	"units_position": "right",
	"units": "",
	"showBorder": false, //通用配置 是否显示图标边框
	"hideTitle": true,   //通用配置,是否隐藏图标标题
	"theme": "led", // LED风格数字，不配置theme或者theme不为led时，显示风格为普通数字
	"size": 4, // 数字大小  默认大小为28*50px 对应5 size配置为1时为默认大小的1/5 ，配置为2时大小为默认大小的2/5，以此类推
	"duration": 0, // 动画时长 配置为0时无动画直接显示数字
	"color": "#f1e523" //数字颜色
}

```