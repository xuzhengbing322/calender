<template>
  <div id="app">
    <my-header>{{ headerTitle }}</my-header>
    <search-input
      :placeholder="placeholder"
      :maxlength="maxlength"
      ></search-input>
      <!-- 缓存。路由组件加载或者跳转路由的时候会请求数据。将请求到的数据给缓存下来。再次请求时，如果数据不变，就使用缓存数据，而不在请求。 -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <my-tab></my-tab>
  </div>
</template>

<script>
import MyHeader from "@/components/header";
import MyTab from "@/components/tab/index.vue"
import SearchInput from "@/components/searchInput/index.vue"
import { useStore } from "vuex";
import { computed, watch } from "vue";
import { useRouter } from 'vue-router';

export default {
  name: "App",
  components: {
    MyHeader,
    MyTab,
    SearchInput
  },
  setup() {
    // 获取仓库
    const store = useStore(),
      state = store.state,
      router = useRouter();

    const headerTitle = computed(() => {
      return state.headerTitle;
    });

    const placeholder = computed(() => {
      return state.placeholder;
    })

    const maxlength = computed(() => {
      return state.maxlength;
    }) 

    // 每次刷新页面时，都会跳转到首页。防止用户通过修改网址，跳转到其他页面。 
    router.push('/');

    store.commit('setPlaceholder', 'day');

    // 监听路由跳转，获取路由名称。调用store中的setHeaderTitle方法，改变headerTitle的值
    watch(() => {
      return router.currentRoute.value.name
    },(newValue) => {
      store.commit('setHeaderTitle', newValue);
      store.commit('setPlaceholder', newValue);
      store.commit('setMaxlength', newValue),
      store.commit('setField', newValue)
    })

    return {
      headerTitle,
      placeholder,
      maxlength
    };
  },
};
</script>

