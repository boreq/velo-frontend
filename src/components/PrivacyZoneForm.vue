<template>
    <form class="privacy-zone-form">
        <form-input type="text" placeholder="Name" icon="fas fa-pen"
            maxlength="50" :value="value.name" @input="onName"></form-input>
        <form-slider class="radius-slider" min="100" max="5000" step="100" :label="radiusSliderLabel"
            :value="value.circle.radius" @input="onRadius"></form-slider>
        <div class="map">
            <privacy-zone-map :zone="value" @position="onMapPosition"></privacy-zone-map>
        </div>
    </form>
</template>
<script lang="ts" src="./PrivacyZoneForm.ts"></script>
<style scoped lang="scss" src="./PrivacyZoneForm.scss"></style>
