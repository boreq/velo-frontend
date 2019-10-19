<template>
    <div class="controls">

        <div class="left">
            <div class="artwork" v-if="nowPlaying">
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

        <div class="center">
            <div class="core">
                <div class="previous">
                    <a @click="onPrevious()">
                        <i class="fas fa-step-backward"></i>
                    </a>
                </div>

                <div class="play">
                    <a @click="onPlayPause()">
                        <i class="far fa-play-circle" v-if="paused"></i>
                        <i class="far fa-pause-circle" v-if="!paused"></i>
                    </a>
                </div>

                <div class="next">
                    <a @click="onNext()">
                        <i class="fas fa-step-forward"></i>
                    </a>
                </div>
            </div>

            <div class="progress">
                <div class="current">
                    {{ currentTime }}
                </div>

                <div class="bar">
                    <progress-bar :value="currentTimePercentage" @value-selected="seek($event)"></progress-bar>
                </div>

                <div class="duration">
                    {{ duration }}
                </div>
            </div>
        </div>

        <div class="right">
            <div class="volume">
                <div class="mute">
                    <a>
                        <i class="fas fa-volume-up"></i>
                    </a>
                </div>
                <div class="bar">
                    <progress-bar :value="volume" @value-selected="changeVolume($event)"></progress-bar>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./Controls.ts"></script>
<style scoped lang="scss" src="./Controls.scss"></style>
