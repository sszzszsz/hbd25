import * as THREE from 'three'
import { TweenLite } from 'gsap'

export default class GridToFullscreenEffect {
  constructor(container, items) {
    this.container = container
    this.items = items
    this.camera = null
    this.scene = null
    this.renderer = null

    this.uniforms = {
      uProgress: new THREE.Uniform(0),
      uMeshScale: new THREE.Uniform(new THREE.Vector2(1, 1)),
      uMeshPosition: new THREE.Uniform(new THREE.Vector2(0, 0)),
      uViewSize: new THREE.Uniform(new THREE.Vector2(1, 1)),
      uColor: new THREE.Uniform(new THREE.Vector3(20, 20, 20))
    }
    this.animating = false
    this.state = 'grid'
  }
  toGrid() {
    if (this.state === 'grid' || this.isAnimating) return

    this.animating = true
    this.tween = TweenLite.to(this.uniforms.uProgress, 1, {
      value: 0,
      onUpdate: this.render.bind(this),
      onComplete: () => {
        this.isAnimating = false
        this.state = 'grid'
        this.container.style.zIndex = -1
      }
    })
  }
  toFullscreen() {
    if (this.state === 'fullscreen' || this.isAnimating) return

    this.animating = true
    this.container.style.zIndex = 2
    this.tween = TweenLite.to(this.uniforms.uProgress, 1, {
      value: 1,
      onUpdate: this.render.bind(this),
      onComplete: () => {
        this.isAnimating = false
        this.state = 'fullscreen'
        this.toGrid()
      }
    })
  }
  init() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.container.appendChild(this.renderer.domElement)

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    )
    this.camera.position.z = 50
    this.camera.lookAt = this.scene.position

    const viewSize = this.getViewSize()
    this.uniforms.uViewSize.value.x = viewSize.width
    this.uniforms.uViewSize.value.y = viewSize.height

    const segments = 128
    const geometry = new THREE.PlaneBufferGeometry(1, 1, segments, segments)
    // We'll be using the shader material later on ;)
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide
    })
    this.mesh = new THREE.Mesh(geometry, material)
    this.scene.add(this.mesh)
    window.addEventListener('resize', this.onResize.bind(this))

    for (let i = 0; i < this.items.length; i++) {
      const element = this.items[i]
      element.addEventListener('mousedown', (ev) => this.onGridImageClick(ev, i))
    }
  }
  updateMesh() {
    if (this.itemIndex === -1) return

    const item = this.items[this.itemIndex]
    const rect = item.getBoundingClientRect()
    const viewSize = this.getViewSize()

    // 1. Transform pixel units to camera's view units
    const widthViewUnit = (rect.width * viewSize.width) / window.innerWidth
    const heightViewUnit = (rect.height * viewSize.height) / window.innerHeight
    let xViewUnit = (rect.left * viewSize.width) / window.innerWidth
    let yViewUnit = (rect.top * viewSize.height) / window.innerHeight

    // 2. Make units relative to center instead of the top left.
    xViewUnit = xViewUnit - viewSize.width / 2
    yViewUnit = yViewUnit - viewSize.height / 2

    // 3. Make the origin of the plane's position to be the center instead of top Left.
    const x = xViewUnit + widthViewUnit / 2
    const y = -yViewUnit - heightViewUnit / 2

    // 4. Scale and position mesh
    const mesh = this.mesh
    // Since the geometry's size is 1. The scale is equivalent to the size.
    mesh.scale.x = widthViewUnit
    mesh.scale.y = heightViewUnit
    mesh.position.x = x
    mesh.position.y = y

    this.uniforms.uMeshPosition.value.x = x / widthViewUnit
    this.uniforms.uMeshPosition.value.y = y / heightViewUnit
    this.uniforms.uMeshScale.value.x = widthViewUnit
    this.uniforms.uMeshScale.value.y = heightViewUnit

    const styles = window.getComputedStyle(item)
    let color = styles.getPropertyValue('background-color')
    color = color.substring(color.indexOf('(') + 1, color.indexOf(')'))

    const rgbColors = color.split(',', 3).map((c) => parseInt(c))
    this.uniforms.uColor.value.x = rgbColors[0]
    this.uniforms.uColor.value.y = rgbColors[1]
    this.uniforms.uColor.value.z = rgbColors[2]
  }
  onGridImageClick(ev, itemIndex) {
    this.itemIndex = itemIndex
    this.updateMesh()
    // getBoundingClientRect gives pixel units relative to the top left of the pge

    // this.render();
    this.toFullscreen()
  }
  render() {
    this.renderer.render(this.scene, this.camera)
  }

  getViewSize() {
    const fovInRadians = (this.camera.fov * Math.PI) / 180
    const height = Math.abs(this.camera.position.z * Math.tan(fovInRadians / 2) * 2)

    return { width: height * this.camera.aspect, height }
  }
  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.updateMesh()
    this.render()
  }
}
const vertexShader = `
	uniform float uProgress;
	uniform vec2 uMeshScale;
	uniform vec2 uMeshPosition;
	uniform vec2 uViewSize;

	void main(){
	    vec3 pos = position.xyz;

		// Scale to page view size/page size
	    vec2 scaleToViewSize = uViewSize / uMeshScale - 1.;
        vec2 scale = vec2(
          1. + scaleToViewSize * uProgress
        );
        pos.xy *= scale;

        // Move towards center
        pos.y += -uMeshPosition.y * uProgress;
        pos.x += -uMeshPosition.x * uProgress;

         gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
	}
`
const fragmentShader = `
uniform vec3 uColor;
	void main(){
    vec3 color = uColor;
         gl_FragColor = vec4(color/255.,1.);
	}
`
const effect = new GridToFullscreenEffect(
  document.getElementById('app'),
  Array.from(document.getElementsByClassName('item'))
)
effect.init()
