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
                    <div class="name" v-if="zone.name">
                        {{ zone.name }}
                    </div>
                    <div class="name" v-else>
                        Unnamed privacy zone
                    </div>
                    <div class="map">
                        <privacy-zone-map :zone="zone" :lock="true"></privacy-zone-map>
                    </div>
                </li>
            </ul>
        </settings-page>
    </div>
</template>
<script lang="ts" src="./SettingsPrivacyZones.ts"></script>
<style scoped lang="scss" src="./SettingsPrivacyZones.scss"></style>
