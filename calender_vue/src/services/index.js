// 处理请求到的数据
import {
      getDayData,
      getMonthData,
      getYearData
} from '@/services/request';

import {
      formatChsDate,
      mapForChsDate
} from '@/libs/utils'

//field表示当前的路由组件。
export default async (store, field, date) => {
      let data = null;

      // 根据field的情况，调用不同的请求函数。
      switch (field) {
            case 'day':
                  data = await getDayData(date);
                  break;
            case 'month':
                  data = await getMonthData(date);
                  break;
            case 'year':
                  data = await getYearData(date);
                  break;
            default:
                  break;
      }

      // 根据error_code判断请求是否成功。如果不成功，则保存error_code。
      if (data.error_code !== 0) {
            store.commit('setErrorCode', data.error_code);
            return;
      }


      /*请求成功后，就要整理数据。
      如果是day路由组件发送的请求，则请求回来的日期在data.result.data中。
数据的格式是xxxx-xx-xx，要将它变成xxxx年xx月xx日。
      如果是month路由组件发送的请求，则请求回来的日期在data.result.data.holiday_array.festival。
数据的格式是xxxx-xx-xx，要将它变成xxxx年xx月xx日。
      如果是year路由组件发送的请求，则请求回来的日期在data.result.data.holiday_array.startday。
数据的格式是xxxx-xx-xx，要将它变成xxxx年xx月xx日。
      */ 
      let res = null;
      switch (field) {
            case 'day':
                  res = data.result.data;
                  res.date = formatChsDate(res.date, 'day');
                  res['year-month'] = formatChsDate(res['year-month'], 'month');
                  break;
            case 'month':
                  res = data.result.data.holiday_array;
                  res = mapForChsDate(res, 'festival');
                  break;
            case 'year':
                  res = data.result.data.holiday_list;
                  res = mapForChsDate(res, 'startday');
                  break;
      }

      //调用mutations中的方法，将整理好的数据给state。
      store.commit('setData', {
            field,
            data: res
      })
}