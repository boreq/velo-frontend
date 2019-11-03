<template>
    <ul class="notifications">
        <li class="notification" :class="{ hide: shouldHide(notification) }" v-for="notification of notifications" :key="notification.id">
            {{ notification.text }}
        </li>
    </ul>
</template>
<script lang="ts" src="./Notifications.ts"></script>
<style scoped lang="scss" src="./Notifications.scss"></style>
