<template>
    <div class="activity">
        <main-header text="Activity"></main-header>

        <div class="activity-content" v-if="activity">
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

            <div class="date">
                <a>
                    <time v-tooltip="'Activity started on ' + activity.timeStarted + ' and ended on ' +  activity.timeEnded + '.'">
                        <timeago :datetime="activity.timeStarted"></timeago>
                    </time>
                </a>
            </div>

            <ul class="details">
                <li v-tooltip="'Distance.'">
                    12.1 km
                </li>
                <li v-tooltip="'Time moving.'">
                    2.3 h
                </li>
            </ul>

            <route-map class="map" :route="activity.route"></route-map>
        </div>
    </div>
</template>
<script lang="ts" src="./Activity.ts"></script>
<style scoped lang="scss" src="./Activity.scss"></style>
