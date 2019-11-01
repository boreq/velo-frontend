<template>
    <div class="settings">
        <action-bar>
            <action-bar-button text="Show me the statistics" icon="fas fa-chart-pie"></action-bar-button>
            <action-bar-button text="Sign me out" icon="fas fa-sign-out-alt" @click="logout" :working="logoutInProgress"></action-bar-button>
            <action-bar-button text="Go back to the music" icon="fas fa-arrow-left" @click="goToBrowse"></action-bar-button>
        </action-bar>
        <main-header text="Settings"></main-header>

        <sub-header text="Users"></sub-header>
        <Users v-if="user.administrator"></Users>

        <sub-header text="Invitations"></sub-header>

        <sub-header text="Connected instances"></sub-header>
    </div>
</template>
<script lang="ts" src="./Settings.ts"></script>
<style scoped lang="scss" src="./Settings.scss"></style>
