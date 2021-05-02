<template>
    <div class="settings-instance">
        <settings-page name="instance">
            <sub-header text="Invitations"></sub-header>
            <invitations v-if="user && user.administrator"></invitations>

            <sub-header text="Users"></sub-header>
            <users v-if="user && user.administrator"></users>
        </settings-page>
    </div>
</template>
<script lang="ts" src="./SettingsInstance.ts"></script>
<style scoped lang="scss" src="./SettingsInstance.scss"></style>
