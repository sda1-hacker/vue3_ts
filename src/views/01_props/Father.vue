<template>
    <div>
        <h2>父组件, 有一辆Car: {{ fatherCar }}, 儿子有一辆Car: {{ childData }}</h2>
        <PropChild :fatherData="fatherCar" :sendData="getChildData"></PropChild>
    </div>
</template>

<script lang = 'ts' setup name = 'PropFather'>
    import PropChild from "@/views/01_props/Child.vue";
    import { ref } from "vue";
    let fatherCar = ref<string>('奔驰')
    
    let childData = ref<string>()

    // 将一个函数传递给子组件, 子组件在调用这个函数的时候,将数据 *作为参数* 传递给父组件
    // 这个方法用于接受子组件传递过来的数据,
    function getChildData(val: string) {
        childData.value = val
    }
</script>

<style scoped>
</style>