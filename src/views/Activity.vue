<template>
    <div class="activity">
        <main-header text="Activity"></main-header>
        <activity-header :activity="activity"></activity-header>
        <route-map class="map" :route="activity.route"></route-map>
    </div>
</template>
<script lang="ts" src="./Activity.ts"></script>
<style scoped lang="scss" src="./Activity.scss"></style>
