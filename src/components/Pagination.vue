<template>
    <div class="pagination">
        <a class="previous button" v-if="hasPrevious">
            <i class="fas fa-chevron-left"></i>
            Previous
        </a>
        <div class="filler"></div>
        <a class="next button" v-if="hasNext">
            Next
            <i class="fas fa-chevron-right"></i>
        </a>
    </div>
</template>
<script lang="ts" src="./Pagination.ts"></script>
<style scoped lang="scss" src="./Pagination.scss"></style>
