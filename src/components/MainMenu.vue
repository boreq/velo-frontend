<template>
    <div class="main-menu">
        <current-user></current-user>
        <ul>
            <li>
                <router-link :to="{name: 'new-activity'}">
                    <span class="icon">
                        <i class="fas fa-plus-circle"></i>
                    </span>
                    <span class="label">
                        New activity
                    </span>
                </router-link>
            </li>

            <li v-if="user">
                <router-link :to="{name: 'profile', params: {username: user.username}}">
                    <span class="icon">
                        <i class="fas fa-user-circle"></i>
                    </span>
                    <span class="label">
                        Profile
                    </span>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script lang="ts" src="./MainMenu.ts"></script>
<style scoped lang="scss" src="./MainMenu.scss"></style>
