<template>
  <div class="container">
    <!-- 后端返回的数据中需要设置一个errorCode属性。当errorCode为0时，请求成功。
    当errorCode不为0时，请求失败。
      请求成功时显示路由组件，请求失败时显示错误组件。通过v-if判断errorCode来决定显示或隐藏错误页面。
       -->
    <error-tip />
    <div v-if="!errorCode">
      <day-card :data="dayData" />
      <day-list :data="dayData" />
    </div>
  </div>
</template>

<script>
import getData from "@/services/index.js";
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { getNowDate } from "@/libs/utils";

import DayCard from "@/components/dayPage/card.vue";
import DayList from "@/components/dayPage/list/index.vue";
import ErrorTip from "@/components/errorTip/index.vue";

export default {
  name: "DayPage",
  components: {
    DayCard,
    DayList,
    ErrorTip,
  },
  setup() {
    const store = useStore(),
      state = store.state;

    // onMounted函数封装了一部分功能，回调函数是用户自定义的功能。两个部分加起来才完成功能。
    onMounted(() => {
      // 调用处理请求数据的函数，获取数据，并将数据交给state存储。
      getData(store, "day", getNowDate("day"));
    });

    // 监听state中的dayData。如果dayData的数据发生变化，则证明数据请求成功。此时就要将errorCode变成0     
    watch(() => {
          return state.dayData;
    }, () => {
          store.commit('setErrorCode', 0)
    })

    const dayData = computed(() => {
      return state.dayData;
    });

    const errorCode = computed(() => {
          return state.errorCode
    })

    return {
      dayData,
      errorCode
    };
  },
};
</script>

<style lang="scss" scoped>
</style>

