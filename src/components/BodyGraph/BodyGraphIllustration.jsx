import './BodyGraphIllustration.css'

/**
 * Ilustración plana (SVG) del BodyGraph real de Diseño Humano: silueta humana
 * de fondo (para que se entienda "esto es sobre una persona" incluso sin
 * conocer el sistema) + los 9 centros con su forma, posición y color
 * tradicional, y la cantidad correcta de gates en cada uno
 * (3+6+11+8+4+7+9+7+9 = 64, como el sistema real).
 */

const CENTERS = [
  { id: 'cabeza',   points: '150,18 192,82 108,82',                      color: '#e3ba4c' }, // amarillo
  { id: 'ajna',     points: '118,88 182,88 150,142',                     color: '#6f9d6a' }, // verde
  { id: 'garganta', points: '110,148 190,148 190,226 110,226',           color: '#8c6a48' }, // marrón
  { id: 'g',        points: '150,232 197,310 150,388 103,310',           color: '#e3ba4c' }, // amarillo
  { id: 'corazon',  points: '218,268 260,292 218,316',                   color: '#a63a34' }, // rojo oscuro
  { id: 'bazo',     points: '82,330 40,358 82,386',                      color: '#8c6a48' }, // marrón
  { id: 'sacral',   points: '110,348 190,348 190,426 110,426',           color: '#c2382c' }, // rojo
  { id: 'plexo',    points: '218,378 260,402 218,426',                   color: '#8c6a48' }, // marrón
  { id: 'raiz',     points: '110,432 190,432 190,478 110,478',           color: '#8c6a48' }, // marrón
]

const CENTROIDS = {
  cabeza: [150, 62], ajna: [150, 106], garganta: [150, 187], g: [150, 310],
  corazon: [232, 292], bazo: [66, 358], sacral: [150, 387], plexo: [232, 402], raiz: [150, 455],
}

const CHANNELS_SINGLE = [
  ['cabeza','ajna'], ['ajna','garganta'],
  ['garganta','corazon'], ['garganta','bazo'],
  ['g','corazon'], ['g','bazo'],
  ['corazon','plexo'], ['bazo','sacral'], ['bazo','raiz'],
  ['sacral','plexo'], ['plexo','raiz'],
]
const CHANNELS_SPINE = [
  ['garganta','g'], ['g','sacral'], ['sacral','raiz'],
]

// Gates por centro, en su posición aproximada real (fila por fila, como en
// una carta real). Total 3+6+11+8+4+7+9+7+9 = 64.
const GATES = [
  ['cabeza',128,72], ['cabeza',150,58], ['cabeza',172,72],
  ['ajna',128,100], ['ajna',150,97], ['ajna',172,100],
  ['ajna',136,119], ['ajna',164,119],
  ['ajna',150,134],
  ['garganta',128,162], ['garganta',150,162], ['garganta',172,162],
  ['garganta',122,180], ['garganta',178,180],
  ['garganta',122,198], ['garganta',178,198],
  ['garganta',165,208],
  ['garganta',128,216], ['garganta',150,216], ['garganta',172,216],
  ['g',150,251], ['g',136,270], ['g',164,270],
  ['g',125,300], ['g',175,300],
  ['g',138,330], ['g',162,330],
  ['g',150,368],
  ['corazon',231,277], ['corazon',225,291], ['corazon',239,291], ['corazon',231,305],
  ['bazo',68,339], ['bazo',56,354], ['bazo',78,354],
  ['bazo',68,364],
  ['bazo',55,377], ['bazo',71,378], ['bazo',78,382],
  ['sacral',128,362], ['sacral',150,362], ['sacral',172,362],
  ['sacral',122,378],
  ['sacral',122,394], ['sacral',178,394],
  ['sacral',122,410], ['sacral',160,410], ['sacral',178,410],
  ['plexo',226,388], ['plexo',236,388], ['plexo',246,388],
  ['plexo',222,400],
  ['plexo',234,408], ['plexo',246,408],
  ['plexo',232,418],
  ['raiz',128,440], ['raiz',150,440], ['raiz',172,440],
  ['raiz',122,452], ['raiz',178,452],
  ['raiz',122,462], ['raiz',178,462],
  ['raiz',122,472], ['raiz',178,472],
]

export default function BodyGraphIllustration({ className = '' }) {
  return (
    <div className={`bodygraph-illustration ${className}`}>
      <svg viewBox="0 0 300 496" xmlns="http://www.w3.org/2000/svg">
        {/* Silueta humana de fondo — es lo que hace que se entienda "esto es
            sobre el cuerpo/energía de una persona" aunque no conozcas el sistema. */}
        <g className="bg-silhouette">
          <circle cx="150" cy="58" r="44" />
          <rect x="138" y="96" width="24" height="18" rx="6" />
          <polygon points="88,118 212,118 222,270 208,420 92,420 78,270" />
          <rect x="98" y="418" width="42" height="76" rx="10" />
          <rect x="160" y="418" width="42" height="76" rx="10" />
        </g>

        <g className="bg-channels" stroke="#c9c2ba" strokeWidth="1" opacity="0.6">
          {CHANNELS_SINGLE.map(([a, b]) => {
            const [x1, y1] = CENTROIDS[a]
            const [x2, y2] = CENTROIDS[b]
            return <line key={`${a}-${b}`} x1={x1} y1={y1} x2={x2} y2={y2} />
          })}
          {CHANNELS_SPINE.map(([a, b]) => {
            const [x1, y1] = CENTROIDS[a]
            const [x2, y2] = CENTROIDS[b]
            return [-2.5, 0, 2.5].map(off => (
              <line key={`${a}-${b}-${off}`} x1={x1 + off} y1={y1} x2={x2 + off} y2={y2} />
            ))
          })}
        </g>

        <g className="bg-centers">
          {CENTERS.map((c, i) => (
            <polygon
              key={c.id}
              points={c.points}
              fill={c.color}
              fillOpacity="0.85"
              stroke={c.color}
              strokeWidth="1.6"
              className="bg-center-shape"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </g>

        <g className="bg-gates">
          {GATES.map(([center, x, y], i) => (
            <circle
              key={`${center}-${i}`}
              cx={x} cy={y}
              r={i % 3 === 0 ? 3.2 : 2.1}
              className={i % 3 === 0 ? 'bg-gate bg-gate--filled' : 'bg-gate'}
              style={{ animationDelay: `${(i % 7) * 0.4}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
