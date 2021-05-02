<template>
    <div class="settings">
        <main-header text="Settings"></main-header>

        <sub-header text="Profile"></sub-header>
        <settings-profile></settings-profile>

        <sub-header text="Privacy zones"></sub-header>
        <settings-privacy-zones></settings-privacy-zones>

        <sub-header text="Invitations"></sub-header>
        <invitations v-if="user && user.administrator"></invitations>

        <sub-header text="Users"></sub-header>
        <users v-if="user && user.administrator"></users>
    </div>
</template>
<script lang="ts" src="./Settings.ts"></script>
<style scoped lang="scss" src="./Settings.scss"></style>
