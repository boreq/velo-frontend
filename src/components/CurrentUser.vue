<template>
    <div class="current-user">
        <div class="button" v-if="loading">
            <spinner></spinner>
        </div>
        <a class="button" v-if="!loading && user" v-tooltip="'You are signed in as '+ user.username + '.'" @click="settings">
            <span>
                <i class="far fa-user-circle"></i>
            </span>
            <span>
                {{ user.username }}
            </span>
            <i class="fas fa-caret-down"></i>
        </a>

        <ul v-if="!loading && !user">
            <li>
                <a @click="login">
                    Sign in
                </a>
            </li>
            <li>
                <a @click="register">
                    Sign up
                </a>
            </li>
        </ul>
    </div>
</template>
<script lang="ts" src="./CurrentUser.ts"></script>
<style scoped lang="scss" src="./CurrentUser.scss"></style>
