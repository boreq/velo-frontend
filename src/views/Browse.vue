<template>
  <div class="browse">
      <div v-if="album">
          <ul class="crumbs">
              <li>
                  <router-link to="/browse">
                      Eggplant
                  </router-link>
              </li>
              <li v-for="parent, index in album.parents">
                  <router-link :to="parentUrl(parent)">
                      {{ parent.title }}
                  </router-link>
              </li>
          </ul>

          <div class="title">
              {{ album.title }}
          </div>

          <div v-if="album.songs">
              <SubHeader text="Songs"></SubHeader>
              <Songs :songs="album.songs"></Songs>
          </div>

          <div v-if="album.albums">
              <SubHeader text="Albums"></SubHeader>
              <Albums :albums="album.albums" v-on:select-album="selectAlbum($event)"></Albums>
          </div>
      </div>
  </div>
</template>
<script lang="ts" src="./Browse.ts"></script>
<style scoped lang="scss" src="./Browse.scss"></style>
