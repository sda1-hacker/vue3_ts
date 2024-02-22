<template>
    <h3>孙子组件</h3>
    <h4>银子:: {{ money }}</h4>
    <h4>祖上的: 一辆{{ car.brand }}车, 价格:{{ car.price }}, 购买时间: {{ car.buyTime }}</h4>
    <button @click="sendData"> 发送数据“abccc”给祖组件 </button>
</template>

<script setup lang="ts" name ="ProvideAndInjectGrandChild">
    import { inject } from "vue";

    // 第一个参数是key, 第二个参数是默认值(通过默认值来指定数据类型),
    let money = inject('money', 888)  // inject用于接受provide提供的数据

    let car = inject('car', {brand: '未知', price: 0, buyTime: '0000-00-00'})

    let getData = inject('getData', (val: string)=>{})

    function sendData(){
        getData('abccc')
    }
</script>

<style scoped>
</style>