<template>
    <h3>子组件1</h3>
    <h4> 我的玩具: {{ toy }} </h4>
</template>

<script setup lang="ts" name ="MittChild">
    import {ref} from 'vue'
    import emitter from '@/utils/emitter.ts'

    let toy = ref('奥特曼')

    // 调用事件, 发送数据
    emitter.emit('getChild1Data', toy.value)

</script>

<style scoped>
</style>