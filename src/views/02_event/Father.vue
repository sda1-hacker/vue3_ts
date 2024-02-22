<template>
    <div>
        <h3>父组件</h3>
        <h4>{{ childData }}</h4>
        <!-- @get-child-data是一个自定义的事件, 需要在子组件中注册, 回调函数是getData -->
        <EventChild @get-child-data="getData"></EventChild>
    </div>
</template>

<script lang = 'ts' setup name = 'EventFather'>
    import EventChild from "@/views/02_event/Child.vue";
    import { ref } from "vue";
    let childData = ref('')
    function getData(data: string) {
        childData.value = data
    }

</script>

<style scoped>
</style>