"use client"

import { useEffect, useRef, useState } from "react"
import Header from "../../../source/components/Header"

export default function CircuitSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isRunning, setIsRunning] = useState(false)

  // parameters
  const [voltage, setVoltage] = useState(5)
  const [resistance, setResistance] = useState(10)
  const [carPos, setCarPos] = useState(0)

  const current = voltage / resistance // Ohm's law

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = 600
    const height = 450
    canvas.width = width
    canvas.height = height

    const trackX = 100
    const trackY = 120
    const trackW = width - 200
    const trackH = 200
    const loopLen = 2 * (trackW + trackH)

    function draw() {
      ctx.fillStyle = "#111"
      ctx.fillRect(0, 0, width, height)

      // draw track
      ctx.strokeStyle = "#aaa"
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.rect(trackX, trackY, trackW, trackH)
      ctx.stroke()

      // battery
      ctx.fillStyle = "#2a65be"
      ctx.fillRect(trackX - 40, trackY + trackH / 2 - 40, 30, 80)
      ctx.fillStyle = "#fff"
      ctx.font = "16px Inter"
      ctx.fillText("V", trackX - 28, trackY + trackH / 2 + 5)

      // resistor (right edge middle)
      ctx.strokeStyle = "#e776af"
      ctx.lineWidth = 6
      const rx = trackX + trackW
      const ry = trackY + trackH / 2 - 30
      ctx.beginPath()
      ctx.moveTo(rx, ry)
      ctx.lineTo(rx, ry + 60)
      ctx.stroke()

      // electron/car
      let x = trackX
      let y = trackY
      const pos = carPos % loopLen

      if (pos < trackW) {
        // top
        x = trackX + pos
        y = trackY
      } else if (pos < trackW + trackH) {
        // right
        x = trackX + trackW
        y = trackY + (pos - trackW)
      } else if (pos < 2 * trackW + trackH) {
        // bottom
        x = trackX + (trackW - (pos - (trackW + trackH)))
        y = trackY + trackH
      } else {
        // left
        x = trackX
        y = trackY + (trackH - (pos - (2 * trackW + trackH)))
      }

      ctx.fillStyle = "#9575d2"
      ctx.beginPath()
      ctx.arc(x, y, 10, 0, Math.PI * 2)
      ctx.fill()

      // stats
      // ctx.fillStyle = "#fff"
      // ctx.font = "16px Inter"
      // ctx.fillText(`Voltage: ${voltage} V`, 20, 40)
      // ctx.fillText(`Resistance: ${resistance} Ω`, 20, 65)
      // ctx.fillText(`Current: ${current.toFixed(2)} A`, 20, 90)
    }

    function animate() {
      if (isRunning) {
        setCarPos((prev) => prev + current * 2) // proportional to I
        draw()
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    draw()
    if (isRunning) animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isRunning, carPos, voltage, resistance, current])

  const reset = () => {
    setIsRunning(false)
    setCarPos(0)
  }

  return (
    <>
      <Header showAuthNav={true} />

      <main className="container">
        <section className="section">
          <h1 className="hero-title">Circuit Simulation</h1>
          <p className="lead">Visualize current flow in a simple electrical circuit using a racing car analogy.</p>
        </section>
        <div className="grid" style={{ gridTemplateColumns: "2fr 2fr", gap: "3rem" }}>
          {/* Simulation */}
          <article className="card">
            <h2>Circuit Simulator</h2>
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

          {/* Controls + Explanation */}
          <div className="space-y" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <article className="card">
              <h3>Parameters</h3>
              <label>Voltage: {voltage} V</label>
              <input
                type="range"
                min={1}
                max={12}
                step={0.5}
                value={voltage}
                onChange={(e) => setVoltage(+e.target.value)}
              />
              <label>Resistance: {resistance} Ω</label>
              <input
                type="range"
                min={1}
                max={20}
                step={1}
                value={resistance}
                onChange={(e) => setResistance(+e.target.value)}
              />
            </article>

            <article className="card">
              <h3>Ohm’s Law</h3>
              <p>
                <strong>V = I × R</strong>
              </p>
              <p>
                Current: <strong>{current.toFixed(2)} A</strong>
              </p>
              <p>
                Voltage: <strong>{voltage} V</strong>
              </p>
              <p>
                Resistance: <strong>{resistance} Ω</strong>
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
