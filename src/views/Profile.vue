<template>
    <div class="profile">
        <div class="loading" v-if="!user">
            <div class="fake-content">
                <div class="picture">
                    <i class="far fa-user-circle"></i>
                </div>
                <h1>John Smith</h1>
                <h2>@user</h2>
            </div>
        </div>

        <div v-else>
            <div class="picture">
                <i class="far fa-user-circle"></i>
            </div>
            <h1>{{user.displayName}}</h1>
            <h2>@{{user.username}}</h2>

        </div>

        <div v-if="!activities">
            <spinner></spinner>
        </div>
        <div v-else>
            <activity-previews :activities="activities.activities"></activity-previews>
            <pagination></pagination>
        </div>
    </div>
</template>
<script lang="ts" src="./Profile.ts"></script>
<style scoped lang="scss" src="./Profile.scss"></style>
