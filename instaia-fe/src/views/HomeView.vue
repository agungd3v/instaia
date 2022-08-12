<script setup>
import Header from '@/components/Header.vue'
import Reels from '@/components/Reels.vue'
</script>

<template>
  <Header />
  <div class="flex justify-center">
    <div class="w-7/12 mt-5">
      <div class="grid grid-flow-row-dense grid-cols-3 gap-5">
        <div class="col-span-2">
          <Reels />
        </div>
        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, eaque?</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
