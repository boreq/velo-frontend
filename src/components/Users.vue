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
            <th class="created">
                Signed Up
            </th>
            <th class="last-seen">
                Last Seen
            </th>
            <th class="actions">
                Actions
            </th>
            </thead>
            <tbody>
            <tr class="user" v-for="user in users" :key="user.username">
                <td class="username">
                    {{ user.username }}
                </td>

                <td class="role">
                    {{ getRole(user) }}
                </td>

                <td class="created">
                    <timeago :datetime="user.created"></timeago>
                </td>

                <td class="last-seen">
                    <timeago :datetime="user.lastSeen"></timeago>
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
