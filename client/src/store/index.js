/*
 * @Author: your name
 * @Date: 2020-09-24 14:16:22
 * @LastEditTime: 2020-09-24 18:10:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \phone-crm-dev\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getter'

import type from './type'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    innerHeight: window.innerHeight - 5
  },
  mutations: {
    [type.INNERHEIGHT] (state, val) {
      state.innerHeight = val
    }
  },
  actions: {
    [type.INNERHEIGHT] ({ commit }) {
      commit(type.INNERHEIGHT)
    }
  },
  modules: {
    getters
  }
})
