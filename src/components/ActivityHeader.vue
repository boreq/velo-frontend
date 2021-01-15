<template>
    <div class="activity-header">
        <router-link :to="profileLink" class="avatar">
            <i class="far fa-user-circle"></i>
        </router-link>

        <router-link :to="profileLink" class="author">
            {{ activity.user.displayName }}
        </router-link>

        <div class="visibility">
            <i :class="visibilityIcon" v-tooltip="visibilityLabel"></i>
        </div>

        <router-link :to="activityLink" class="date">
            <time v-tooltip="'Activity started on ' + activity.timeStarted + ' and ended on ' +  activity.timeEnded + '.'">
                <timeago :datetime="activity.timeStarted"></timeago>
            </time>
        </router-link>

        <ul class="details">
            <li v-tooltip="'Distance.'">
                12.1 km
            </li>
            <li v-tooltip="'Time moving.'">
                2.3 h
            </li>
        </ul>
    </div>
</template>
<script lang="ts" src="./ActivityHeader.ts"></script>
<style scoped lang="scss" src="./ActivityHeader.scss"></style>
