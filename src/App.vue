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
    </div>
</template>

<style lang="scss">
    html, body {
        margin: 0;
        padding: 0;
    }

    html {
        font-family: 'Roboto', sans-serif;
        font-size: 12px;
    }

    #app {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        flex-flow: column;

        .content {
            flex: 1;
            overflow: auto;
        }

        .controls {
        }
    }

</style>

<script lang="ts" src="./App.ts"></script>
