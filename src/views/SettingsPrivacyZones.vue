<template>
    <div class="settings-privacy-zones">
        <settings-page name="privacy-zones">
            <sub-header text="Privacy zones"></sub-header>

            <app-button class="button" text="New privacy zone" @click="goToNewPrivacyZone"></app-button>

            <warning-alert v-if="noPrivacyZones">
                You do not have any privacy zones. 
            </warning-alert>

            <spinner v-if="loading"></spinner>

            <ul class="privacy-zones" v-if="!noPrivacyZones">
                <li v-for="zone in privacyZones" :key="zone.uuid">
                    <privacy-zone :zone="zone"></privacy-zone>
                </li>
            </ul>
        </settings-page>
    </div>
</template>
<script lang="ts" src="./SettingsPrivacyZones.ts"></script>
<style scoped lang="scss" src="./SettingsPrivacyZones.scss"></style>
