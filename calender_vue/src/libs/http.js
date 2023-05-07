import axios from 'axios';
import qs from 'qs';
import { JUHE_APPKEY } from '@/configs/keys';

// 封装axios的post请求
function axiosPost(options) {
      axios({
            url: options.url,
            method: 'post',
            header: {
                  "Content-Type": "application/x-www-form-urlencoded"
            },
            // data是post请求需要发送给服务器的信息。
            data: qs.stringify({
                  ...options.data,
                  key: JUHE_APPKEY
            })
      })
      .then((res) => {
            options.success(res.data);
      })
      .catch((err) => {
            options.error(err);
      })
}

function axiosGet (options) {
      axios(options.url + "&key=" + JUHE_APPKEY)
      .then((res) => {
            options.success(res.data);
      })
      .catch((err) => {
            options.error(err);
      })
}

export {
      axiosGet,
      axiosPost

}

