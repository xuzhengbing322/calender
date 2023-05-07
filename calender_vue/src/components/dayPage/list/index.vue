<template>
      <div class="day-list">
            <!-- 组件可复用的条件：1、组件的结构和样式不变。2、组件中有变化的数据由父组件传递而来。 -->
            <!-- v-for循环组件的条件：1、组件传递的数据都是动态传递。如果传递的数据存在静态传递，则无法使用v-for。 -->
            <list-item 
                  title="当前年月"
                  :content="data['year-month']"
            />
            <list-item 
                  title="今年属相"
                  :content="data.animalsYear"
            />
            <list-item 
                  title="农历年份"
                  :content="data.lunarYear"
            />
            <list-item 
                  title="适宜事件"
                  :content="data.suit"
            />
            <list-item 
                  title="避免事件"
                  :content="data.avoid"
            />
      </div>
</template>

<script>
import ListItem from '@/components/dayPage/list/item.vue'

export default {
      name: 'DayList',
      props: {
            data: Object
      },
      components: {
            ListItem
      }
}
</script>


<style lang="scss" scoped>
  .day-list {
    padding: .15rem;
    box-sizing: border-box;
  }
</style>