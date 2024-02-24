<template>
       <slot :youxi="game" x="x变量" y="y变量"></slot>
</template>

<script setup lang="ts" name ="Category">
    import { reactive } from "vue";
    let game = reactive([
        {
            id: "001",
            name: "穿越火线",
        },
        {
            id: "002",
            name: "地下城与勇士",
        },
        {
            id: "002",
            name: "梦幻西游",
        }
    ])
</script>
 
<style scoped>
    h3{
        background-color: orange;
    }
</style>