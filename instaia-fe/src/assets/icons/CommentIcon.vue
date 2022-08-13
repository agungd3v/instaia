<template>
    <svg :width="width" :height="height" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.25 9.875V3.25C1.25 2.14543 2.14543 1.25 3.25 1.25H12.75C13.8546 1.25 14.75 2.14543 14.75 3.25V9.25C14.75 10.3546 13.8546 11.25 12.75 11.25H8.75147C8.26702 11.25 7.79904 11.4258 7.43446 11.7448L4 14.75V12.625C4 11.8656 3.38439 11.25 2.625 11.25C1.86561 11.25 1.25 10.6344 1.25 9.875Z" stroke="#160042" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>
</template>

<script>
export default {
    props: ['width', 'height']
}
</script>