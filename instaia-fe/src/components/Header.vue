<script setup>
import { useUserStore } from '@/store/user'
import { RouterLink } from 'vue-router'
import HomeIcon from '@/assets/icons/HomeIcon.vue'
import PostIcon from '@/assets/icons/PostIcon.vue'
import ExploreIcon from '@/assets/icons/ExploreIcon.vue'
import ActivityIcon from '@/assets/icons/ActivityIcon.vue'
import UserBlank from '@/assets/icons/UserBlank.vue'
import ModalPost from './ModalPost.vue'

const userState = useUserStore()
</script>

<template>
    <div class="w-full h-14">
        <div class="h-14 fixed w-full bg-white border-b z-10">
            <div class="h-full flex justify-center">
                <div class="w-8/12 flex items-center justify-between">
                    <RouterLink to="/" class="font-semibold text-2xl leading-none">Instaia</RouterLink>
                    <div class="flex gap-6 items-center">
                        <RouterLink to="/">
                            <HomeIcon />
                        </RouterLink>
                        <div class="cursor-pointer" @click="openWritePost = true">
                            <PostIcon />
                        </div>
                        <RouterLink to="/">
                            <ExploreIcon />
                        </RouterLink>
                        <div class="cursor-pointer">
                            <ActivityIcon :width="22" :height="22" />
                        </div>
                        <div class="cursor-pointer">
                            <UserBlank v-if="userState.user.photo" />
                            <div v-else class="rounded-full" style="width: 26px; height: 26px">
                                <img src="https://avatars.githubusercontent.com/u/63272845?v=4" class="object-cover rounded-full">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ModalPost :open="openWritePost" @open="openWritePost = false" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            openWritePost: false
        }
    }
}
</script>