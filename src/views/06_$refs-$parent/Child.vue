<template>
    <h3>Child2</h3>
    <h4>玩具: {{ toy }}</h4>

    <button @click="updateFatherHouse($parent)">修改父亲的房子为豪宅</button>
</template>

<script setup lang="ts" name ="RefsAndParentChild">
    import { ref } from "vue";
    let toy = ref('奥特曼')

    defineExpose({toy: toy})  // 暴露对象给其他组件使用

    function updateFatherHouse(parent: any) {
        parent.house = "豪宅"
    }
</script>

<style scoped>
</style>