<template>
    <div>
        <vue-final-modal
            v-model="open"
            classes="flex justify-center items-center"
            content-class="relative flex flex-col max-h-full mx-4 pt-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
        >
            <div class="w-80">
                <div class="flex justify-center items-center mb-5">
                    <ImageIcon :width="50" :height="50" />
                </div>
                <div
                    class="border-t py-2 text-center font-semibold text-sky-500 cursor-pointer select-none"
                    @click="$refs.browse.click()"
                >
                    Browse File
                    <input type="file" ref="browse" class="hidden" @change="changeProfile" />
                </div>
            </div>
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
    props: {
        open: Boolean
    },
    computed: {
        ...mapStores(useUserStore)
    },
    watch: {
        open(bool) {
            if (!bool) return this.$emit('open')
        }
    },
    methods: {
        async changeProfile() {
            try {
                const fileImage = this.$refs.browse.files[0]
                const fd = new FormData()
                fd.append('image', fileImage)
                const store = await this.$axios.post('/avatar', fd)
                if (store.status) {
                    const storage = JSON.parse(localStorage.getItem('instaia'))
                    if (storage) {
                        storage['user'] = store.data
                        localStorage.setItem('instaia', JSON.stringify(storage))
                        this.userStore.setUser(store.data)
                        return this.$emit('open')
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>
</style>