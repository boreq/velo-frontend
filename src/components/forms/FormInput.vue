<template>
    <div class="form-input">
        <div class="form-input-wrapper">
            <div v-if="icon" class="icon">
                <i :class="icon"></i>
            </div>
            <input :type="type" 
                   :value="value" @input="$emit('input', $event.target.value)"
                   :maxlength="maxlength" @keydown="onKeyDown"
                   :id="id">
            <label class="label" :class="{ 'move-aside': isPopulated }" :for="id">
                {{ placeholder }}
            </label>
        </div>
    </div>
</template>
<script lang="ts" src="./FormInput.ts"></script>
<style scoped lang="scss" src="./FormInput.scss"></style>
