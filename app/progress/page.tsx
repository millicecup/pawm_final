"use client"

import { useAuth } from "../../source/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import Header from "../../source/components/Header"

export default function ProgressPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p>Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header showAuthNav={true} />

      <main className="container" role="main">
        <section className="hero">
          <h1 className="hero-title">Your Progress</h1>
          <p className="lead">Track your learning journey and achievements in physics simulations.</p>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>Simulation Progress</h2>
            <p>See how you're doing with each physics experiment.</p>
          </div>

          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}
          >
            <article className="card">
              <h3 className="card-title">Pendulum Motion</h3>
              <p className="card-text">
                Explore simple harmonic motion and gravity effects through pendulum oscillations.
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem 0" }}>
                <span className="badge badge-success">✓ Completed</span>
                <strong style={{ fontSize: "1.5rem", color: "var(--success)" }}>95%</strong>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "95%", background: "green" }}
                />
              </div>
            </article>

            <article className="card">
              <h3 className="card-title">Circuit Analysis</h3>
              <p className="card-text">
                Learn about electrical circuits and current flow using Ohm's Law principles.
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem 0" }}>
                <span className="badge badge-info">⏱ In Progress</span>
                <strong style={{ fontSize: "1.5rem", color: "var(--secondary)" }}>68%</strong>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "68%", background: "var(--secondary)" }} />
              </div>
            </article>

            <article className="card">
              <h3 className="card-title">Projectile Motion</h3>
              <p className="card-text">
                Study projectile motion and ballistics through cannonball trajectory analysis.
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem 0" }}>
                <span className="badge badge-muted">○ Not Started</span>
                <strong style={{ fontSize: "1.5rem", color: "var(--muted)" }}>—</strong>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "0%", background: "var(--muted)" }} />
              </div>
            </article>
          </div>
        </section>

        <section className="section" style={{ marginTop: "4rem" }}>
          <div className="section-head" style={{ marginBottom: "2rem" }}>
            <h2>Overall Statistics</h2>
            <p>Your learning performance across all simulations.</p>
          </div>

          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2rem",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            <div className="card" style={{ padding: "2rem" }}>
              <h4 style={{ color: "var(--primary)", marginBottom: "1rem" }}>Total Progress</h4>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                className="progress-bar"
                style={{
                flex: 1,
                height: "10px",
                background: "rgba(0,0,0,0.08)",
                borderRadius: "5px",
                overflow: "hidden",
                }}
              >
                <div
                className="progress-fill"
                style={{
                  width: "65%",
                  background: "var(--primary)",
                  height: "100%",
                  borderRadius: "5px 0 0 5px",
                  transition: "width 0.4s",
                }}
                />
              </div>
              <strong style={{ fontSize: "1.5rem", color: "var(--primary)" }}>65%</strong>
              </div>
            </div>

            <div className="card" style={{ padding: "2rem" }}>
              <h4 style={{ color: "var(--accent)", marginBottom: "1rem" }}>Average Score</h4>
              <div style={{ fontSize: "2.5rem", fontWeight: "700", color: "var(--accent)" }}>81%</div>
            </div>

            <div className="card" style={{ padding: "2rem" }}>
              <h4 style={{ color: "var(--secondary)", marginBottom: "1rem" }}>Study Time</h4>
              <div style={{ fontSize: "2.5rem", fontWeight: "700", color: "var(--secondary)" }}>4.5h</div>
            </div>
          </div>
        </section>
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
