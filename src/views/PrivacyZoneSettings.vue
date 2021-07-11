<template>
    <div class="activity-settings">
        <div class="wrapper">

            <main-header text="Privacy zone settings">
                <main-header-actions>
                    <main-header-action>
                        <router-link :to="privacyZonesLink">
                            Back
                        </router-link>
                    </main-header-action>
                </main-header-actions>
            </main-header>

            <sub-header text="Danger zone"></sub-header>

            <ul class="area actions danger">
                <li>
                    <div class="primary">
                        Delete this privacy zone
                    </div>
                    <div class="secondary">
                        Deleting a privacy zone can not be undone.
                    </div>
                    <div class="action">
                        <app-button text="Delete this privacy zone" class="danger"
                            @click="initiateDeletion"></app-button>
                    </div>
                    <div class="below confirm-deletion" v-if="deletionInitiated">
                        <div class="message">
                            Are you sure? You will not be able to recover this privacy zone.
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
<script lang="ts" src="./PrivacyZoneSettings.ts"></script>
<style scoped lang="scss" src="./PrivacyZoneSettings.scss"></style>
