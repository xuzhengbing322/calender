<template>
      <div class="container">
            <error-tip />
            <div v-if="!errorCode">
                  <card-list :data="yearData" />
            </div>
      </div>
</template>

<script>
import getData from '@/services/index.js';
import { onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { getNowDate } from '@/libs/utils';

import CardList from '@/components/yearPage/list.vue'
import ErrorTip from "@/components/errorTip/index.vue";

export default {
      name: 'YearPage',
      components: {
            ErrorTip,
            CardList
      },
      setup(){
            const store = useStore(),
                  state = store.state;

            onMounted(() => {
                  getData(store, 'year', getNowDate('year'))
            });

            watch(() => {
                  return state.yearData
            }, () => {
                  store.commit('setErrorCode', 0)
            }) 

            const errorCode = computed(() => {
                  return state.errorCode
            });

            const yearData = computed(() => state.yearData)

            return {
                  errorCode,
                  yearData
            }
      }
}
</script>

<style lang="scss" scoped>

</style>