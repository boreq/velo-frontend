<template>
    <div class="search-input">
        <div class="icon">
            <i class="fas fa-search"></i>
        </div>
        <input type="text" placeholder="Search"
               :value="value" @input="$emit('input', $event.target.value)">
    </div>
</template>
<script lang="ts" src="./SearchInput.ts"></script>
<style scoped lang="scss" src="./SearchInput.scss"></style>
