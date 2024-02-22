<template>
    <!-- <h4>a: {{ a }}</h4>
    <h4>其他: {{ $attrs }}</h4> -->

    <AttrsGrandChild v-bind="$attrs"></AttrsGrandChild>

</template>

<script setup lang="ts" name ="AttrsChild">
    import AttrsGrandChild from "@/views/05_attrs/GrandChild.vue";
    // defineProps(['a'])  // 父组件传递的多个数据, 如果在这里接受了, 就不会出现在$attrs中了

</script>

<style scoped>
</style>