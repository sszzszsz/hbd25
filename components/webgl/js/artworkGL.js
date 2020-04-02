/* eslint-disable prettier/prettier */
import * as THREE from 'three'
// three.jsの処理を書いていく
export default class ArtworkGL {
  constructor(props) {
    this.canvasId = props.$canvas.id
    this.canvasW = window.innerWidth
    this.canvasH = window.innerHeight
    this.scrollY = 0
    this.init()
  }

  init() {
    console.log(THREE)
    console.log(this.canvasId)
    this.setRenderer()
    this.setEvent()
  }
  setRenderer() {
    // サイズを指定
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: document.getElementById(this.canvasId)
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    // this.renderer.setClearColor(0xE5E0D9)
    this.renderer.setSize(this.canvasW, this.canvasH)

    // シーンを作成する
    this.scene = new THREE.Scene()

    // new THREE.PerspectiveCamera(視野角, アスペクト比, near, far)
    const fov = 100
    const fovRad = (fov / 2) * (Math.PI / 180) // 視野角をラジアンに変換
    const dist = this.canvasH / 2 / Math.tan(fovRad) // ウィンドウぴったりのカメラ距離

    // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
    this.camera = new THREE.PerspectiveCamera(fov, this.canvasW / this.canvasH, 1, dist * 2)
    this.camera.position.z = dist // カメラを遠ざける

    // 平行光源を作成
    // new THREE.DirectionalLight(色, 光の強さ)
    const light = new THREE.DirectionalLight(0xFFFFFF, 1)
    light.position.set(0, 0, 10)
    this.scene.add(light)

    this.setMesh()
  }

  setMesh() {
    const _this = this
    this.meshList = []
    for (let i = 0; i < 100; i++) {
      this.meshList[i] = makeMesh()
    }
    function makeMesh() {
      const x = 0; const y = 0;
      const heartShape = new THREE.Shape();
      heartShape.moveTo(x + 5, y + 5);
      heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
      heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
      heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
      heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
      heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
      heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

      const geometry = new THREE.ShapeGeometry(heartShape);
      const material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
      const mesh = new THREE.Mesh(geometry, material);
      // Math.random() * ( 最大値 - 最小値 ) + 最小値;
      const xPos = Math.floor(
        Math.random() * (_this.canvasW - -_this.canvasW) + -_this.canvasW
      )
      const yPos = Math.floor(
        Math.random() * (_this.canvasH - -_this.canvasH) + -_this.canvasH
      )
      const zPos = Math.floor(
        Math.random() * (_this.canvasH / 2 - 1) + -_this.canvasH / 2
      )
      mesh.position.set(xPos, yPos, zPos)
      mesh.rotation.z = 15.5
      _this.scene.add(mesh)
      return mesh
    }

    this.renderer.render(this.scene, this.camera)
    // this.render()
    // function tick() {
    //   for (let i = 0; i < _this.meshList.length; i++) {
    //     _this.meshList[i].rotation.y += 0.01;
    //     _this.renderer.render(_this.scene, _this.camera)

    //   }
    //   requestAnimationFrame(tick);
    // }
  }

  render() {
    // 次のフレームを要求
    requestAnimationFrame(() => {
      this.render()
    })

    // ミリ秒から秒に変換
    const sec = performance.now() / 1000

    // 1秒で45°回転する
    for (let i = 0; i < this.meshList.length; i++) {
      this.meshList[i].rotation.x = sec * (Math.PI / 6)
      this.meshList[i].rotation.y = sec * (Math.PI / 6)
    }
    // 画面に表示
    this.renderer.render(this.scene, this.camera)
  }

  setEvent() {
    const _this = this
    this.currentScrollY = window.scrollY
    let prevScrollY = window.scrollY

    window.addEventListener('mousemove', (e) => {
      _this.mouseX = e.clientX - this.canvasW / 2
      _this.mouseY = e.clientY
    })

    window.addEventListener('scroll', (e) => {
      _this.currentScrollY = window.scrollY
      console.log(_this.currentScrollY)
      // スクロールに追従させる
      if (prevScrollY <= _this.currentScrollY || _this.currentScrollY === 0) {
        // scroll down
        for (let i = 0; i < _this.meshList.length; i++) {
          _this.meshList[i].position.y = _this.meshList[i].position.y + 1
          console.log(i, _this.meshList[i].position.y)
        }
      } else {
        // up
        for (let i = 0; i < _this.meshList.length; i++) {
          _this.meshList[i].position.y = _this.meshList[i].position.y - 1
        }
      }
      prevScrollY = _this.currentScrollY
      _this.renderer.render(_this.scene, _this.camera)
    })
  }
}
