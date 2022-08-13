<script setup>
import { useUserStore } from '@/store/user'

const userState = useUserStore()
</script>

<template>
    <div class="flex items-center gap-3">
        <div class="w-14 h-14 border rounded-full overflow-hidden" style="border-width: 3px">
            <img src="https://avatars.githubusercontent.com/u/63272845?v=4" class="w-14 h-14 object-cover">
        </div>
        <div class="flex flex-col">
            <span class="text-sm">{{ userState.user.username }}</span>
            <span class="text-sm text-gray-400 leading-none">{{ userState.user.name }}</span>
        </div>
    </div>
</template>