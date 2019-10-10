<template>
    <ul class="songs">
        <li v-for="index in 10" class="song">

            <div class="play" v-if="index != 3">
                <a>
                    <i class="fas fa-play"></i>
                </a>
            </div>

            <div class="play playing" v-if="index == 3">
                <a>
                    <i class="fas fa-play"></i>
                </a>
            </div>

            <div class="title">
                Calling Occupants Of Interplanetary Craft
            </div>

            <div class="duration">
                4:12
            </div>

        </li>
        
    </ul>
</template>
<script lang="ts" src="./Songs.ts"></script>
<style scoped lang="scss" src="./Songs.scss"></style>
