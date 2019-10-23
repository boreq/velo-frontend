<template>
    <ul class="tracks">
        <li v-for="track in tracks" class="track">
            <div class="play" :class="{ playing: isNowPlaying(track) }">
                <a @click="playTrack(track)">
                    <i class="fas fa-play"></i>
                </a>
            </div>

            <div class="title" :title="track.title">
                {{ track.title }}
            </div>

            <div class="duration">
                <div v-if="!isBeingConverted(track)">
                    {{ formatDuration(track) }}
                </div>
                <div v-if="isBeingConverted(track)">
                    <spinner v-tooltip="'This track has not been converted yet.'"></spinner>
                </div>
            </div>
        </li>
    </ul>
</template>
<script lang="ts" src="./Tracks.ts"></script>
<style scoped lang="scss" src="./Tracks.scss"></style>
