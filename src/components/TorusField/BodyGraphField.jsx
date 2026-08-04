import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Render abstracto inspirado en el BodyGraph de Diseño Humano: los 9 centros
 * energéticos (cabeza, ajna, garganta, G, corazón, bazo, sacral, plexo solar,
 * raíz) ubicados en su posición relativa clásica, conectados entre sí como un
 * campo de energía — no es un diagrama educativo exacto (para eso ya existe
 * el link a la carta gratuita en /diseno-humano), es una pieza visual que
 * evoca la silueta reconocible del gráfico, en el mismo lenguaje que el
 * TorusField del inicio.
 */

// Posición relativa de cada centro (silueta clásica del BodyGraph, de arriba a abajo).
const CENTERS = [
  { name: 'cabeza',  x: 0,     y: 4.2 },
  { name: 'ajna',    x: 0,     y: 3.05 },
  { name: 'garganta',x: 0,     y: 1.85 },
  { name: 'g',       x: 0,     y: 0.65 },
  { name: 'corazon', x: 1.55,  y: 0.1 },
  { name: 'bazo',    x: -1.55, y: -0.6 },
  { name: 'sacral',  x: 0,     y: -0.6 },
  { name: 'plexo',   x: 1.55,  y: -1.3 },
  { name: 'raiz',    x: 0,     y: -1.95 },
]

// "Canales" entre centros — no busca ser 100% preciso a Diseño Humano real,
// es la red de líneas que arma la silueta reconocible del gráfico.
const CHANNELS = [
  [0,1],[1,2],[2,3],[2,4],[2,5],[3,4],[3,5],[3,6],
  [4,7],[5,6],[5,8],[6,7],[6,8],[7,8],
]

// Pequeños "gates" alrededor de cada centro, para dar la textura de puntos
// numerados del BodyGraph sin tener que dibujar 64 exactos.
const GATE_JITTER = [
  [-0.22, 0.1], [0.22, 0.1], [-0.14, -0.14], [0.14, -0.14],
]

function buildGeometry() {
  const channelPoints = []
  CHANNELS.forEach(([a, b]) => {
    const ca = CENTERS[a], cb = CENTERS[b]
    channelPoints.push(new THREE.Vector3(ca.x, ca.y, 0))
    channelPoints.push(new THREE.Vector3(cb.x, cb.y, 0))
  })

  const gatePoints = []
  const gateStems = []
  CENTERS.forEach(c => {
    GATE_JITTER.forEach(([dx, dy]) => {
      const gx = c.x + dx, gy = c.y + dy
      gatePoints.push(new THREE.Vector3(gx, gy, 0.02))
      gateStems.push(new THREE.Vector3(c.x, c.y, 0))
      gateStems.push(new THREE.Vector3(gx, gy, 0.02))
    })
  })

  return { channelPoints, gatePoints, gateStems }
}

function BodyGraph() {
  const groupRef = useRef()

  const { channelGeo, stemGeo, gateGeo, hubGeo } = useMemo(() => {
    const { channelPoints, gatePoints, gateStems } = buildGeometry()

    const channelGeo = new THREE.BufferGeometry().setFromPoints(channelPoints)
    const stemGeo = new THREE.BufferGeometry().setFromPoints(gateStems)
    const gateGeo = new THREE.BufferGeometry().setFromPoints(gatePoints)
    const hubGeo = new THREE.BufferGeometry().setFromPoints(
      CENTERS.map(c => new THREE.Vector3(c.x, c.y, 0))
    )

    return { channelGeo, stemGeo, gateGeo, hubGeo }
  }, [])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
      groupRef.current.rotation.z = Math.sin(Date.now() * 0.00008) * 0.06
    }
  })

  return (
    <group ref={groupRef} scale={0.62} position={[0, -0.3, 0]}>
      <line geometry={channelGeo}>
        <lineBasicMaterial color="#5b7da4" transparent opacity={0.5} />
      </line>
      <line geometry={stemGeo}>
        <lineBasicMaterial color="#e8735a" transparent opacity={0.28} />
      </line>
      <points geometry={gateGeo}>
        <pointsMaterial color="#e8735a" size={0.055} transparent opacity={0.85} sizeAttenuation />
      </points>
      <points geometry={hubGeo}>
        <pointsMaterial color="#f2e4d8" size={0.11} transparent opacity={0.95} sizeAttenuation />
      </points>
    </group>
  )
}

export default function BodyGraphFieldScene({ className = '' }) {
  return (
    <div className={`torus-scene ${className}`}>
      <Canvas
        camera={{ position: [0, 0.4, 5.4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} color="#19232e" />
          <pointLight position={[2, 2, 2]} intensity={1.2} color="#e8735a" />
          <pointLight position={[-2, -1, -2]} intensity={0.8} color="#5b7da4" />
          <BodyGraph />
        </Suspense>
      </Canvas>
    </div>
  )
}
