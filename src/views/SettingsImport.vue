<template>
    <div class="settings-import">
        <settings-page name="import">
            <sub-header text="Import from Strava"></sub-header>

            In order to import your personal data from Strava please follow the following steps:

            <ol>
                <li>
                    Navigate to
                    "<a href="https://www.strava.com/athlete/delete_your_account">Account Download and Deletion</a>"
                    in your Strava settings.
                </li>
                <li>
                    Follow the instructions specified in the section "Download Request".
                </li>
                <li>
                    Upload the resulting archive containing your personal data below.
                </li>
            </ol>


            Uploading your archive will only import your activities. For each
            activity this tool will import its title and route. The visibility
            of the imported activities will be set to "private".

            <form>
                <file-upload @file="onFile"></file-upload>
                <app-button text="Import" @click="submit" :disabled="!formValid"
                    :working="working"></app-button>
            </form>
        </settings-page>
    </div>
</template>
<script lang="ts" src="./SettingsImport.ts"></script>
<style scoped lang="scss" src="./SettingsImport.scss"></style>
