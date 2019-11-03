<template>
    <div id="app">
        <div class="content">
            <div class="wrapper">
                <div class="container">
                    <router-view/>
                </div>
            </div>
        </div>
        <div class="controls">
            <controls :playbackData="playbackData"></controls>
        </div>
        <player @playback-data="onPlaybackData($event)"></player>
        <notifications class="notifications"></notifications>
        <conversion-status class="conversion-status"></conversion-status>
    </div>
</template>

<style lang="scss" src="./App.scss"></style>

<script lang="ts" src="./App.ts"></script>
