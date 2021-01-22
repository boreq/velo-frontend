<template>
    <div class="activity-settings">
        <main-header text="Activity settings">
            <main-header-actions v-if="activityUUID">
                <main-header-action>
                    <router-link :to="activityLocation">
                        Cancel
                    </router-link>
                </main-header-action>
            </main-header-actions>
        </main-header>

        <form>
            <ul class="area actions">
                <li>
                    <label for="title-input" class="primary">
                        Title
                    </label>
                    <div class="secondary">
                        Name your activity.
                    </div>
                    <form-input id="title-input" placeholder="Title" v-model="activity.title" class="action"></form-input>
                </li>
                <li>
                    <label for="title-input" class="primary">
                        Visibility
                    </label>
                    <div class="secondary">
                        Specify who can see your activity.
                    </div>

                    <form-radio :values="visibilityValues" v-model="activity.visibility" class="action"></form-radio>
                </li>
                <li>
                    <app-button text="Save" ></app-button>
                </li>
            </ul>
        </form>

        <sub-header text="Danger zone"></sub-header>

        <ul class="area actions danger">
            <li>
                <div class="primary">
                    Delete this activity
                </div>
                <div class="secondary">
                    Deleting an activity can not be undone.
                </div>
                <div class="action">
                    <app-button text="Delete this activity" class="danger"></app-button>
                </div>
            </li>
        </ul>
    </div>
</template>
<script lang="ts" src="./ActivitySettings.ts"></script>
<style scoped lang="scss" src="./ActivitySettings.scss"></style>
