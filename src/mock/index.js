import Mock from "mockjs"
const chartData = () => {
   // mock随机数据
    const Random = Mock.Random;
    let data= [];
    for (let i = 0; i < 10; i++) {
        let newData = {
            title: Random.csentence(10, 25), // 随机生成长度为10-25的标题
            region: Random.region(), // 随机生成地区
            author: Random.cname(), // 随机生成名字
            date: Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
        }
        data.push(newData)
    }
    return data
}
// Mock.mock(url,method,chartData) 三个参数对应 api地址、请求方式、数据源
Mock.mock("/getShareData",'post',chartData) 