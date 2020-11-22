<template>
    <div id="app">
        <div class="header">
            <div class="container">
                <div class="wrapper">
                    <div class="header">
                        <site-header></site-header>
                    </div>

                    <div class="menu">
                        <main-menu></main-menu>
                    </div>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="container">
                <div class="wrapper">
                    <router-view/>
                </div>
            </div>
        </div>
        <notifications class="notifications"></notifications>
    </div>
</template>

<style lang="scss" src="./App.scss"></style>
<script lang="ts" src="./App.ts"></script>
