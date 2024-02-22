<template>
    PropsChild, 父亲有一辆Car: {{ fatherData }}, 自己有一辆Car: {{ childCar }} <br/>
    <button @click="sendData(childCar)">调用父组件中的方法,将子组件中的数据传递给父组件</button>
</template>

<script setup lang="ts" name ="PropsChild">
    import {ref} from 'vue'
    let childCar = ref('宝马')

    // 通过props接受两个参数
    // 第一个是string类型的
    // 第二个接受一个函数, 这个函数的返回类型是void, 函数的参数个数为1个,且类型为string
    defineProps<{fatherData: string, sendData: (val: string)=>void }>()
</script>

<style scoped>
</style>