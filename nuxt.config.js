import path from 'path'
import StylelintPlugin from 'stylelint-webpack-plugin'

// path
// const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
const baseDir = process.env.BASE_DIR || '/'
// const basePath = baseUrl + baseDir

// meta
const siteName = '好きなところ100'
const siteDesc = '好きなところ100'
const maincolor = '#bf4040'

export default {
  mode: 'universal',
  router: {
    base: baseDir // ←これも忘れずに入れる！
  },
  server: {
    port: 8000, // デフォルト: 3000
    host: '0.0.0.0' // デフォルト: localhost
  },
  /*
   ** Headers of the page
   */
  head: {
    title: siteName,
    titleTemplate: '',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' },
      { name: 'format-detection', content: 'telephone=no, email=no, address=no' },
      { hid: 'description', name: 'description', content: siteDesc },
      {
        hid: 'msapplication-TileColor',
        name: 'msapplication-TileColor',
        content: maincolor
      },
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#ffffff'
      },
      // ogp関連
      { hid: 'og:site_name', property: 'og:site_name', content: siteName },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://hbd25.netlify.com/' },
      { hid: 'og:title', property: 'og:title', content: siteName },
      { hid: 'og:description', property: 'og:description', content: siteDesc },
      { name: 'twitter:card', content: 'summary_large_image' },
      // pwa iOS
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
    ],
    link: [
      // icon
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/icon/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icon/favicon-16x16.png' },
      { rel: 'mask-icon', href: '/icon/safari-pinned-tab.svg', color: maincolor },
      // iOS splashscreens
      {
        href: '/splashscreens/iphone5_splash.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: '/splashscreens/iphone6_splash.png',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: '/splashscreens/iphoneplus_splash.png',
        media:
          '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: '/splashscreens/iphonex_splash.png',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: '/splashscreens/iphonexr_splash.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: '/splashscreens/iphonexsmax_splash.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: '/splashscreens/ipad_splash.png',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: '/splashscreens/ipadpro1_splash.png',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: '/splashscreens/ipadpro3_splash.png',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: '/splashscreens/ipadpro2_splash.png',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      }
    ]
  },
  /*
   ** manifest.json
   */
  manifest: {
    name: siteName,
    short_name: 'HBD25th',
    description: siteDesc,
    lang: 'ja',
    theme_color: maincolor,
    background_color: maincolor,
    display: 'standalone',
    scope: '/',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon/icon-1024.png',
        sizes: '1024x1024',
        type: 'image/png'
      }
    ]
  },
  workbox: {
    // 開発環境でもPWA
    // dev: true
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
  /*
   ** ページ遷移アニメーション
   */
  pageTransition: {
    name: 'zoom-out',
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
