<template>
    <div class="main-menu">
        <ul>
            <li class="element-nav">
                <ul class="nav">
                    <li v-if="user">
                        <router-link :to="{name: 'new-activity'}">
                            New activity
                        </router-link>
                    </li>

                    <li v-if="user">
                        <router-link :to="{name: 'profile', params: {username: user.username}}">
                            Profile
                        </router-link>
                    </li>

                </ul>
            </li>
            <li>
                <current-user></current-user>
            </li>
        </ul>
    </div>
</template>
<script lang="ts" src="./MainMenu.ts"></script>
<style scoped lang="scss" src="./MainMenu.scss"></style>
