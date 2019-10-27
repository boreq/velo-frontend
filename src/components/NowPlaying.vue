<template>
    <div class="now-playing" v-if="nowPlaying">
        <div class="artwork">
            <a @click="goToNowPlayingAlbum()">
                <thumbnail :album="nowPlaying.album"></thumbnail>
            </a>
        </div>
        <div class="title">
            <div class="trackTitle">
                <a @click="goToNowPlayingSong()">
                    {{ trackTitle }}
                </a>
            </div>
            <div class="albumTitle">
                <a @click="goToNowPlayingAlbum()">
                    {{ albumTitle }}
                </a>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./NowPlaying.ts"></script>
<style scoped lang="scss" src="./NowPlaying.scss"></style>
