<template>
    <div class="activity">
        <main-header :text="title">
            <main-header-actions v-if="activity">
                <main-header-action v-if="canEditActivity">
                    <router-link :to="activitySettingsLocation">
                        Settings
                    </router-link>
                </main-header-action>
            </main-header-actions>
        </main-header>
        <activity-header :activity="activity" v-if="activity"></activity-header>
        <route-map class="map" :route="activity.route" v-if="activity"></route-map>
    </div>
</template>
<script lang="ts" src="./Activity.ts"></script>
<style scoped lang="scss" src="./Activity.scss"></style>
