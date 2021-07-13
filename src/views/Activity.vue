<template>
    <div class="activity">
        <div class="wrapper">
            <main-header :text="title">
                <main-header-actions v-if="activity">
                    <main-header-action v-if="canEditActivity">
                        <router-link :to="activitySettingsLocation">
                            Edit
                        </router-link>
                    </main-header-action>
                </main-header-actions>
            </main-header>
            <activity-header :activity="activity" v-if="activity" :hideTitle="true"></activity-header>
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
