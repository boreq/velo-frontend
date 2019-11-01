<template>
    <div class="login-button">
        <div class="button" v-if="loading">
            <spinner></spinner>
        </div>
        <a class="button" v-if="!loading && user" v-tooltip="'You are logged in as '+ user.username + '.'" @click="settings">
            <i class="fas fa-user-check"></i>
        </a>
        <a class="button" v-if="!loading && !user" v-tooltip="'You are not logged in.'" @click="login">
            <i class="fas fa-user-times"></i>
        </a>
    </div>
</template>
<script lang="ts" src="./LoginButton.ts"></script>
<style scoped lang="scss" src="./LoginButton.scss"></style>
