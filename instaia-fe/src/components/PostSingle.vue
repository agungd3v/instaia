<script setup>
import Smile from '@/assets/icons/Smile.vue'
import ActivityIcon from '@/assets/icons/ActivityIcon.vue'
import ActivitySolidIcon from '@/assets/icons/ActivitySolidIcon.vue'
import CommentIcon from '@/assets/icons/CommentIcon.vue'
import ShareIcon from '@/assets/icons/ShareIcon.vue'
</script>

<template>
    <div v-for="(post, index) in postsData" :key="index" class="bg-white border rounded mb-2 overflow-hidden">
        <div class="p-2 flex items-center">
            <div class="flex items-center grow gap-2">
                <div class="w-11 h-11 rounded-full overflow-hidden border-2">
                    <img :src="post.user.photo" :alt="post.user.name" class="w-11 h-11 object-cover rounded-full" />
                </div>
                <span class="text-sm font-semibold">{{ post.user.name }}</span>
            </div>
            <div></div>
        </div>
        <div class="w-full overflow-hidden">
            <img :src="post.content.media" class="w-full object-cover" />
        </div>
        <div class="py-3">
            <div class="px-4">
                <div class="mb-2">
                    <div class="flex items-center gap-3 grow">
                        <ActivitySolidIcon
                            class="cursor-pointer"
                            :width="26"
                            :height="26"
                            v-if="post.content.like && post.content.like.length > 0"
                        />
                        <ActivityIcon
                            class="cursor-pointer"
                            @click="giftLove(post.content.id)"
                            :width="26"
                            :height="26"
                            v-else
                        />
                        <CommentIcon class="cursor-pointer" :width="24" :height="24" />
                        <ShareIcon class="cursor-pointer" :width="24" :height="24" />
                    </div>
                </div>
                <div class="font-semibold">{{ post.content.likes }} likes</div>
                <div class="mt-1">
                    <span class="font-semibold mr-2">{{ post.user.name }}</span>
                    <span v-html="showMore(post.content.description)"></span>
                    <span
                        class="ml-1 text-sm text-gray-400 cursor-pointer"
                        @click="postExpand = true"
                        v-if="!postExpand"
                    >
                        lebih banyak
                    </span>
                    <div v-if="postExpand">
                        <span class="text-sm text-gray-400 cursor-pointer" @click="postExpand = false">Lebih sedikit</span>
                    </div>
                </div>
            </div>
            <hr class="my-3">
            <div class="px-4">
                <div class="flex items-center gap-3">
                    <Smile class="cursor-pointer" @click="openEmoji" />
                    <textarea
                        class="w-full resize-none overflow-y-hidden"
                        placeholder="Tambahkan komentar"
                        style="height: 24px"
                        v-model="comment"
                        ref="comment"
                        @keydown="autoHeight"
                    ></textarea>
                    <span class="font-semibold" :class="comment ? 'text-sky-500' : 'text-sky-200'">Post</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['posts'],
    data() {
        return {
            postExpand: false,
            comment: '',
        }
    },
    watch: {
        comment(value) {
            return value.trim()
        }
    },
    computed: {
        postsData() {
            return [...this.posts]
        }
    },
    methods: {
        showMore(text) {
            if (this.postExpand) {
                return text
            }
            return text.slice(0, 100) + '...'
        },
        openEmoji() {
            console.log('ok')
        },
        autoHeight(event) {
            const keyCode = event.keyCode || event.which
            if (keyCode === 13 || keyCode.which === 13) {
                event.preventDefault()
                return false
            } else {
                const commentBox = this.$refs.comment[0]
                commentBox.style.height = '24px'
                commentBox.style.height = commentBox.scrollHeight + 'px'
            }
        },
        async giftLove(post) {
            this.$emit('postlike', post)
            try {
                const http = await this.$axios.post('/postlike', { postid: post })
                if (http.status) {
                    console.log(http.data)
                }
            } catch (error) {
                console.log(error)
            }
        },
        leaveAComment() {
            // 
        }
    }
}
</script>