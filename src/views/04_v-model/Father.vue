<template>
    <div>
        <!-- <My-Input v-model="username"></My-Input> -->
        <MyInput :modelValue="username" @update:modelValue="username = $event"></MyInput>  <!-- 这里的$event是接收到的数据 -->
        <!-- <MyInput :modelValue="username" @update:modelValue="eventOn"></MyInput> -->
        {{ username }}

    </div>
</template>

<script lang = 'ts' setup name = 'VModelFather'>
    import MyInput from "@/views/04_v-model/My-Input.vue"

    import {ref} from 'vue'

    let username = ref('张三')

    function eventOn(data: any) {
        username.value = data
    }

</script>

<style scoped>
</style>