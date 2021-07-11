<template>
    <div class="activity-settings">
        <div class="wrapper">
            <main-header text="Activity settings">
                <main-header-actions v-if="activityUUID">
                    <main-header-action>
                        <router-link :to="activityLocation">
                            Back
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
                        <form-input id="title-input" placeholder="Title"
                            :maxlength="maxTitleLength" v-model="request.title"
                            class="action">
                        </form-input>
                    </li>
                    <li>
                        <label for="title-input" class="primary">
                            Visibility
                        </label>
                        <div class="secondary">
                            Specify who can see your activity.
                        </div>

                        <form-radio :values="visibilityValues"
                            v-model="request.visibility" class="action">
                        </form-radio>
                    </li>
                    <li>
                        <app-button text="Save" @click="submitEdit" :working="workingEdit"></app-button>
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
                        <app-button text="Delete this activity" class="danger"
                            @click="initiateDeletion"></app-button>
                    </div>
                    <div class="below confirm-deletion" v-if="deletionInitiated">
                        <div class="message">
                            Are you sure? You will not be able to recover this activity.
                        </div>
                        <div class="buttons">
                            <app-button text="Confirm" class="danger"
                                :working="workingDelete" @click="submitDelete"></app-button>
                            <app-button text="Cancel" @click="cancelDeletion"></app-button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" src="./ActivitySettings.ts"></script>
<style scoped lang="scss" src="./ActivitySettings.scss"></style>
