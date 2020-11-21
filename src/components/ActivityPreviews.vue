<template>
    <div class="activity-previews">
        <div class="activity" v-for="activity in activities" :key="activity.uuid">
            <activity-preview :activity="activity"></activity-preview>
        </div>
    </div>
</template>
<script lang="ts" src="./ActivityPreviews.ts"></script>
<style scoped lang="scss" src="./ActivityPreviews.scss"></style>
