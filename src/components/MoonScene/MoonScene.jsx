import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Genera una textura de cráteres de forma procedural (canvas 2D),
 * sin depender de ninguna imagen externa. Se usa como bump map
 * para que la luz le pegue con relieve real en la superficie.
 */
function generateCraterTexture(size = 1024) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#808080'
  ctx.fillRect(0, 0, size, size)

  // ruido base sutil para que no quede una esfera perfectamente lisa
  const noise = ctx.createImageData(size, size)
  for (let i = 0; i < noise.data.length; i += 4) {
    const v = 120 + Math.random() * 16
    noise.data[i] = noise.data[i + 1] = noise.data[i + 2] = v
    noise.data[i + 3] = 18
  }
  ctx.putImageData(noise, 0, 0)

  const craterCount = 220
  for (let i = 0; i < craterCount; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const r = Math.random() * size * 0.035 + size * 0.004
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
    grad.addColorStop(0, 'rgba(35,35,35,0.85)')
    grad.addColorStop(0.55, 'rgba(70,70,70,0.55)')
    grad.addColorStop(0.78, 'rgba(190,190,190,0.45)')
    grad.addColorStop(1, 'rgba(128,128,128,0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  return canvas
}

/**
 * Carga el modelo de la luna y lo centra automáticamente
 * (el .glb exportado no viene centrado en su propio origen).
 */
function Moon() {
  const { scene } = useGLTF('/models/luna.glb')
  const meshRef = useRef()

  const bumpTexture = useMemo(() => {
    const tex = new THREE.CanvasTexture(generateCraterTexture())
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    return tex
  }, [])

  const centered = useMemo(() => {
    const clone = scene.clone()
    const box = new THREE.Box3().setFromObject(clone)
    const center = box.getCenter(new THREE.Vector3())
    clone.position.sub(center)

    // Material propio: tonos azules del cliente + relieve procedural de cráteres.
    clone.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#ffffff'),
          roughness: 0.9,
          roughnessMap: bumpTexture,
          metalness: 0.05,
          bumpMap: bumpTexture,
          bumpScale: 0.035,
        })
        child.castShadow = false
        child.receiveShadow = false
      }
    })
    return clone
  }, [scene, bumpTexture])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08 // rotación lenta y constante
    }
  })

  return (
  <group ref={meshRef} scale={1} > <primitive object={centered} />
    </group>
  )
}

export default function MoonScene({ className = '' }) {
  return (
    <div className={`moon-scene ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Luz ambiente tenue para que no quede plana */}
          <ambientLight intensity={0.35} color="#19232e" />

          {/* Luz principal fría, simula reflejo lunar */}
          <directionalLight position={[-3, 2, 4]} intensity={1.4} color="#d1dbe6" />

          {/* Rim light coral: el detalle distintivo de marca */}
          <directionalLight position={[3, -1, -2]} intensity={2.4} color="#e8735a" />

          {/* Relleno azul suave del lado opuesto */}
          <directionalLight position={[-2, -2, -3]} intensity={0.6} color="#5b7da4" />

          <Moon />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/luna.glb')
