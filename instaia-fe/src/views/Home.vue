<script setup>
import Reels from '@/components/Reels.vue'
import PostSingle from '@/components/PostSingle.vue'
import HomeProfile from '@/components/HomeProfile.vue'
</script>

<template>
  <div class="flex justify-center">
    <div class="w-7/12 mt-5">
      <div class="grid grid-flow-row-dense grid-cols-3 gap-5">
        <div class="col-span-2">
          <Reels />
          <div class="mt-4">
            <PostSingle :posts="postData" />
          </div>
        </div>
        <div>
          <HomeProfile />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postData: [
        {
          user: {
            name: 'Agung Ardiyanto',
            photo: 'https://avatars.githubusercontent.com/u/63272845?v=4'
          },
          content: {
            media: 'https://asset.kompas.com/crops/-8_skPad__EKu4DpDs6TSFNWi3c=/0x0:1000x667/750x500/data/photo/2019/12/18/5df9e59f4c8b0.jpg',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit excepturi iste accusamus tenetur molestiae. Minus officiis odit dicta consectetur autem.',
            likes: 10
          },
        },
        {
          user: {
            name: 'Agung Ardiyanto',
            photo: 'https://avatars.githubusercontent.com/u/63272845?v=4'
          },
          content: {
            media: 'https://asset.kompas.com/crops/-8_skPad__EKu4DpDs6TSFNWi3c=/0x0:1000x667/750x500/data/photo/2019/12/18/5df9e59f4c8b0.jpg',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit excepturi iste accusamus tenetur molestiae. Minus officiis odit dicta consectetur autem.',
            likes: 10
          },
        }
      ]
    }
  }
}
</script>
