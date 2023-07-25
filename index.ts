import { app } from './app'

const port = 3000

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`server is running on port ${port}`)
  })
