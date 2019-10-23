<template>
    <div class="thumbnail" v-if="album.thumbnail">
        <img :src="thumbnailUrl" @error="onError" @load="onLoad" ref="image">
        <div class="spinner-container" v-if="converting" v-tooltip="'This thumbnail has not been converted yet.'">
            <spinner></spinner>
        </div>
    </div>
</template>
<script lang="ts" src="./Thumbnail.ts"></script>
<style scoped lang="scss" src="./Thumbnail.scss"></style>
