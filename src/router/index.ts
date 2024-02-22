// 创建一个路由器并暴露
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

// 引入需要展示的组件
import Props from "@/views/01_props/Father.vue";
import Event from "@/views/02_event/Father.vue"
import Mitt from "@/views/03_mitt/Father.vue";
import VModel from "@/views/04_v-model/Father.vue";
import Attrs from "@/views/05_attrs/Father.vue";
import RefsAndParent from "@/views/06_$refs-$parent/Father.vue";
import ProvideAndInject from "@/views/07_provide-inject/Father.vue";
import Pinia from "@/views/08_pinia/Father.vue";
import Solt from "@/views/09_slot/Father.vue";



// 创建路由器
const router = createRouter({
    history: createWebHistory(),  // 路由器工作模式
    routes:[   // 路由规则
        {
            name: 'props',
            path: '/props',
            component: Props
        },
        {
            name: 'event',
            path: '/event',
            component: Event
        },
        {
            name: 'mitt',
            path: '/mitt',
            component: Mitt
        },
        {
            name: 'vmodel',
            path: '/vmodel',
            component: VModel
        },
        {
            name: 'attrs',
            path: '/attrs',
            component: Attrs
        },
        {
            name: 'refsAndParent',
            path: '/refsAndParent',
            component: RefsAndParent
        },
        {
            name: 'provideAndInject',
            path: '/provideAndInject',
            component: ProvideAndInject
        },
        {
            name: 'pinia',
            path: '/pinia',
            component: Pinia
        },
        {
            name: 'solt',
            path: '/solt',
            component: Solt
        },
    ] 
})

export default router