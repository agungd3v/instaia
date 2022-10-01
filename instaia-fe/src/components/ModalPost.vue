<template>
    <div>
        <vue-final-modal
            v-model="open"
            classes="flex justify-center items-center"
            content-class="relative flex flex-col max-h-full border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
        >
            <div class="w-auto">
                <div class="text-center py-2 border-b">
                    <span class="font-semibold">Create new post</span>
                </div>
                <div v-if="!wantUpload" class="w-96 flex flex-col justify-center pt-10 pb-14 items-center">
                    <ImageIcon :width="50" :height="50" />
                    <button class="bg-sky-400 rounded px-2 mt-2" @click="$refs.browse.click()">
                        <span class="text-xs text-white font-semibold">Select from computer</span>
                    </button>
                </div>
                <div v-else class="flex" style="width: 800px">
                    <img :src="dumpContent" style="width: 500px">
                    <div class="mt-3 w-full">
                        <div class="px-4">
                            <div class="flex items-center gap-2 mb-4">
                                <img :src="getProfileImage()" class="w-9 h-9 rounded-full">
                                <span class="font-semibold">{{ userStore.user.username }}</span>
                            </div>
                            <textarea
                                class="text-sm w-full resize-none scroll-smooth scrollbar-hidden"
                                placeholder="Write a caption..."
                                rows="8"
                                v-model="write"
                                :maxlength="maxWrite"
                            ></textarea>
                            <div class="flex items-center justify-between">
                                <span></span>
                                <span class="text-xs font-semibold text-gray-400">{{ writeCounter }}/{{ maxWrite }}</span>
                            </div>
                        </div>
                        <div class="border-t mt-2 pt-2 px-3">
                            <div class="flex items-center justify-between">
                                <span></span>
                                <button class="bg-sky-400 rounded py-1 px-4" :disabled="write.length == 0" @click="submitPost">
                                    <span class="text-xs text-white">Share</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <input type="file" ref="browse" class="hidden" @change="showContentUpload">
        </vue-final-modal>
    </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '@/store/user'
import { VueFinalModal } from 'vue-final-modal'
import ImageIcon from '@/assets/icons/ImageIcon.vue'

export default {
    components: {
        VueFinalModal,
        ImageIcon
    },
    data() {
        return {
            wantUpload: false,
            dumpContent: null,
            write: '',
            maxWrite: 500
        }
    },
    props: {
        open: Boolean
    },
    computed: {
        ...mapStores(useUserStore),
        writeCounter() {
            return this.write.length
        }
        
    },
    watch: {
        open(bool) {
            if (!bool) {
                setTimeout(() => {
                    this.wantUpload = false
                    this.dumpContent = null
                }, 1000)
                return this.$emit('open')
            }
        }
    },
    methods: {
        showContentUpload() {
            const fileContent = this.$refs.browse.files[0]
            if (fileContent) {
                const reader = new FileReader()
                reader.onload = evt => {
                    this.dumpContent = evt.target.result
                    this.wantUpload = true
                }
                reader.readAsDataURL(fileContent)
            }
        },
        getProfileImage() {
            if (this.userStore.user.photo) return import.meta.env.VITE_STATIC_ASSET + this.userStore.user.photo
            return '@/assets/default.png'
        },
        async submitPost() {
            // images, description, /post
            try {
                const fd = new FormData()
                fd.append('images', this.$refs.browse.files[0])
                fd.append('description', this.write)

                const http = await this.$axios.post('/post', fd)
                if (http.status) {
                    return this.$emit('open')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>