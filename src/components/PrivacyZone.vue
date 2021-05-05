<template>
    <div class="privacy-zone">
        <div class="name" v-if="zone.name">
            {{ zone.name }}
        </div>
        <div class="name" v-else>
            Unnamed privacy zone
        </div>
        <div class="map">
            <privacy-zone-map :zone="zone" :lock="true"></privacy-zone-map>
        </div>
    </div>
</template>
<script lang="ts" src="./PrivacyZone.ts"></script>
<style scoped lang="scss" src="./PrivacyZone.scss"></style>
