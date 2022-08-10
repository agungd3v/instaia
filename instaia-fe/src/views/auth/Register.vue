<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen gap-3">
        <div class="w-80 border py-5 px-8 rounded bg-white">
            <p class="text-center text-2xl font-bold">Instaia</p>
            <div class="text-center test-sm">Sign Up</div>
            <div class="mt-7">
                <form @submit.prevent="handleSubmit">
                    <div class="mb-2 text-center">
                        <input
                            type="text"
                            class="border w-full p-2 text-xs outline-none rounded bg-neutral-100 focus:bg-white"
                            placeholder="Fullname"
                            autocomplete="off"
                            v-model="name"
                        >
                    </div>
                    <div class="mb-2 text-center">
                        <input
                            type="email"
                            class="border w-full p-2 text-xs outline-none rounded bg-neutral-100 focus:bg-white"
                            placeholder="Email"
                            autocomplete="off"
                            v-model="email"
                        >
                    </div>
                    <div class="mb-2 text-center">
                        <input
                            type="text"
                            class="border w-full p-2 text-xs outline-none rounded bg-neutral-100 focus:bg-white"
                            placeholder="Username"
                            autocomplete="off"
                            v-model="username"
                        >
                    </div>
                    <div class="mb-2 text-center">
                        <input
                            type="text"
                            class="border w-full p-2 text-xs outline-none rounded bg-neutral-100 focus:bg-white"
                            placeholder="Phone number"
                            autocomplete="off"
                            v-model="phone"
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
                            :disabled="!username || !password || !name || !email || !phone"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div class="w-80 border py-5 px-8 rounded bg-white">
            <div class="text-center">
                <span class="text-xs">Don't have an account?</span>
                <RouterLink to="/register" class="text-xs font-semibold text-sky-400"> Sign In</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: null,
            email: null,
            username: null,
            phone: null,
            password: null
        }
    },
    methods: {
        async handleSubmit() {
            try {
                const http = await this.$axios.post('/accounts/register', {
                    name: this.name,
                    email: this.email,
                    username: this.username,
                    phone: this.phone,
                    password: this.password
                })
                if (http) {
                    this.$success('Successful registration')
                    return this.$router.replace({ path: '/login' })
                }
            } catch (error) {
                return this.$error(error.message)
            }
        }
    }
}
</script>
