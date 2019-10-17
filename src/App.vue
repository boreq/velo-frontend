<template>
    <div id="app">
        <div class="content">
            <div class="container">
                <router-view/>
            </div>
        </div>
        <div class="controls">
            <controls></controls>
        </div>
        <player></player>
    </div>
</template>

<style lang="scss" src="./App.scss"></style>

<script lang="ts" src="./App.ts"></script>
