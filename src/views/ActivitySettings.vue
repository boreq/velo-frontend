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

            <div class="edit area">
                <form v-if="activity">
                    <div class="title-row">
                        <form-input id="title-input" placeholder="Title"
                            :maxlength="maxTitleLength" v-model="request.title"
                            class="action">
                        </form-input>
                        <form-radio :values="visibilityValues"
                            v-model="request.visibility" class="action">
                        </form-radio>
                    </div>

                    <app-button text="Save" @click="submitEdit" :working="workingEdit"></app-button>
                </form>

                <spinner v-if="!activity"></spinner>
            </div>

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
