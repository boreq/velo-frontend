<template>
    <div class="form-slider">
        <div v-if="icon" class="icon">
            <i :class="icon"></i>
        </div>
        <input type="range" :min="min" :max="max" :step="step"
               :value="value" @input="emitValue">
        <div class="label" :style="{ left: labelLeft }">
            <div class="text-wrapper">
                {{ labelString }}
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./FormSlider.ts"></script>
<style scoped lang="scss" src="./FormSlider.scss"></style>
