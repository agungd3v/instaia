<template>
  <div class="flex justify-center">
    <div class="w-7/12 mt-5">
      <div class="mb-8 flex justify-center items-center">
        <div
          class="w-48 h-48 rounded-full border-4 border-white overflow-hidden cursor-pointer"
          @click="openChangeProfile = true"
        >
          <img src="https://avatars.githubusercontent.com/u/63272845?v=4" class="w-48 h-48 object-cover" />
        </div>
      </div>
      <div class="mb-8 flex items-center justify-center gap-16">
        <div class="flex flex-col items-center">
          <span>Followers</span>
          <span class="font-semibold">100k</span>
        </div>
        <div class="flex flex-col items-center">
          <span>Posts</span>
          <span class="font-semibold">92</span>
        </div>
        <div class="flex flex-col items-center">
          <span>Following</span>
          <span class="font-semibold">1.200</span>
        </div>
      </div>
      <hr>
      <div class="flex items-center justify-center gap-3">
        <div
          class="p-3"
          :class="posts ? 'border-t-2 border-gray-900' : ''"
        >
          <span class="text-xs font-semibold">POSTS</span>
        </div>
        <div
          class="p-3"
          :class="saved ? 'border-t-2 border-gray-900' : ''"
        >
          <span class="text-xs font-semibold">SAVED</span>
        </div>
        <div
          class="p-3"
          :class="tagged? 'border-t-2 border-gray-900' : ''"
        >
          <span class="text-xs font-semibold">TAGGED</span>
        </div>
      </div>
    </div>
  </div>
  <ModalChangePhotoVue :open="openChangeProfile" @open="openChangeProfile = false" />
</template>

<script>
import ModalChangePhotoVue from '@/components/ModalChangePhoto.vue'
export default {
  components: {
    ModalChangePhotoVue
  },
  data() {
    return {
      posts: false,
      saved: false,
      tagged: false,
      openChangeProfile: false
    }
  },
  methods: {}
}
</script>
