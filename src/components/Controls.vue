<template>
    <div class="controls">
        <div class="core">
            <div class="shuffle">
                <a>
                    <i class="fas fa-random"></i>
                </a>
            </div>

            <div class="previous">
                <a @click="onPrevious()">
                    <i class="fas fa-backward"></i>
                </a>
            </div>

            <div class="play">
                <a @click="onPlayPause()">
                    <span v-if="paused">Play</span>
                    <span v-if="!paused">Pause</span>
<!--                    <i class="far fa-play-circle" v-if="paused"></i>-->
<!--                    <i class="far fa-pause-circle" v-if="!paused"></i>-->
                </a>
            </div>

            <div class="next">
                <a @click="onNext()">
                    <i class="fas fa-forward"></i>
                </a>
            </div>

            <div class="volume">
                <Volume></Volume>
            </div>
        </div>

        <div class="progress">
            <div class="current">
                {{ currentTime }}
            </div>

            <div class="bar">
                <progress-bar :value="currentTimePercentage" @value-selected="seek"></progress-bar>
            </div>

            <div class="duration">
                {{ duration }}
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./Controls.ts"></script>
<style scoped lang="scss" src="./Controls.scss"></style>
