<template>
    <h1 class="main-header">
        <div class="text">{{ text }}</div>
        <div class="slot">
            <slot></slot>
        </div>
    </h1>
</template>
<script lang="ts" src="./MainHeader.ts"></script>
<style scoped lang="scss" src="./MainHeader.scss"></style>
