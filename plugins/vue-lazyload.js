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
  observer: true,
  observerOptions: {
    rootMargin: '0px 0px -150px',
    threshold: 0.1
  }
})
