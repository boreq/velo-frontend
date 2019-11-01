<template>
    <div class="form-input">
        <i v-if="icon" class="icon" :class="icon"></i>
        <input :type="type" :placeholder="placeholder"
               :value="value" @input="$emit('input', $event.target.value)">
    </div>
</template>
<script lang="ts" src="./FormInput.ts"></script>
<style scoped lang="scss" src="./FormInput.scss"></style>
