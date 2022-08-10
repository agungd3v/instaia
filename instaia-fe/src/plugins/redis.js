import { createClient } from 'redis'

export default {
    install: (app, options) => {
        app.mixin({
            created() {
                const client = createClient({ url: import.meta.env.REDIS_HOST })
                
                client.on('error', (err) => {
                    console.log('Redis Client Error', err)
                })
            }
        })
    }
}
