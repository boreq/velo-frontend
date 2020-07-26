<template>
    <div class="new-activity">
        <main-header text="New activity"></main-header>

        <div class="center">
            <form>
                <form-input type="text" placeholder="Title" icon="fas fa-pen"></form-input>
                <file-upload></file-upload>
                <app-button text="Save" @click="submit" :disabled="!formValid" :working="working"></app-button>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./NewActivity.ts"></script>
<style scoped lang="scss" src="./NewActivity.scss"></style>
