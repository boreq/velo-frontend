<template>
    <div class="controls">

        <div class="left">
            <div class="artwork">
            </div>
            <div class="name">
                <div class="title">
                    Psycho Killer - 2005 Remaster
                </div>
                <div class="album">
                    Talking Heads
                </div>
            </div>
        </div>

        <div class="center">
            <div class="core">
                <div class="previous">
                    <a>
                        <i class="fas fa-step-backward"></i>
                    </a>
                </div>

                <div class="play">
                    <a>
                        <i class="far fa-play-circle"></i>
                    </a>
                </div>

                <div class="next">
                    <a>
                        <i class="fas fa-step-forward"></i>
                    </a>
                </div>
            </div>

            <div class="progress">
                <div class="current">
                    3:57
                </div>

                <div class="bar">
                    <progress-bar></progress-bar>
                </div>

                <div class="remaining">
                    6:05
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
                    <progress-bar></progress-bar>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./Controls.ts"></script>
<style scoped lang="scss" src="./Controls.scss"></style>
