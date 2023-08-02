import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
// import vue from '@vitejs/plugin-vue'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite config
    plugins: [react()],
    define: {
      PORT: JSON.stringify(env.PORT),
      // Some libraries use the global object, even though it doesn't exist in the browser.
      // Alternatively, we could add `<script>window.global = window;</script>` to index.html.
      // https://github.com/vitejs/vite/discussions/5912
      global: {},
    },
    server: {
      host: 'localhost'
    } 
  }
})


// export default defineConfig(({ command, mode }) => {
//   // Load env file based on `mode` in the current working directory.
//   // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
//   const env = loadEnv(mode, process.cwd(), '')
//   return {
//     // vite config
//     define: {
//       PORT: JSON.stringify(process.env.PORT),
//     },
//   }
// })



// export default ({ mode }) => {
//     process.env = {...process.env, ...loadEnv(mode, process.cwd())};

//     // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
//     // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

//     return defineConfig({
//         plugins: [vue()],

//         server: {
//             host: 'localhost',
//             port: parseInt(process.env.PORT),
//         },
//     });
// }