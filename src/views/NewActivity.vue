<template>
    <div class="new-activity">
        <main-header text="New activity"></main-header>

        <div class="center">
            <form>
                <div class="title-row">
                    <form-input type="text" placeholder="Title" icon="fas fa-pen" v-model="request.title" maxlength="50"></form-input>
                    <form-radio :values="visibilityValues" v-model="request.visibility"></form-radio>
                </div>
                <file-upload @file="onFile"></file-upload>
                <app-button text="Save" @click="submit" :disabled="!formValid" :working="working"></app-button>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./NewActivity.ts"></script>
<style scoped lang="scss" src="./NewActivity.scss"></style>
