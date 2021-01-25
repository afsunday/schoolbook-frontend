<template>
    <div v-if="loaded && items.length <= 0 && !errState" class="text-center mb-3 mt-3">
        <div class="mr-2 mr-sm-3 text-muted p-0 m-0 empty-list-icon">
            <i class="icon icon-assignment icon-lg p-0 m-0"></i>
        </div>
        <span class="re-text text-center mt-n1">
            <slot/>
        </span>
    </div>
</template>

<script>
export default {
    name: 'EmptyList',
    props: ['loaded', 'items', 'errState']
}
</script>

<style scoped>
.empty-list-icon {
    font-size: 42px;
}

.re-text {
    font-size: 91%;
    font-weight: 500;
    line-height: 1.1;
}
</style>
