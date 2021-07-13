<template>
    <div class="new-activity">
        <div class="wrapper">
            <main-header text="New activity"></main-header>

            <form>
                <div class="title-row">
                    <form-input type="text" placeholder="Title" icon="fas fa-pen" v-model="request.title" maxlength="50"></form-input>
                    <form-radio :values="visibilityValues" v-model="request.visibility"></form-radio>
                </div>
                <file-upload @file="onFile"></file-upload>
                <app-button text="Save" @click="submit" :disabled="!formValid" :working="working"></app-button>
            </form>

            <p class="tip">
                Velo supports .gpx and .fit files. If you are experiencing
                issues with uploading your route please <a
                href="https://github.com/boreq/velo/issues">submit an
                issue</a>.
            </p>
        </div>
    </div>
</template>
<script lang="ts" src="./NewActivity.ts"></script>
<style scoped lang="scss" src="./NewActivity.scss"></style>
