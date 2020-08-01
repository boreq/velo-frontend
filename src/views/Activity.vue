<template>
    <div class="activity">
        <main-header text="Activity"></main-header>

        <div v-if="activity">
            <route-map :route="activity.route"></route-map>
        </div>
    </div>
</template>
<script lang="ts" src="./Activity.ts"></script>
<style scoped lang="scss" src="./Activity.scss"></style>
