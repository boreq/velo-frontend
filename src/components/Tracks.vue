<template>
    <ul class="tracks">
        <li v-for="track, index in tracks" class="track">

            <div class="play" v-if="index != 3">
                <a>
                    <i class="fas fa-play"></i>
                </a>
            </div>

            <div class="play playing" v-if="index == 3">
                <a>
                    <i class="fas fa-play"></i>
                </a>
            </div>

            <div class="title" :title="track.title">
                {{ track.title }}
            </div>

            <div class="duration">
                4:12
            </div>

        </li>
        
    </ul>
</template>
<script lang="ts" src="./Tracks.ts"></script>
<style scoped lang="scss" src="./Tracks.scss"></style>
