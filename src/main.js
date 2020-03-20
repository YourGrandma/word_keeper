import Vue from 'vue'
import App from './App.vue'

import store from './store'
import router from './router'

import axios from 'axios'

const $_instanceAxios = axios.create({

    baseURL: 'https://dictionaryapi.com/api/v3/references/sd4/json'

});

Vue.prototype.$http = $_instanceAxios

Vue.config.productionTip = false

new Vue({

    store,
    router,
    render: h => h(App)

}).$mount('#app')
