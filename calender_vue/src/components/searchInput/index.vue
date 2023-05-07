<template>
  <div class="search-wrap">
    <!-- 
      搜索框的输入数据的格式与当前页面的路由组件有关。因此，要获取当前路由组件的field。
    然后根据field处理输入数据的格式。用户输入数据后会触发input事件，在事件处理函数中会根据处理后的输入数据来向服务器请求数据。
    -->
    <input
      type="text"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :value="inputValue"
      @input="searchData($event)"
    />
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import {  formatUserDate, getNowDate } from '@/libs/utils'
import { useStore } from 'vuex';

import getData from '@/services'


export default {
  name: "SearchInput",
  props: {
    placeholder: String,
    maxlength: Number,
  },
  setup(props) {
    const inputValue = ref(""),
          store = useStore(),
          state = store.state;

    // 处理用户输入的数据
    const searchData = (e) => {
      // 获取用户输入的数据
      inputValue.value = e.target.value;
      // 获取当前路由组件的field
      const field = computed(() => state.field).value;
      // 判断用户输入的数据是否等于最大值，相等才是有效数据。
      if (inputValue.value.length === props.maxlength) {
        // 根据field，执行相应的请求数据函数
        getData(store, field, formatUserDate(inputValue.value));
      //  用户清空数据，页面返回当天
      } else if (inputValue.value.length === 0) {
        getData(store, field, getNowDate(field));
      }
    };

    watch(() => {
      return state.field;
    }, () => {
      inputValue.value = '';
    })

    return {
      inputValue,
      searchData,
    };
  },
};
</script>


<style lang="scss" scoped>
.search-wrap {
  position: fixed;
  top: 0.44rem;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 0.38rem;
  padding: 0.03rem 0.1rem;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  background-color: #fff;

  input {
    width: 100%;
    height: 100%;
    font-size: 0.14rem;
    border: 1px solid #ddd;
    text-indent: 0.1rem;
    border-radius: 0.03rem;

    &:focus {
      border-color: #ed4040;
      box-shadow: 0 0 0.02rem #ed4040;
      transition: all 0.3s;
    }
  }
}
</style>