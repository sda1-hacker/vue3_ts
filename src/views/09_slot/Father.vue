<template>
    <div class="father">
        <div class="context">
            <Category>
                <!-- 在子组件中通过slot标签传递的所有数据，都被放在了一个名字为params 的对象中了 --> 
                <template v-slot="params">
                    <ul>
                        <li v-for="g in params.youxi" :key="g.id">{{ g.name }}</li>
                    </ul>
                </template>
            </Category>

            <Category>
                <template v-slot="params">
                    <ol>
                        <li v-for="g in params.youxi" :key="g.id">{{ g.name }}</li>
                    </ol>
                </template>
            </Category>

        </div>
    </div>
</template>

<script lang = 'ts' setup name = 'SlotFather'>
    import Category from "@/views/09_slot/Category.vue";
</script>

<style scoped>
    .father {
        background-color: rgb(165, 164, 164);
        padding: 10px;
        border-radius: 10px;
    }

    .context {
        display: flex;
        justify-content: space-evenly;
    }
</style>