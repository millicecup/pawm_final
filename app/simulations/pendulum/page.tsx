"use client"

import { useEffect, useRef, useState } from "react"
import Header from "../../../source/components/Header"

export default function PendulumSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isRunning, setIsRunning] = useState(false)

  // physics parameters (in meters, not pixels)
  const [length, setLength] = useState(1.5) // meters
  const [angle, setAngle] = useState(30) // deg
  const [gravity, setGravity] = useState(9.81) // m/s²
  const [damping, setDamping] = useState(0.002)

  // state
  const [theta, setTheta] = useState((30 * Math.PI) / 180) // radians
  const [omega, setOmega] = useState(0) // angular velocity
  const [elapsed, setElapsed] = useState(0)
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([])

  // conversion for drawing
  const pxPerMeter = 150
  const L_px = length * pxPerMeter

  // expected period (small angle, no damping)
  const expectedPeriod = (2 * Math.PI * Math.sqrt(length / gravity)).toFixed(2)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = 600
    const height = 450
    canvas.width = width
    canvas.height = height

    const originX = width / 2
    const originY = 80

    function draw() {
      ctx.fillStyle = "#111"
      ctx.fillRect(0, 0, width, height)

      // bob position (use L_px for drawing)
      const bobX = originX + L_px * Math.sin(theta)
      const bobY = originY + L_px * Math.cos(theta)

      // pendulum arm
      ctx.strokeStyle = "#aaa"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(originX, originY)
      ctx.lineTo(bobX, bobY)
      ctx.stroke()

      // bob
      ctx.fillStyle = "#ff6b6b"
      ctx.beginPath()
      ctx.arc(bobX, bobY, 12, 0, Math.PI * 2)
      ctx.fill()

      // trail
      ctx.strokeStyle = "rgba(255,255,255,0.5)"
      ctx.lineWidth = 1.5
      ctx.beginPath()
      trail.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y)
        else ctx.lineTo(pt.x, pt.y)
      })
      ctx.stroke()
    }

    function update(dt: number) {
      // real physics (in meters)
      const acc = (-gravity / length) * Math.sin(theta) - damping * omega
      setOmega((prevOmega) => prevOmega + acc * dt)
      setTheta((prevTheta) => prevTheta + omega * dt)
      setElapsed((t) => t + dt)

      // track bob position in pixels for trail
      const bobX = originX + L_px * Math.sin(theta)
      const bobY = originY + L_px * Math.cos(theta)
      setTrail((prev) => [...prev, { x: bobX, y: bobY }])
    }

    let lastTime = performance.now()
    function animate(time: number) {
      if (!isRunning) {
        lastTime = time
        return
      }
      const dt = (time - lastTime) / 1000
      lastTime = time

      if (elapsed >= 8) {
        setIsRunning(false)
        return
      }

      update(dt)
      draw()
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isRunning, theta, omega, gravity, length, damping, elapsed, trail, L_px])

  const reset = () => {
    setIsRunning(false)
    setTheta((angle * Math.PI) / 180)
    setOmega(0)
    setElapsed(0)
    setTrail([])
  }

  return (
    <>
      <Header showAuthNav={true} />

      <main className="container">
        <section className="section">
          <h1 className="hero-title">Pendulum Simulation</h1>
          <p className="lead">Explore the physics of pendulum motion interactively.</p>
        </section>
        <div className="grid" style={{ gridTemplateColumns: "2fr 2fr", gap: "3rem" }}>
          {/* Simulation */}
          <article className="card">
            <h2>Pendulum Simulator</h2>
            <canvas ref={canvasRef} style={{ width: "100%", height: "450px" }} />
            <div className="btn-group"  style={{ marginTop: "1rem", marginRight: "1rem", display: "flex", gap: "0.75rem" }}>
              <button className="btn btn-primary" onClick={() => setIsRunning(true)}>
                Start
              </button>
              <button className="btn btn-secondary" onClick={() => setIsRunning(false)}>
                Pause
              </button>
              <button className="btn" onClick={reset}>
                Reset
              </button>
            </div>
          </article>

          {/* Controls + Measurements */}
          <div className="space-y" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <article className="card">
              <h3>Parameters</h3>
              <label>Length: {length.toFixed(2)} m</label>
              <input
                type="range"
                min={0.5}
                max={3}
                step={0.1}
                value={length}
                onChange={(e) => setLength(+e.target.value)}
              />
              <label>Initial Angle: {angle}°</label>
              <input
                type="range"
                min={5}
                max={60}
                value={angle}
                onChange={(e) => {
                  setAngle(+e.target.value)
                  setTheta((+e.target.value * Math.PI) / 180)
                }}
              />
              <label>Gravity: {gravity.toFixed(2)} m/s²</label>
              <input
                type="range"
                min={1}
                max={20}
                step={0.1}
                value={gravity}
                onChange={(e) => setGravity(+e.target.value)}
              />
              <label>Damping: {damping.toFixed(3)}</label>
              <input
                type="range"
                min={0}
                max={0.01}
                step={0.001}
                value={damping}
                onChange={(e) => setDamping(+e.target.value)}
              />
            </article>

            <article className="card">
              <h3>Measurements</h3>
              <p>
                Time Elapsed: <strong>{elapsed.toFixed(2)} s</strong>
              </p>
              <p>
                Expected Period (no damping): <strong>{expectedPeriod} s</strong>
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
