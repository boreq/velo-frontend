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
        <activity-header :activity="activity"></activity-header>
        <route-map class="map" :route="activity.route"></route-map>
    </div>
</template>
<script lang="ts" src="./Activity.ts"></script>
<style scoped lang="scss" src="./Activity.scss"></style>
