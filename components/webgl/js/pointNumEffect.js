import * as THREE from 'three'

export default class pointNumEffect {
  constructor(container, itemsWrapper) {
    this.pointNum = 0
    this.container = container
  }

  /***************************************
  /*初期設定
  /* レンダラー・カメラ・シーンの設定
  /* risizeイベントの付与
  ***************************************/
  init() {
    // レンダラー
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
    this.container.appendChild(this.renderer.domElement)

    // シーンとカメラ
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      10000
    )
    this.camera.position.z = 50
    this.camera.lookAt = this.scene.position

    const viewSize = this.getViewSize()
    const segments = 128
    const geometry = new THREE.PlaneBufferGeometry(1, 1, segments, segments)
    console.log(viewSize, geometry)
  }

  /***************************************
  Gives the width and height of the current camera's view.
  @typedef {Object} Size
  @property {number} width
  @property {number} height

  @return {Size} The size of the camera's view
***************************************/
  getViewSize() {
    const fovInRadians = (this.camera.fov * Math.PI) / 180
    const height = Math.abs(this.camera.position.z * Math.tan(fovInRadians / 2) * 2)

    return { width: height * this.camera.aspect, height }
  }
}
