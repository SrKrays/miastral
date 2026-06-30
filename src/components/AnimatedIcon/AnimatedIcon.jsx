import './AnimatedIcon.css'

/**
 * Íconos SVG animados estilo "constelación astral".
 * type: 'star' | 'constellation' | 'moon-cycle' | 'orbit'
 */
export default function AnimatedIcon({ type = 'star', size = 56 }) {
  const icons = {
    star: (
      <svg viewBox="0 0 100 100" width={size} height={size} className="astral-icon astral-icon-star">
        <path
          className="icon-stroke"
          d="M50 8 L58 38 L88 38 L64 56 L72 86 L50 68 L28 86 L36 56 L12 38 L42 38 Z"
          fill="none"
        />
        <circle className="icon-spark spark-1" cx="50" cy="8" r="2.2" />
        <circle className="icon-spark spark-2" cx="88" cy="38" r="1.6" />
        <circle className="icon-spark spark-3" cx="28" cy="86" r="1.8" />
      </svg>
    ),
    constellation: (
      <svg viewBox="0 0 100 100" width={size} height={size} className="astral-icon astral-icon-constellation">
        <path className="icon-stroke icon-stroke-thin" d="M15 75 L38 30 L65 55 L85 20" fill="none" />
        <circle className="icon-node node-1" cx="15" cy="75" r="3.5" />
        <circle className="icon-node node-2" cx="38" cy="30" r="4.5" />
        <circle className="icon-node node-3" cx="65" cy="55" r="3" />
        <circle className="icon-node node-4" cx="85" cy="20" r="4" />
      </svg>
    ),
    'moon-cycle': (
      <svg viewBox="0 0 100 100" width={size} height={size} className="astral-icon astral-icon-moon">
        <circle className="icon-orbit-ring" cx="50" cy="50" r="34" fill="none" />
        <path
          className="icon-moon-shape"
          d="M58 22 A30 30 0 1 0 58 78 A22 22 0 1 1 58 22 Z"
        />
      </svg>
    ),
    orbit: (
      <svg viewBox="0 0 100 100" width={size} height={size} className="astral-icon astral-icon-orbit">
        <ellipse className="icon-orbit-ring" cx="50" cy="50" rx="40" ry="18" fill="none" />
        <circle className="icon-orbit-dot" cx="50" cy="50" r="6" />
        <circle className="icon-orbit-planet" r="3.5" />
      </svg>
    ),
  }

  return icons[type] || icons.star
}
