<template>
    <div class="activity-settings">
        <main-header text="Activity settings">
            <main-header-actions v-if="activity">
                <main-header-action>
                    <router-link :to="activityLocation">
                        Back
                    </router-link>
                </main-header-action>
            </main-header-actions>
        </main-header>

        This is the activity settings view. It will allow the user to edit an
        activity or remove it.
    </div>
</template>
<script lang="ts" src="./ActivitySettings.ts"></script>
<style scoped lang="scss" src="./ActivitySettings.scss"></style>
