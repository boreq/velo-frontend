<template>
    <div class="current-user">
        <div v-if="loading">
            <spinner></spinner>
        </div>

        <dropdown v-if="!loading && user" @click="settings" ref="dropdown">
            <template v-slot:trigger>
                <span>
                    <i class="far fa-user-circle"></i>
                </span>
                <span>
                    {{ user.username }}
                </span>
                <i class="fas fa-caret-down"></i>
            </template>
            <template v-slot:content>
                <dropdown-element>
                    <router-link class="menu-element" :to="toProfile" @click.native="dropdown.close">
                        You are signed in as {{ user.username }}.
                    </router-link>
                </dropdown-element>

                <dropdown-divider></dropdown-divider>

                <dropdown-element>
                    <router-link class="menu-element highlight" :to="toSettings" @click.native="dropdown.close">
                        Settings
                    </router-link>
                </dropdown-element>
                <dropdown-element>
                    <a class="menu-element highlight">
                        Sign out
                    </a>
                </dropdown-element>
            </template>
        </dropdown>

        <ul v-if="!loading && !user">
            <li>
                <a @click="login">
                    Sign in
                </a>
            </li>
            <li>
                <a @click="register">
                    Sign up
                </a>
            </li>
        </ul>
    </div>
</template>
<script lang="ts" src="./CurrentUser.ts"></script>
<style scoped lang="scss" src="./CurrentUser.scss"></style>
