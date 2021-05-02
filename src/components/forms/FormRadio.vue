<template>
    <div class="form-radio">
        <dropdown ref="dropdown">
            <template v-slot:trigger>
                <div class="trigger" v-tooltip="currentSelection.tooltip">
                    <i :class="currentSelection.icon" class="selection"></i>
                    <i class="fas fa-caret-down call-to-action"></i>
                </div>
            </template>
            <template v-slot:content>
                <dropdown-element v-for="entry in values" :key="entry.value">
                    <div @click="select(entry.value)">
                        <a class="dropdown-option">
                            <i :class="entry.icon"></i>
                            {{ entry.label }}
                        </a>
                    </div>
                </dropdown-element>
            </template>
        </dropdown>
    </div>
</template>
<script lang="ts" src="./FormRadio.ts"></script>
<style scoped lang="scss" src="./FormRadio.scss"></style>
