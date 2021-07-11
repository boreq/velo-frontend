<template>
    <div class="new-privacy-zone">
        <div class="wrapper">
            <main-header text="New privacy zone"></main-header>

            <privacy-zone-form :value="zone" @input="onInput"></privacy-zone-form>

            <app-button text="Save" @click="submit" :disabled="!formValid" :working="working"></app-button>
        </div>
    </div>
</template>
<script lang="ts" src="./NewPrivacyZone.ts"></script>
<style scoped lang="scss" src="./NewPrivacyZone.scss"></style>
