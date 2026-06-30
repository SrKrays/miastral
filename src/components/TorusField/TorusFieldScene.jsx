import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Genera puntos a lo largo de líneas de flujo toroidales,
 * simulando las líneas de un campo magnético/toroide.
 * Es 100% geometría matemática, no depende de ningún modelo externo.
 */
function buildFieldLines({ R = 1.1, r = 0.45, lineCount = 26, pointsPerLine = 140 }) {
  const lines = []
  for (let i = 0; i < lineCount; i++) {
    const offset = (i / lineCount) * Math.PI * 2
    const points = []
    for (let j = 0; j <= pointsPerLine; j++) {
      const t = (j / pointsPerLine) * Math.PI * 2
      // curva que recorre el toroide "por adentro y por afuera",
      // como las líneas de un campo poloidal
      const tube = r * Math.sin(t)
      const ring = R + r * Math.cos(t) * 0.35
      const twist = offset + t * 0.15
      const x = Math.cos(twist) * ring
      const z = Math.sin(twist) * ring
      const y = tube
      points.push(new THREE.Vector3(x, y, z))
    }
    lines.push(points)
  }
  return lines
}

function TorusField() {
  const groupRef = useRef()

  const lineObjects = useMemo(() => {
    const lines = buildFieldLines({})
    return lines.map((points, idx) => {
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const t = idx / lines.length
      // degradé azul -> coral a lo largo de las líneas, como pidió la clienta
      const color = new THREE.Color().lerpColors(
        new THREE.Color('#5b7da4'),
        new THREE.Color('#e8735a'),
        Math.abs(Math.sin(t * Math.PI))
      )
      return { geometry, color }
    })
  }, [])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0001) * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {lineObjects.map((line, idx) => (
        <line key={idx} geometry={line.geometry}>
          <lineBasicMaterial color={line.color} transparent opacity={0.55} />
        </line>
      ))}
    </group>
  )
}

export default function TorusFieldScene({ className = '' }) {
  return (
    <div className={`torus-scene ${className}`}>
      <Canvas
        camera={{ position: [0, 1.4, 3.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} color="#19232e" />
          <pointLight position={[2, 2, 2]} intensity={1.2} color="#e8735a" />
          <pointLight position={[-2, -1, -2]} intensity={0.8} color="#5b7da4" />
          <TorusField />
        </Suspense>
      </Canvas>
    </div>
  )
}
