<template>
    <div class="bg-white border rounded py-5 relative">
        <Carousel :settings="settings" :breakpoints="breakpoints" ref="reels" v-model="currentReel">
            <Slide v-for="slide in 10" :key="slide">
                <div class="w-full h-full flex items-center justify-center">
                    <div class="w-14 h-14 border rounded-full overflow-hidden border-sky-400" style="border-width: 3px">
                        <img v-show="imageLoaded" :src="image" :alt="slide" class="w-14 h-14 object-cover" @load="checkImage">
                    </div>
                </div>
            </Slide>
        </Carousel>
        <div class="absolute inset-y-0 left-3 flex items-center" v-if="currentReel > 0">
            <button
                class="bg-white w-7 h-7 rounded-full flex justify-center items-center left-0"
                @click="prev"
            >
                <ArrowLeft />
            </button>
        </div>
        <div class="absolute inset-y-0 right-3 flex items-center">
            <button
                class="bg-white w-7 h-7 rounded-full flex justify-center items-center right-0"
                @click.prevent="next"
            >
                <ArrowRight />
            </button>
        </div>
    </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import ArrowLeft from '@/assets/icons/ArrowLeft.vue'
import ArrowRight from '@/assets/icons/ArrowRight.vue'
export default {
    components: {
        Carousel,
        Slide,
        ArrowLeft,
        ArrowRight
    },
    data() {
        return {
            image: null,
            imageLoaded: false,
            currentReel: 0,
            settings: {
                itemsToShow: 1,
                snapAlign: 'center',
            },
            breakpoints: {
                // 700px and up
                700: {
                    itemsToShow: 4,
                    snapAlign: 'center',
                },
                // 1024 and up
                1024: {
                    itemsToShow: 8,
                    snapAlign: 'start',
                },
            }
        }
    },
    mounted() {
        this.fetchImage()
    },
    methods: {
        next() {
            this.$refs.reels.next()
        },
        prev(param) {
            console.log(param)
            this.$refs.reels.prev()
        },
        fetchImage() {
            fetch('https://source.unsplash.com/random')
                .then(data => {
                    this.image = data.url
                })
                .catch(err => console.log(err))
        },
        checkImage() {
            this.imageLoaded = true
        }
    }
}
</script>