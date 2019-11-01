<template>
    <input class="form-input" :type="type" :placeholder="placeholder"
           :value="value" @input="$emit('input', $event.target.value)">
</template>
<script lang="ts" src="./FormInput.ts"></script>
<style scoped lang="scss" src="./FormInput.scss"></style>
