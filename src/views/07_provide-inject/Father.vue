<template>
    <div>
        <h3>父组件</h3>
        <h4>money: {{ money }}</h4>
        <h4>一辆{{ car.brand }}车, 价格:{{ car.price }}, 购买时间: {{ car.buyTime }}</h4>
        <h4> 后代传递过来的数据: {{ dt }} </h4>
        <ProvideAndInjectChild></ProvideAndInjectChild>
    </div>
</template>

<script lang = 'ts' setup name = 'ProvideAndInjectFather'>
    import ProvideAndInjectChild from "@/views/07_provide-inject/Child.vue";

    import { ref, reactive, provide } from "vue";

    let money = ref(10000000)
    let car = reactive({
        brand: "奔驰",
        price: 1000000,
        buyTime: "2024-02-22"
    })

    provide('money', money)  // 向后代提供数据, 这里传递的应该是一个响应式的对象
    provide('car', car)  // 向后代提供数据, 这里传递的应该是一个响应式的对象

    let dt = ref('')
    function getData(val: string) {
        dt.value = val
    }

    provide("getData", getData)  // 向后代传递一个函数, 用于获取后代的数据.

</script>

<style scoped>
</style>