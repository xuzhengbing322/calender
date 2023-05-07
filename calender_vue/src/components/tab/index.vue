<template>
  <div class="tab">
    <!-- 遍历数据，循环渲染 -->
    <div class="tab-item" v-for="(item, index) of tabData" :key="index">
      <!-- 将iconText和path传给子组件tab-icon -->
      <tab-icon :iconText="item.iconText" :path="item.path">{{
        item.tabText
      }}</tab-icon>
    </div>
  </div>
</template>

<script>
import TabIcon from "./icon.vue";


/*tab组件需要复用icon子组件，复用的数量就是数据数组元素项的数量。每一个icon子组件都有相应的数组元素项。
因此，就需要在tab组件中引入数据。然后在icon子组件标签中，通过v-for循环数据，并且创建相应的icon子组件。
*/ 
 
import tabData from "@/data/tab.js";
import { reactive, toRefs } from "vue";

export default {
  name: "Tab",
  components: {
    TabIcon,
  },
  setup() {
    //将数据变成响应式数据，为什么
    const state = reactive({
      tabData,
    });
    const stateToRefs = toRefs(state);

    return {
      ...stateToRefs,
    };
  },
};
</script>


<style lang="scss" scoped>
.tab {
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 0.44rem;
  border-top: 1px solid #ddd;
  background-color: #fff;

  .tab-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33.33%;
    height: 100%;
  }
}
</style>