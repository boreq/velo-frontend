<template>
    <div class="settings-profile">
        <settings-page name="profile">
            <sub-header text="Profile"></sub-header>

            <form class="profile-form area" v-if="cmd">
                <form-input type="text" placeholder="Display name" icon="fas fa-user"
                    maxlength="100" v-model="cmd.displayName"></form-input>
                <app-button text="Save profile" @click="submit" :disabled="!formValid"
                    :working="working"></app-button>
            </form>

            <sub-header text="Change password"></sub-header>

            <change-password></change-password>
        </settings-page>
    </div>
</template>
<script lang="ts" src="./SettingsProfile.ts"></script>
<style scoped lang="scss" src="./SettingsProfile.scss"></style>
