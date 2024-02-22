<template>
    <h3>Child2</h3>
    <h4>电脑: {{ computer }}</h4>
    <button @click="updateFatherHouse($parent)">修改父亲的房子为大大大别墅</button>

</template>

<script setup lang="ts" name ="RefsAndParentChild2">
    import { ref } from "vue";
    let computer = ref('联想')

    defineExpose({computer})  // 暴露对象给其他组件使用

    function updateFatherHouse(parent: any) {
        parent.house = "大大大别墅"
    }
</script>

<style scoped>
</style>