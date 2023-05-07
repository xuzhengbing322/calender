// 数据请求层
import { axiosPost } from "@/libs/http";


function getDayData(date) {
      // 返回一个promise对象，状态值和结果值由success和error决定。
      return new Promise((resolve, reject) => {
            axiosPost({
                  url: "/api/calendar/day",
                  data: {
                        date: date
                  },
                  success (data) {
                        resolve(data);
                  },
                  error (err) {
                        reject(err)
                  }
            })
      })
}

function getMonthData(yearMonth) {
      return new Promise((resolve, reject) => {
            axiosPost({
                  url: "/api/calendar/month",
                  data: {
                        'year-month': yearMonth
                  },
                  success (data) {
                        resolve(data);
                  },
                  error (err) {
                        reject(err)
                  }
            })
      })
}


function getYearData(year) {
      return new Promise((resolve, reject) => {
            axiosPost({
                  url: "/api/calendar/year",
                  data: {
                        'year': year
                  },
                  success (data) {
                        resolve(data);
                  },
                  error (err) {
                        reject(err)
                  }
            })
      })
}

export {
      getDayData,
      getMonthData,
      getYearData
}