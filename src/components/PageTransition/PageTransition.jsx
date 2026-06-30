import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 18 },
  enter:   { opacity: 1, y: 0,  transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
}

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ position: 'relative', zIndex: 1 }}
    >
      {children}
    </motion.div>
  )
}
