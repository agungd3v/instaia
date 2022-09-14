<script setup>
</script>

<template>
    <div class="flex items-center gap-3">
        <div
            @click="goProfile"
            class="w-14 h-14 border rounded-full overflow-hidden cursor-pointer"
            style="border-width: 3px"
        >
            <img :src="getProfileImage()" class="w-14 h-14 object-cover">
        </div>
        <div class="flex flex-col">
            <span class="text-sm">{{ userStore.user.username }}</span>
            <span class="text-sm text-gray-400 leading-none">{{ userStore.user.name }}</span>
        </div>
    </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '@/store/user'

export default {
    computed: {
        ...mapStores(useUserStore)
    },
    methods: {
        goProfile() {
            return this.$router.push({
                name: 'profile',
                params: {
                    username: this.userStore.user.username
                }
            })
        },
        getProfileImage() {
            if (this.userStore.user.photo) return import.meta.env.VITE_STATIC_ASSET + this.userStore.user.photo
            return '@/assets/default.png'
        }
    }
}
</script>