<template>
    <div class="conversion-status" v-tooltip="text" v-if="isConverting">
        <spinner></spinner>
    </div>
</template>
<script lang="ts" src="./ConversionStatus.ts"></script>
<style scoped lang="scss" src="./ConversionStatus.scss"></style>
