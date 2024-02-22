<template>
    <div class="father">
        <div class="context">
            <Category></Category>
            <Category></Category>
            <Category></Category>
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