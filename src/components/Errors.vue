<template>
    <ul class="errors">
        <li class="error" :class="{ hide: shouldHide(error) }" v-for="error of errors" :key="error.id">
            {{ error.text }}
        </li>
    </ul>
</template>
<script lang="ts" src="./Errors.ts"></script>
<style scoped lang="scss" src="./Errors.scss"></style>
