<template>
    <div class="albums">
        <a v-for="album in albums" class="album" v-on:click="selectAlbum(album)">
            <div class="image">
                <img src="https://images.genius.com/a1a17ea9516d637a63caa4ce72225b41.1000x1000x1.jpg"></img>
            </div>
            <div class="title">
                {{ album.title }}
            </div>
        </a>
    </div>
</template>
<script lang="ts" src="./Albums.ts"></script>
<style scoped lang="scss" src="./Albums.scss"></style>
