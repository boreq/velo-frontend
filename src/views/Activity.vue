<template>
    <div class="activity">
        <div class="header">
            <div class="left">
            </div>
            <div class="center wrapper">
                <activity-header :activity="activity" v-if="activity"></activity-header>
            </div>
            <div class="right">
                <main-header-actions v-if="activity">
                    <main-header-action v-if="canEditActivity">
                        <router-link :to="activitySettingsLocation">
                            Edit
                        </router-link>
                    </main-header-action>
                </main-header-actions>
            </div>
        </div>

        <div class="route-container">
            <div class="route-wrapper" ref="route-wrapper">
                <div class="map-wrapper">
                    <route-map class="map" :route="activity.route" :highlightIndex="highlightIndex" v-if="activity"></route-map>
                    <div class="overlay">
                        <a class="overlay-button" @click="toggleAnalysis">
                            <i :class="toggleAnalysisIcon"></i>
                            <span class="label">Analysis</span>
                            <i :class="toggleAnalysisIcon"></i>
                        </a>
                    </div>
                </div>

                <div class="analysis" v-if="showAnalysis && activity">
                    <h2 class="section-header">Altitude</h2>
                    <analysis-altitude :activity="activity" :highlightIndex="highlightIndex" @index="onIndex"></analysis-altitude>

                    <h2 class="section-header">Speed</h2>
                    <analysis-speed :activity="activity" :highlightIndex="highlightIndex" @index="onIndex"></analysis-speed>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./Activity.ts"></script>
<style scoped lang="scss" src="./Activity.scss"></style>
