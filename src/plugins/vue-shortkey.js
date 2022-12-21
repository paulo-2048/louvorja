import * as Vue from "vue";
const ShortKey = require('vue3-shortkey')
Vue.use(ShortKey, { prevent: ['input', 'textarea'] })
export default ShortKey;