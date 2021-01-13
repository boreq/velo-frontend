<template>
    <div class="activity-preview">
        <activity-header :activity="activity"></activity-header>
        <router-link :to="location" class="map-link">
            <route-map :route="activity.route" :lock="true"></route-map>
        </router-link>
    </div>
</template>
<script lang="ts" src="./ActivityPreview.ts"></script>
<style scoped lang="scss" src="./ActivityPreview.scss"></style>
