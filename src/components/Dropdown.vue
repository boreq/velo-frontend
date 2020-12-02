<template>
    <div class="dropdown">
        <div class="close-overlay" @click="close" v-if="isOpen"></div>
        <div class="wrapper">
            <a class="trigger" @click="open">
                <slot name="trigger"></slot>
            </a>
            <div class="arrow" v-if="isOpen">
            </div>
            <ul class="content" v-if="isOpen">
                <slot name="content"></slot>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" src="./Dropdown.ts"></script>
<style scoped lang="scss" src="./Dropdown.scss"></style>
