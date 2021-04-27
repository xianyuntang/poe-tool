import VueRouter from "vue-router";

export default new VueRouter({
    mode: process.env.IS_ELECTRON ? 'hash' : 'history',
})