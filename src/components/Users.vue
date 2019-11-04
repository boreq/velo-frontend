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
            <th class="last-seen">
                Last Seen
            </th>
            <th class="actions">
                Actions
            </th>
            </thead>
            <tbody>
            <tr class="user" v-for="user in users">
                <td class="username">
                    {{ user.username }}
                </td>

                <td class="role">
                    <span v-if="user.administrator">Administrator</span>
                    <span v-if="!user.administrator">User</span>
                </td>

                <td class="last-seen">
                    2 days ago
                </td>

                <td class="actions">
                    <i class="fas fa-times"></i>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts" src="./Users.ts"></script>
<style scoped lang="scss" src="./Users.scss"></style>
