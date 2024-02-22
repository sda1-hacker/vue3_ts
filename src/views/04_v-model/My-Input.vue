<template>
    <input 
        type="text"
        :value="modelValue"
        @input="sentdataTofather($event)"   
    />
</template>

<script setup lang="ts" name ="My-Input">

    let props = defineProps(['modelValue'])   // 接受了父组件中传递的值, modelValue

    let emitter = defineEmits(['update:modelValue'])  // 接受了父组件传递过来的自定义事件, 事件名是 update:modelValue

    function sentdataTofather(event: Event){
        emitter('update:modelValue', event.target.value)
    }


</script>

<style scoped>
</style>