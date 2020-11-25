<template>
    <div class="pagination">
        <router-link class="previous button" v-if="previous" :to="previous">
            <i class="fas fa-chevron-left"></i>
            Previous
        </router-link>

        <div class="filler"></div>

        <router-link class="next button" v-if="next" :to="next">
            Next
            <i class="fas fa-chevron-right"></i>
        </router-link>
    </div>
</template>
<script lang="ts" src="./Pagination.ts"></script>
<style scoped lang="scss" src="./Pagination.scss"></style>
