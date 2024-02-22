<template>
    <h3>EventChild子组件</h3>
    <h4> 儿子拥有: {{ childData }} </h4>
    <!-- 两种调用函数的方法都可以 -->
    <button @click="sendDataToFather"> 使用自定义事件向父组件发送数据 </button>
    <!-- <button @click="emit('get-child-data')"> 使用自定义事件向父组件发送数据 </button> -->
</template>

<script setup lang="ts" name ="EventChild">
    import { ref } from "vue"; 
    let childData = ref('奥特曼')

    // 注册自定义事件get-child-data
    let emit = defineEmits(['get-child-data'])
    // 触发get-child-data事件, 可以在不同的函数中调用.
    // emit('get-child-data', 需要传递的数据写在这里)

    function sendDataToFather(){
        emit('get-child-data', childData)
    }

</script>

<style scoped>
</style>