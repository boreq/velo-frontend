<template>
    <div class="settings-page">
        <div class="wrapper">
            <main-header text="Settings"></main-header>

            <div class="nav-wrapper">
                <div class="nav">
                    <ul>
                        <li :class="{ active: name === 'profile' }">
                            <router-link :to="linkProfile">
                                Profile
                            </router-link>
                        </li>
                        <li :class="{ active: name === 'privacy-zones' }">
                            <router-link :to="linkPrivacyZones">
                                Privacy zones
                            </router-link>
                        </li>
                        <li :class="{ active: name === 'import' }">
                            <router-link :to="linkImport">
                                Import
                            </router-link>
                        </li>
                        <li :class="{ active: name === 'instance' }">
                            <router-link :to="linkInstance">
                                Instance
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="content">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./SettingsPage.ts"></script>
<style scoped lang="scss" src="./SettingsPage.scss"></style>
