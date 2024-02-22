<template>
    <div>
        <h4>a: {{ a }}</h4>
        <h4>b: {{ b }}</h4>
        <h4>c: {{ c }}</h4>
        <h4>d: {{ d }}</h4>

        <AttrsChild :a="a" :b="b" :c="c" :d="d" v-bind="{e: 5, f: 6}" :sendDataToGrandFather="getGrandChildData"></AttrsChild>
        <!-- v-bind="{e:5, f: 6}"  等价于  :e="5" :f="6"   -->

        <hr/>
        <h4>从孙组件得到的数据: {{ grandChildData }}</h4>
    </div>
</template>

<script lang = 'ts' setup name = 'AttrsFather'>
    import AttrsChild from "@/views/05_attrs/Child.vue";

    import { ref } from "vue";
    let a = ref(1)
    let b = ref(2)
    let c = ref(3)
    let d = ref(4)

    let grandChildData = ref('')
    function getGrandChildData(val: string) {
        grandChildData.value = val
    }

</script>

<style scoped>
</style>