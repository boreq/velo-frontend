<template>
    <div class="activity">
        <div class="header">
            <div class="left">
            </div>
            <div class="center wrapper">
                <activity-header :activity="activity" v-if="activity"></activity-header>
            </div>
            <div class="right">
                <main-header-actions v-if="activity">
                    <main-header-action v-if="canEditActivity">
                        <router-link :to="activitySettingsLocation">
                            Edit
                        </router-link>
                    </main-header-action>
                </main-header-actions>
            </div>
        </div>

        <div class="map-container">
            <div class="map-wrapper" ref="map-wrapper">
                <route-map class="map" :route="activity.route" v-if="activity"></route-map>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./Activity.ts"></script>
<style scoped lang="scss" src="./Activity.scss"></style>
