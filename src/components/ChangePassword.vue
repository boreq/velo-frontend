<template>
    <div class="change-password">
        <form class="area">
            <form-input type="password" placeholder="Old password" icon="fas fa-lock"
                v-model="cmd.oldPassword" @submit="submit"></form-input>

            <form-input type="password" placeholder="New password" icon="fas fa-lock"
                v-model="cmd.newPassword" @submit="submit"></form-input>

            <form-input type="password" placeholder="Confirm new password" icon="fas fa-lock"
                v-model="confirmPassword" @submit="submit"></form-input>

            <app-button text="Change password" @click="submit" :disabled="!formValid"
                :working="working"></app-button>
        </form>
    </div>
</template>
<script lang="ts" src="./ChangePassword.ts"></script>
<style scoped lang="scss" src="./ChangePassword.scss"></style>
