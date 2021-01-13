<template>
    <div class="activity-header">
        <div class="avatar">
            <a>
                <i class="far fa-user-circle"></i>
            </a>
        </div>

        <div class="author">
            <a>
                {{ activity.user.displayName }}
            </a>
        </div>

        <div class="visibility">
            <i :class="visibilityIcon" v-tooltip="visibilityLabel"></i>
        </div>

        <a class="date">
            <time v-tooltip="'Activity started on ' + activity.timeStarted + ' and ended on ' +  activity.timeEnded + '.'">
                <timeago :datetime="activity.timeStarted"></timeago>
            </time>
        </a>

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
