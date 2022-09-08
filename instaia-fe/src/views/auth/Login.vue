<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen gap-3">
        <div class="w-80 border py-5 px-8 rounded bg-white">
            <p class="text-center text-2xl font-bold">Instaia</p>
            <div class="mt-7">
                <form @submit.prevent="handleSubmit">
                    <div class="mb-2 text-center">
                        <input
                            type="text"
                            class="border w-full p-2 text-xs outline-none rounded bg-neutral-100 focus:bg-white"
                            placeholder="Phone number, username, or email"
                            autocomplete="off"
                            v-model="username"
                        >
                    </div>
                    <div class="mb-4 text-center">
                        <input
                            type="password"
                            class="border w-full p-2 text-xs outline-none rounded bg-neutral-100 focus:bg-white"
                            placeholder="Password"
                            v-model="password"
                        >
                    </div>
                    <div class="text-center">
                        <button
                            class="outline-none text-sm bg-sky-400 font-semibold text-white w-full h-10 rounded disabled:opacity-75"
                            :disabled="!username || !password"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div class="w-80 border py-5 px-8 rounded bg-white">
            <div class="text-center">
                <span class="text-xs">Don't have an account?</span>
                <RouterLink to="/register" class="text-xs font-semibold text-sky-400"> Sign Up</RouterLink>
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
            username: null,
            password: null
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    methods: {
        async handleSubmit() {
            try {
                const http = await this.$axios.post('/signin', {
                    email: this.username,
                    password: this.password
                })
                if (http) {
                    localStorage.setItem('instaia', JSON.stringify({ user: http.data.user, token: http.data.token }))
                    this.userStore.setUser(http.data.user)
                    this.userStore.setToken(http.data.token)

                    return this.$router.replace({ path: '/' })
                }
            } catch (error) {
                return this.$error(error.message)
            }
        }
    }
}
</script>
