<template>
    <div class="activity">
        <main-header text="Activity">
            <ul class="header-actions">
                <li>
                    <a>Edit</a>
                </li>
                <li>
                    <a>Delete</a>
                </li>
            </ul>
        </main-header>
        <activity-header :activity="activity" v-if="activity"></activity-header>
        <route-map class="map" :route="activity.route" v-if="activity"></route-map>
    </div>
</template>
<script lang="ts" src="./Activity.ts"></script>
<style scoped lang="scss" src="./Activity.scss"></style>
