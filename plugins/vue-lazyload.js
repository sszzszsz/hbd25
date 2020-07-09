import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  // 画像の読み込みが発生する位置
  // 画像の上端が、ウインドウの上端から{ウインドウの高さ*preLoadの値}分すすんだ位置を通過するときに発生する
  preLoad: 0.7,
  lazyComponent: true,
  // 画像リクエスト試行回数
  attempt: 1,
  // スクロールイベントやリサイズイベントに対するコールバックの最小実行間隔
  // コールバックの実行が過密にならないように設定する
  throttleWait: 100,
  // set observer to true
  observer: true,

  // optional
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  },
  adapter: {
    loaded({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init }) {
      // do something here
      // example for call LoadedHandler
      // console.log(el)
    },
    loading(listender, Init) {
      // do something here
    },
    error(listender, Init) {
      // do something here
    }
  }
})
