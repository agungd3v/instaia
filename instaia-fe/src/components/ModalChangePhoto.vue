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
    watch: {
        open(bool) {
            if (!bool) return this.$emit('open')
        }
    },
    methods: {
        changeProfile() {
            const fileImage = this.$refs.browse.files[0]
            console.log(fileImage)
        }
    }
}
</script>

<style scoped>
</style>