<template>
    <div class="browse">
        <div class="wrapper">
            <div class="topbar">
                <form-input placeholder="Search" icon="fas fa-search"></form-input>

                <ul class="buttons">
                    <li class="button">
                        <login-button></login-button>
                    </li>
                </ul>
            </div>

            <div class="sidebar">
                <div class="album" v-if="album">
                    <ul class="crumbs">
                        <li>
                            <router-link to="/browse">
                                Eggplant
                            </router-link>
                        </li>
                        <li v-for="parent in album.parents">
                            <router-link :to="parentUrl(parent)">
                                {{ parent.title }}
                            </router-link>
                        </li>
                    </ul>

                    <div class="title">
                        {{ album.title }}
                    </div>

                    <div class="artwork">
                        <thumbnail :album="album"></thumbnail>
                    </div>
                </div>

                <NowPlaying class="now-playing"></NowPlaying>
            </div>

            <div class="content">
                <div v-if="album && album.tracks">
                    <SubHeader text="Tracks"></SubHeader>
                    <Tracks :tracks="album.tracks" :album="album"></Tracks>
                </div>

                <div v-if="album && album.albums">
                    <SubHeader text="Albums"></SubHeader>
                    <Albums :albums="album.albums" @select-album="selectAlbum"></Albums>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./Browse.ts"></script>
<style scoped lang="scss" src="./Browse.scss"></style>
