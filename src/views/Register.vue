<template>
    <div class="register">
        <main-header text="Sign up"></main-header>

        <div class="center">
            <span v-if="!canAttemptToRegister">
                Registration is operating in invitation-only mode. Contact the
                owner of this instance to register.
            </span>
            <form v-if="canAttemptToRegister">
                <form-input type="text" placeholder="Username" icon="fas fa-user"
                            v-model="cmd.username" @submit="submit"></form-input>
                <form-input type="password" placeholder="Password" icon="fas fa-key"
                            v-model="cmd.password" @submit="submit"></form-input>
                <app-button text="Sign up" @click="submit" :disabled="!formValid"
                            :working="working"></app-button>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./Register.ts"></script>
<style scoped lang="scss" src="./Register.scss"></style>
