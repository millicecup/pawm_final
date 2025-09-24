"use client"

import Header from "@/components/Header"

export default function ProgressPage() {
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
            style={{
              background: "rgba(24, 24, 27, 0.9)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
                gap: "0.75rem",
                padding: "0.8rem 1rem",
                background: "#151518",
                color: "#d4d4d8",
                fontWeight: "600",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div>Experiment</div>
              <div>Status</div>
              <div>Score</div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
                gap: "0.75rem",
                padding: "0.8rem 1rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div>Simple Pendulum</div>
              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "999px",
                    background: "rgba(149, 117, 210, 0.16)",
                    color: "#dcfce7",
                    border: "1px solid rgba(149, 117, 210, 0.35)",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                  }}
                >
                  Completed
                </span>
              </div>
              <div>95%</div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
                gap: "0.75rem",
                padding: "0.8rem 1rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div>Electrical Circuit</div>
              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "999px",
                    background: "rgba(42, 101, 190, 0.16)",
                    color: "#dbeafe",
                    border: "1px solid rgba(42, 101, 190, 0.35)",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                  }}
                >
                  In Progress
                </span>
              </div>
              <div>78%</div>
            </div>

            <div
              style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "0.75rem", padding: "0.8rem 1rem" }}
            >
              <div>Cannonball Trajectory</div>
              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "999px",
                    background: "#1f1f23",
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                  }}
                >
                  Not Started
                </span>
              </div>
              <div>-</div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>Achievements</h2>
            <p>Unlock badges as you master physics concepts.</p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏆</div>
              <h4>First Simulation</h4>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>Completed your first physics experiment</p>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚡</div>
              <h4>Circuit Master</h4>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>Mastered electrical circuit principles</p>
            </div>
            <div className="card" style={{ textAlign: "center", opacity: 0.5 }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎯</div>
              <h4>Trajectory Expert</h4>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>Master projectile motion (Locked)</p>
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
