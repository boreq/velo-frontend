<template>
    <div class="initialize">
        <main-header text="Login"></main-header>

        <form>
            <form-input type="text" placeholder="Username" v-model="cmd.username"></form-input>
            <form-input type="password" placeholder="Password" v-model="cmd.password"></form-input>
            <app-button text="Proceed" @click="submit" :disabled="!formValid"></app-button>
        </form>
    </div>
</template>
<script lang="ts" src="./Login.ts"></script>
<style scoped lang="scss" src="./Login.scss"></style>
