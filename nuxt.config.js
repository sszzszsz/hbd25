import path from 'path'
// const StylelintPlugin = require('stylelint-webpack-plugin')
import StylelintPlugin from 'stylelint-webpack-plugin'

export default {
  mode: 'universal',
<<<<<<< HEAD
  server: {
    port: 8000, // デフォルト: 3000
    host: '0.0.0.0' // デフォルト: localhost
  },
=======
>>>>>>> remotes/origin/feature-brushup
  /*
   ** Headers of the page
   */
  head: {
    title: '好きなところ100',
    titleTemplate: '',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
<<<<<<< HEAD
        content: 'BIRTHDAY 25th BIRTHDAY'
=======
        content: process.env.npm_package_description || ''
>>>>>>> remotes/origin/feature-brushup
      },
      {
        hid: 'msapplication-TileColor',
        name: 'msapplication-TileColor',
        content: '#bf4040'
      },
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#ffffff'
      }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'mask-icon', href: 'safari-pinned-tab.svg', color: '#bf4040' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/scss/style.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/routerOption.js',
      mode: 'client'
    },
    {
      src: '~/plugins/vue-scrollmagic.js',
      mode: 'client'
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'nuxt-user-agent',
    'nuxt-webfontloader'
  ],
  styleResources: {
    scss: ['~/assets/scss/mixin.scss']
  },
  webfontloader: {
    google: {
      families: ['Sawarabi+Gothic', 'Libre+Baskerville']
    }
  },
  pageTransition: {
<<<<<<< HEAD
    name: 'zoom-out',
=======
    name: 'fade-up',
>>>>>>> remotes/origin/feature-brushup
    mode: 'out-in',
    beforeEnter(el) {
      console.log('Before enter...')
    }
  },
  layoutTransition: {
    name: 'fade-down',
    mode: 'out-in'
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** generate
   */
  generate: {
    routes(callback) {
      const pontPosts = require('./assets/data/point.json')
      const pointRoutes = pontPosts.map((post) => `/point/${post.id}`)
      callback(null, [...pointRoutes])
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // クライアントのバンドルの Webpack 設定のみを拡張する
      if (ctx.isClient && ctx.isDev) {
        // create sourcemaps
        config.devtool = 'source-map'
        // Run ESLint on save
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        // Run styleLint(npm run devに影響があるためコメントアウト)
        config.plugins.push(
          new StylelintPlugin({
            files: ['**/*.vue', '**/*.scss']
          })
        )
      }

      // import alias
      config.resolve.alias.Sass = path.resolve(__dirname, './assets/scss/')
      config.resolve.alias.Images = path.resolve(__dirname, './assets/img/')
      config.resolve.alias['~'] = path.resolve(__dirname)
      config.resolve.alias['@'] = path.resolve(__dirname)
    },
    terser: {
      terserOptions: {
        compress: { drop_console: true }
      }
    }
  }
}
