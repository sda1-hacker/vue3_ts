<template>
    AttrsGrandChild
    <h4>attrs: {{ $attrs }}</h4>
    <h4>a: {{ a }}</h4>
    <h4>b: {{ b }}</h4>
    <h4>c: {{ c }}</h4>
    <h4>d: {{ d }}</h4>
    <h4>e: {{ e }}</h4>
    <h4>f: {{ f }}</h4>

    <hr/>
    <button @click="sendDataToGrandFather('pppppppp')">发送数据子祖先组件</button>
</template>

<script setup lang="ts" name ="AttrsGrandChild">
    defineProps<{ a: number,  b: number,  c: number,  d: number,  e: number,  f: number,  sendDataToGrandFather: (val: string) => void}>()
</script>

<style scoped>
</style>