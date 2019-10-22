<template>
    <div id="app">
        <div class="content">
            <div class="sidebar">
                <div class="item">
                    <conversion-status></conversion-status>
                </div>
            </div>
            <div class="container">
                <router-view/>
            </div>
        </div>
        <div class="controls">
            <controls :playbackData="playbackData"></controls>
        </div>
        <player @playback-data="onPlaybackData($event)"></player>
    </div>
</template>

<style lang="scss" src="./App.scss"></style>

<script lang="ts" src="./App.ts"></script>
