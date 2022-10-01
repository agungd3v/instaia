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
            <PostSingle :posts="postData" @postlike="replaceLikes" />
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
import { mapStores } from 'pinia'
import { useUserStore } from '@/store/user'

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
            id: 1,
            media: 'https://asset.kompas.com/crops/-8_skPad__EKu4DpDs6TSFNWi3c=/0x0:1000x667/750x500/data/photo/2019/12/18/5df9e59f4c8b0.jpg',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit excepturi iste accusamus tenetur molestiae. Minus officiis odit dicta consectetur autem.',
            likes: 10
          },
        }
      ]
    }
  },
  computed: {
    ...mapStores(useUserStore),
  },
  mounted() {
    this.fetchPost()
  },
  methods: {
    async fetchPost() {
      try {
        const http = await this.$axios.get('/post')
        if (http.status && http.data.length > 0) {
          this.postData = http.data.map(data => {
            return {
              user: {
                name: data.user.name,
                photo: data.user.photo ? import.meta.env.VITE_STATIC_ASSET + data.user.photo : '/default.png'
              },
              content: {
                id: data.id,
                media: import.meta.env.VITE_STATIC_ASSET + data.content,
                description: data.description,
                likes: data.likes.length,
                like: data.likes.map(dlike => {
                  if (dlike.username == this.userStore.user.username) return {
                    id: dlike.id,
                    username: dlike.username,
                    name: dlike.name,
                    photo: dlike.photo
                  }
                }).filter(Boolean)
              }
            }
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    replaceLikes(post) {
      return this.postData.map(data => {
        if (data.content.id == post) {
          data.content.like.push({
              id: this.userStore.user.id,
              username: this.userStore.user.username,
              name: this.userStore.user.name,
              photo: this.userStore.user.photo
          })
          data.content.likes += 1
        }
      })
    }
  }
}
</script>
