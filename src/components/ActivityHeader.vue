<template>
    <div class="activity-header">
        <div class="avatar">
            <router-link :to="profileLink">
                <i class="far fa-user-circle"></i>
            </router-link>
        </div>

        <div class="author">
            <router-link :to="profileLink">
                {{ activity.user.displayName }}
            </router-link>
        </div>

        <div class="visibility">
            <i :class="visibilityIcon" v-tooltip="visibilityLabel"></i>
        </div>

        <a class="date">
            <router-link :to="profileLink">
                <time v-tooltip="'Activity started on ' + activity.timeStarted + ' and ended on ' +  activity.timeEnded + '.'">
                    <timeago :datetime="activity.timeStarted"></timeago>
                </time>
            </router-link>
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
