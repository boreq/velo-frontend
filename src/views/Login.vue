<template>
    <div class="login">
        <div class="wrapper">
            <main-header text="Sign in"></main-header>

            <div class="center">
                <form>
                    <form-input type="text" placeholder="Username" icon="fas fa-user"
                                v-model="cmd.username" @submit="submit"></form-input>
                    <form-input type="password" placeholder="Password" icon="fas fa-key"
                                v-model="cmd.password" @submit="submit"></form-input>
                    <app-button text="Sign in" @click="submit" :disabled="!formValid"
                                :working="working"></app-button>
                </form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./Login.ts"></script>
<style scoped lang="scss" src="./Login.scss"></style>
