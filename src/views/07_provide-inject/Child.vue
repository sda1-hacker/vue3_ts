<template>
    <h3>子组件</h3>
    <ProvideAndInjectGrandChild></ProvideAndInjectGrandChild>
</template>

<script setup lang="ts" name ="ProvideAndInjectChild">
    import ProvideAndInjectGrandChild from "@/views/07_provide-inject/GrandChild.vue";
</script>

<style scoped>
</style>