<template>
    <div class="file-upload" :class="{dragging: isDragging}">

        <span class="call-to-action-drop" v-if="isDragging">
            <i class="fas fa-file-upload"></i>
            Drop the file!
        </span>

        <span class="call-to-action" v-else-if="!selectedFile">
            <i class="fas fa-file-upload"></i>
            Drop a file or click to select it
        </span>

        <span class="selected-file" v-else>
            <i class="fas fa-file-upload"></i>
            {{ selectedFile.name }}
        </span>

        <div class="drop-zone" @dragover="onDragover"
             @dragenter="onDragenter" @dragleave="onDragleave" @dragend="onDragend"
             @drop="onDrop" @click="onClick"></div>

        <input type="file" ref="input" @change="onFileSelect">
    </div>
</template>
<script lang="ts" src="./FileUpload.ts"></script>
<style scoped lang="scss" src="./FileUpload.scss"></style>
