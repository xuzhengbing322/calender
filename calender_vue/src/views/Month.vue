<template>
      <div class="container">
            <error-tip />
            <div v-if="!errorCode">
                  <card-list :data="monthData"/>
            </div>
      </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue';
import getData from '@/services/index.js';
import { useStore } from 'vuex'
import { getNowDate } from '@/libs/utils'

import CardList from '@/components/monthPage/list.vue'
import ErrorTip from "@/components/errorTip/index.vue";

export default {
      name: 'MonthPage',
      components: {
            ErrorTip,
            CardList
      },
      setup(){
            const store = useStore(),
                  state = store.state;

            onMounted(() => {
                  getData(store, 'month', getNowDate('month'));
            });

            const errorCode = computed(() => {
                  return state.errorCode
            });
            const monthData = computed(() => state.monthData);

            watch(() => {
                  return state.monthData;
            }, () => {
                  store.commit('setErrorCode', 0);
            })

            return {
                  errorCode,
                  monthData
            }

      }
}
</script>

<style lang="scss" scoped>

</style>