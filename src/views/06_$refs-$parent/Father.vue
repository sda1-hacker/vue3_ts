<template>
    <div>
        <h3>父组件</h3>
        <h4>房子: {{ house }}</h4>
        <button @click="updateChild1Toy">修改chiled1的玩具为小猪佩奇</button>
        <RefsAndParentChild ref="c1"></RefsAndParentChild>
        <button @click="updateChild2Computer">修改child2的电脑为小米</button>
        <RefsAndParentChild2 ref="c2"></RefsAndParentChild2>
        <button @click="getAllChilds($refs)">获取所有的子组件</button>
    </div>
</template>

<script lang = 'ts' setup name = 'RefsAndParentFather'>
    import RefsAndParentChild from "@/views/06_$refs-$parent/Child.vue";
    import RefsAndParentChild2 from "@/views/06_$refs-$parent/Child2.vue";

    import { ref } from "vue";
    let house = ref('大别野')

    let c1 = ref()      // 这里获得的是子组件中暴露的数据
    let c2 = ref()      // 这里获取的是子组件中暴露的数据

    function updateChild1Toy(){
        c1.value.toy = "小猪佩奇"
    }

    function updateChild2Computer(){
        c2.value.computer = "小米电脑"
    }

    function getAllChilds(childs: any) {   // 这里接受的是$refs对象, 这个对象包含了所有使用ref标记的子组件实力.
        // console.log(childs)
        console.log("c1:: ", childs.c1.toy)
        console.log("c2: ", childs.c2.computer)
    }

    defineExpose({house: house})  // 暴露对象给其他组件使用
</script>

<style scoped>
</style>