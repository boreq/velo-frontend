<template>
    <div class="activity-preview">
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
                <time v-tooltip="'2020-07-25 12:13:45 UTC'">
                    3 hours ago
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

        <div class="map">
            <route-map :route="activity.route" :lock="true"></route-map>
        </div>
    </div>
</template>
<script lang="ts" src="./ActivityPreview.ts"></script>
<style scoped lang="scss" src="./ActivityPreview.scss"></style>
