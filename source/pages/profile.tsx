"use client"

import Header from "@/components/Header"
import { useAuth } from "@/lib/auth"

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <>
      <Header showAuthNav={true} />

      <main className="container" role="main">
        <section className="hero">
          <h1 className="hero-title">Profile</h1>
          <p className="lead">Manage your account and learning preferences.</p>
        </section>

        <section className="section">
          <div className="grid" style={{ gridTemplateColumns: "1fr", maxWidth: "600px" }}>
            <div className="card">
              <h3>Account Information</h3>
              <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--fg)", fontWeight: "600" }}>
                    Full Name
                  </label>
                  <div
                    style={{
                      padding: "0.75rem",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      background: "rgba(24, 24, 27, 0.5)",
                      color: "var(--muted)",
                    }}
                  >
                    {user?.name || "Guest User"}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--fg)", fontWeight: "600" }}>
                    Email
                  </label>
                  <div
                    style={{
                      padding: "0.75rem",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      background: "rgba(24, 24, 27, 0.5)",
                      color: "var(--muted)",
                    }}
                  >
                    {user?.email || "guest@example.com"}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--fg)", fontWeight: "600" }}>
                    Member Since
                  </label>
                  <div
                    style={{
                      padding: "0.75rem",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      background: "rgba(24, 24, 27, 0.5)",
                      color: "var(--muted)",
                    }}
                  >
                    January 2024
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>Learning Statistics</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginTop: "1rem" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--primary)" }}>3</div>
                  <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Simulations Accessed</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--secondary)" }}>15</div>
                  <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Hours Studied</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--accent)" }}>2</div>
                  <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Achievements</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--primary)" }}>89%</div>
                  <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Average Score</div>
                </div>
              </div>
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
