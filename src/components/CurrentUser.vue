<template>
    <div class="login-button">
        <div class="button" v-if="loading">
            <spinner></spinner>
        </div>
        <a class="button" v-if="!loading && user" v-tooltip="'You are signed in as '+ user.username + '.'" @click="settings">
            Hello again, {{ user.username  }}!
            <i class="fas fa-user-check"></i>
        </a>
        <a class="button" v-if="!loading && !user" v-tooltip="'You are not signed in.'" @click="login">
            Click here to login.
            <i class="fas fa-user-times"></i>
        </a>
    </div>
</template>
<script lang="ts" src="./CurrentUser.ts"></script>
<style scoped lang="scss" src="./CurrentUser.scss"></style>
