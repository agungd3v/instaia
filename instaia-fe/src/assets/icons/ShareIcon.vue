<template>
    <svg fill="none" :width="width" :height="height" viewBox="0 0 22 22">
        <line fill="none" stroke="#160042" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
        <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="#160042" stroke-linejoin="round" stroke-width="2"></polygon>
    </svg>
</template>

<script>
export default {
    props: ['width', 'height']
}
</script>