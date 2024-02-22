<template>
        <h3>子组件2</h3>
        <h4> 我的电脑: {{ computer }} </h4>
        <h4> 我哥的玩具: {{  }}</h4>
</template>

<script setup lang="ts" name ="MittChild2">
    import {ref, onUnmounted} from 'vue'
    import emitter from '@/utils/emitter.ts'

    let computer = ref('联想')
    let toy = ref('')

    // 注册事件, 接受数据
    emitter.on('getChild1Data',(childData:any)=>{
        console.log('child1Dara: ', childData)
        toy.value = childData
    })

    // 组件卸载的时候解绑
    onUnmounted(()=>{
        emitter.off('getChild1Data')
    })
</script>

<style scoped>
</style>