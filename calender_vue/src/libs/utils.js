// 补零
function _addZero(value) {
      return value < 10 ? ('0' + value) : value;
}

// getIconDate的参数type有day、month、year这三种情况，每种情况执行相应的操作。
function getIconDate(type) {
      const date = new Date();

      switch (type) {
            case 'day':
                  return _addZero(date.getDate().toString());
            case 'month':
                  return _addZero((date.getMonth() + 1).toString());
            case 'year':
                  return date.getFullYear().toString().substring(2);
      }
}

// 后端的日期是xxxx-xx-xx。页面需要的数据时xxxx年xx月xx日。
function formatChsDate(date, type) {
      const _arr = date.split('-');

      switch (type) {
            case 'day':
                  return `${_arr[0]}年${_arr[1]}月${_arr[2]}日`;
            case 'month':
                  return `${_arr[0]}年${_arr[1]}月`;
            case 'year':
                  return `${_arr[0]}年`;
            default:
                  return `${_arr[0]}年${_arr[1]}月${_arr[2]}日`;
      }
}

// 遍历data中的所有对象，然后格式化对象中的key属性。 也就是格式话日期。
function mapForChsDate(data, key) {
      return data.map((item) => {
            item[key] = formatChsDate(item[key]);
            return item;
      })
}

// 获取今天的日期，根据day、month、year路由名称，来获取具体需要的日期。
function getNowDate(field) {
      const date = new Date();

      let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate();

      switch (field) {
            case 'day':
                  return `${year}-${month}-${day}`;
            case 'month':
                  return `${year}-${month}`;
            case 'year':
                  return `${year}`;
            default:
                  return `${year}-${month}-${day}`;
      }
}

// 格式化用户输入的数据
function formatUserDate (value) {
      const len = value.length;
      if (len < 4) {
            return;
      }
      if (len === 4) {
            return value;
      }
      if (len > 4 && len < 6) {
            return value.substring(0, 4);
      }
      let _arr = [],
            pattern;
      if (len >= 6 && len < 8) {
            pattern = /(\d{4})(\d{2})/;
            value = value.substring(0, 6).replace(pattern, '$1-$2');
            _arr = Array.from(value).filter((item, index) => {
                  if (index === 5 && item === '0') {
                        return false;
                  }
                  return true;
            });
      } 

      if(len >= 8) {
            pattern = /(\d{4})(\d{2})(\d{2})/;
            value = value.substring(0, 8).replace(pattern, '$1-$2-$3');
            _arr = Array.from(value).filter((item, index) => {
                  if ((index === 5 || index === 8) && item === '0') {
                        return false;
                  }
                  return true;
            });
      }

      // [2,0,2,0,-,7,-,3,0] 转换成字符串，然后去掉,。
      return _arr.toString().replace(/,/g, '');

}

export {
      getIconDate,
      formatChsDate,
      mapForChsDate,
      getNowDate,
      formatUserDate
}