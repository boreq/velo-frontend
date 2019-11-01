<template>
    <div class="initialize">
        <action-bar>
            <action-bar-button text="Go back to the music" icon="fas fa-arrow-left" @click="goToBrowse"></action-bar-button>
        </action-bar>
        <main-header text="Sign in"></main-header>

        <form>
            <form-input type="text" placeholder="Username" icon="fas fa-user" v-model="cmd.username"></form-input>
            <form-input type="password" placeholder="Password" icon="fas fa-key" v-model="cmd.password"></form-input>
            <app-button text="Proceed" @click="submit" :disabled="!formValid" :working="working"></app-button>
        </form>
    </div>
</template>
<script lang="ts" src="./Login.ts"></script>
<style scoped lang="scss" src="./Login.scss"></style>
