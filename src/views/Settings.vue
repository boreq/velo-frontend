<template>
    <div class="settings">
        <main-header text="Settings"></main-header>

        <sub-header text="Invitations"></sub-header>
        <Invitations v-if="user && user.administrator"></Invitations>

        <sub-header text="Users"></sub-header>
        <Users v-if="user && user.administrator"></Users>

        <sub-header text="Connected instances"></sub-header>
    </div>
</template>
<script lang="ts" src="./Settings.ts"></script>
<style scoped lang="scss" src="./Settings.scss"></style>
