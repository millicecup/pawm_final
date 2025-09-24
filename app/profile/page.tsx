"use client"

import { useAuth } from "../../source/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Header from "../../source/components/Header"

export default function ProfilePage() {
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
                    September 2024
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>Learning Statistics</h3>
              <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Simulations Completed:</span>
                  <strong style={{ color: "var(--primary)" }}>3</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Total Study Time:</span>
                  <strong style={{ color: "var(--secondary)" }}>2.5 hours</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Average Score:</span>
                  <strong style={{ color: "var(--accent)" }}>94%</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Current Streak:</span>
                  <strong style={{ color: "var(--primary)" }}>7 days</strong>
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
