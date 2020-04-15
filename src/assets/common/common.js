export default {
    install (Vue, options) {
        Vue.prototype.deepClone = function (obj) {
            // 深拷贝
            function isObject (o) {
                return (typeof o === 'object' || typeof o === 'function') && o !== null
            }

            if (!isObject(obj)) {
                throw new Error('非对象')
            }
            let isArray = Array.isArray(obj)
            let newObj = isArray ? [...obj] : { ...obj }
            Reflect.ownKeys(newObj).forEach(key => {
            newObj[key] = isObject(obj[key]) ? Vue.prototype.deepClone(obj[key]) : obj[key]
            })
            return newObj
        },
        Vue.prototype.convertData = function(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value),
                    });
                }
            }
            return res;
        };
    }
}