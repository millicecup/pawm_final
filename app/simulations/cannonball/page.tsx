"use client"

import { useAuth } from "../../../source/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Header from "../../../source/components/Header"

interface Projectile {
  x: number
  y: number
  vx: number
  vy: number
  trail: Array<{ x: number; y: number }>
  color: string
}

export default function CannonballSimulation() {
  const { user } = useAuth()
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  const [velocity, setVelocity] = useState(50)
  const [angle, setAngle] = useState(45)
  const [airResistance, setAirResistance] = useState(0.01)
  const [isRunning, setIsRunning] = useState(false)
  const [projectiles, setProjectiles] = useState<Projectile[]>([])
  const [maxHeight, setMaxHeight] = useState(0)
  const [range, setRange] = useState(0)
  const [flightTime, setFlightTime] = useState(0)

  // redirect if not logged in
  useEffect(() => {
    if (!user) router.push("/login")
  }, [user, router])

  // calculate theoretical results (no air resistance)
  useEffect(() => {
    const radians = (angle * Math.PI) / 180
    const g = 9.81
    const timeToApex = (velocity * Math.sin(radians)) / g
    const maxH = (velocity ** 2 * Math.sin(radians) ** 2) / (2 * g)
    const totalTime = 2 * timeToApex
    const maxRange = (velocity ** 2 * Math.sin(2 * radians)) / g

    setMaxHeight(Number(maxH.toFixed(1)))
    setRange(Number(maxRange.toFixed(1)))
    setFlightTime(Number(totalTime.toFixed(1)))
  }, [velocity, angle])

  // draw & physics loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // resize
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = 400 * window.devicePixelRatio
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const g = 9.81
    const scale = 4 // px per meter

    function draw() {
      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio

      // background
      ctx.fillStyle = "#111"
      ctx.fillRect(0, 0, width, height)

      // ground
      ctx.fillStyle = "#2a5d31"
      ctx.fillRect(0, height - 40, width, 40)

      // projectiles
      projectiles.forEach((p) => {
        // full trail
        ctx.strokeStyle = p.color
        ctx.lineWidth = 2
        ctx.beginPath()
        p.trail.forEach((pt, i) => {
          if (i === 0) ctx.moveTo(pt.x, pt.y)
          else ctx.lineTo(pt.x, pt.y)
        })
        ctx.stroke()

        // ball
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    function updatePhysics() {
      if (!isRunning) return
      setProjectiles((prev) =>
        prev.map((p) => {
          const dt = 1 / 60
          const speed = Math.sqrt(p.vx ** 2 + p.vy ** 2)
          const dragX = -airResistance * speed * p.vx
          const dragY = -airResistance * speed * p.vy

          p.vx += dragX * dt
          p.vy += (g + dragY) * dt

          p.x += p.vx * dt * scale
          p.y += p.vy * dt * scale

          // keep full trail (no shift, no filter)
          p.trail.push({ x: p.x, y: p.y })
          return p
        })
      )
    }

    function animate() {
      updatePhysics()
      draw()
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isRunning, airResistance, projectiles, velocity, angle])

  const fireProjectile = () => {
    const radians = (angle * Math.PI) / 180
    const yBase = 360
    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7"]
    const color = colors[Math.floor(Math.random() * colors.length)]
    setProjectiles((prev) => [
      ...prev,
      {
        x: 50,
        y: yBase,
        vx: velocity * Math.cos(radians),
        vy: -velocity * Math.sin(radians),
        trail: [],
        color,
      },
    ])
  }

  if (!user) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <Header showAuthNav={true} />
      <main className="container">
        <section className="section">
          <h1 className="hero-title">Projectile Motion Simulation</h1>
          <p className="lead">Explore the physics of cannonball trajectories interactively.</p>
        </section>

        <div className="grid" style={{ gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
          {/* Simulation */}
          <article className="card">
            <h2>Trajectory Simulator</h2>
            <canvas ref={canvasRef} className="w-full" style={{ height: "400px" }} />
            <div className="btn-group"  style={{ marginTop: "1rem", marginRight: "1rem", display: "flex", gap: "0.75rem" }}>
              <button className="btn btn-primary" onClick={fireProjectile}>
                Fire
              </button>
              <button className="btn btn-secondary" onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? "Pause" : "Start"}
              </button>
              <button className="btn" onClick={() => setProjectiles([])}>
                Clear
              </button>
            </div>
          </article>

          {/* Controls + Results */}
          <div className="space-y">
            <article className="card">
              <h3>Launch Parameters</h3>
              <label>Velocity: {velocity} m/s</label>
              <input
                type="range"
                min={10}
                max={100}
                value={velocity}
                onChange={(e) => setVelocity(+e.target.value)}
              />
              <label>Angle: {angle}°</label>
              <input
                type="range"
                min={0}
                max={90}
                value={angle}
                onChange={(e) => setAngle(+e.target.value)}
              />
              <label>Air Resistance: {airResistance.toFixed(3)}</label>
              <input
                type="range"
                min={0}
                max={0.05}
                step={0.005}
                value={airResistance}
                onChange={(e) => setAirResistance(+e.target.value)}
              />
            </article>

            <article className="card">
              <h3>Results</h3>
              <p>
                Max Height: <strong>{maxHeight} m</strong>
              </p>
              <p>
                Range: <strong>{range} m</strong>
              </p>
              <p>
                Flight Time: <strong>{flightTime} s</strong>
              </p>
            </article>
          </div>
        </div>
      </main>
      <footer className="site-footer" role="contentinfo">
        <div className="container">
          <div className="brand brand-center">
            <img src="/assets/brand.png" alt="Physics Virtual Lab" className="brand-logo small" />
            <span className="brand-name">Physics Virtual Lab</span>
          </div>
          <p className="muted">Empowering physics education through interactive simulations</p>
        </div>
      </footer>
    </>
  )
}
