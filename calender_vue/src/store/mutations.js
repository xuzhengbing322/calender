export default {
      /*页面显示的路由组件不同，所显示的headerTitle的值就不同。也就是说，通过监听路由跳转，
      获取目标路由的名称。不同的路由名称对应不同的路由组件，所显示的headerTitle的值也不同。
      因此，要根据路由名称来修改headerTitle。
      */       
      setHeaderTitle(state, routerName) {
            switch (routerName) {
                  case 'day':
                        state.headerTitle = '当天信息';
                        break;
                  case 'month':
                        state.headerTitle = '近期假期';
                        break;
                  case 'year':
                        state.headerTitle = '当年假期';
                        break;
                  default:
                        state.headerTitle = '当天信息';
                        break;
            }
      },

      /*页面渲染的路由组件不同，搜索框中的placeholder以及maxlength就不同。
      因此要根据路由名称，设置搜索框输入的值最大的长度，以及placeholder。
      */ 
      setMaxlength (state, routerName) {
            switch (routerName) {
                  case 'day':
                        state.maxlength = 8;
                        break;
                  case 'month':
                        state.maxlength = 6;
                        break;
                  case 'year':
                        state.maxlength = 4;
                        break;
                  default:
                        state.maxlength = 8;
                        break;
            }
      },

      // 设置input框的默认值
      setPlaceholder (state, routerName) {
            const date = new Date();
            // 获取当天的年月日
            let year = date.getFullYear(),
                  month = date.getMonth() + 1,
                  day = date.getDate();

            // 补零
            month = month < 10 ? ('0' + month) : month;
            day = day < 10 ? ('0' + day) : day;


            switch (routerName) {
                  case 'day':
                        state.placeholder = `格式：${year}${month}${day}（${year}年${month}月${day}日）`;
                        break;
                  case 'month':
                        state.placeholder = `格式：${year}${month}（${year}年${month}月`;
                        break;
                  case 'year':
                        state.placeholder = `格式：${year}（${year}年`;
                        break;
                  default:
                        state.placeholder = `格式：${year}${month}${day}（${year}年${month}月${day}日）`;
                        break;
            }
      },


      // 修改error_code的值。
      setErrorCode (state, errorCode) {
            state.errorCode = errorCode;
      },


      // 设置数据，将整理好的数据存入state中。
      setData (state, payload) {
            const { field, data } = payload;

            switch (field) {
                  case 'day': 
                        state.dayData = data;
                        break;
                  case 'month':
                        state.monthData = data;
                        break;
                  case 'year':
                        state.yearData = data;
                        break;
                  default:
                        break;
            }
      },

      // 切换路由的时候，修改field
      setField(state, field){
            state.field = field;
      }
}