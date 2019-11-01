<template>
    <div class="users">
        <table>
            <thead>
            <th class="username">
                Username
            </th>
            <th class="role">
                Role
            </th>
            </thead>
            <tbody>
            <tr class="user" v-for="user in users">
                <td class="username">
                    {{ user.username }}
                </td>

                <td class="role">
                    <span v-if="user.administrator">Administrator</span>
                    <span v-if="!user.administrator">Nobody</span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts" src="./Users.ts"></script>
<style scoped lang="scss" src="./Users.scss"></style>
