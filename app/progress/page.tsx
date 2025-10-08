"use client"

import { useAuth } from "../../source/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Header from "../../source/components/Header"
import { apiClient } from "../../lib/api/client"

interface ProgressData {
  totalSimulations: number
  completedSimulations: number
  averageScore: number
  totalTimeSpent: number
  recentActivity: any[]
  topScores: any[]
}

interface SimulationProgress {
  id: string
  name: string
  description: string
  completed: boolean
  score: number
  timeSpent: number
  status: 'completed' | 'in-progress' | 'not-started'
}

export default function ProgressPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [progressData, setProgressData] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)

  // Define simulations with their current progress
  const [simulations, setSimulations] = useState<SimulationProgress[]>([
    {
      id: 'pendulum',
      name: 'Pendulum Motion',
      description: 'Explore simple harmonic motion and gravity effects through pendulum oscillations.',
      completed: false,
      score: 0,
      timeSpent: 0,
      status: 'not-started'
    },
    {
      id: 'circuit',
      name: 'Circuit Analysis', 
      description: 'Learn about electrical circuits and current flow using Ohm\'s Law principles.',
      completed: false,
      score: 0,
      timeSpent: 0,
      status: 'not-started'
    },
    {
      id: 'projectile',
      name: 'Projectile Motion',
      description: 'Study projectile motion and ballistics through cannonball trajectory analysis.',
      completed: false,
      score: 0,
      timeSpent: 0,
      status: 'not-started'
    }
  ])

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  useEffect(() => {
    const fetchProgress = async () => {
      if (user) {
        try {
          const response = await apiClient.getProgressStats()
          console.log('Progress API response:', response)
          setProgressData(response)
          
          // Update simulations based on API data
          // For now, since we don't have individual simulation tracking,
          // we'll show 0 progress for new users
          const updatedSimulations = simulations.map(sim => ({
            ...sim,
            completed: false,
            score: 0,
            timeSpent: 0,
            status: 'not-started' as const
          }))
          
          setSimulations(updatedSimulations)
        } catch (error) {
          console.error('Failed to fetch progress:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchProgress()
  }, [user])

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p>{!user ? 'Redirecting to login...' : 'Loading your progress...'}</p>
        </div>
      </div>
    )
  }

  const completionRate = progressData ? 
    Math.round((progressData.completedSimulations / progressData.totalSimulations) * 100) : 0

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
            {simulations.map((sim) => (
              <article key={sim.id} className="card">
                <h3 className="card-title">{sim.name}</h3>
                <p className="card-text">{sim.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem 0" }}>
                  <span className={`badge ${
                    sim.status === 'completed' ? 'badge-success' : 
                    sim.status === 'in-progress' ? 'badge-info' : 'badge-muted'
                  }`}>
                    {sim.status === 'completed' ? '✓ Completed' :
                     sim.status === 'in-progress' ? '⏱ In Progress' : '○ Not Started'}
                  </span>
                  <strong style={{ 
                    fontSize: "1.5rem", 
                    color: sim.status === 'completed' ? "var(--success)" : 
                           sim.status === 'in-progress' ? "var(--secondary)" : "var(--muted)" 
                  }}>
                    {sim.completed ? `${sim.score}%` : '—'}
                  </strong>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ 
                      width: `${sim.completed ? sim.score : 0}%`, 
                      background: sim.status === 'completed' ? "green" : 
                                sim.status === 'in-progress' ? "var(--secondary)" : "var(--muted)"
                    }}
                  />
                </div>
              </article>
            ))}
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
                      width: `${completionRate}%`,
                      background: "var(--primary)",
                      height: "100%",
                      borderRadius: "5px 0 0 5px",
                      transition: "width 0.4s",
                    }}
                  />
                </div>
                <strong style={{ fontSize: "1.5rem", color: "var(--primary)" }}>
                  {completionRate}%
                </strong>
              </div>
            </div>

            <div className="card" style={{ padding: "2rem" }}>
              <h4 style={{ color: "var(--accent)", marginBottom: "1rem" }}>Average Score</h4>
              <div style={{ fontSize: "2.5rem", fontWeight: "700", color: "var(--accent)" }}>
                {progressData?.averageScore || 0}%
              </div>
            </div>

            <div className="card" style={{ padding: "2rem" }}>
              <h4 style={{ color: "var(--secondary)", marginBottom: "1rem" }}>Study Time</h4>
              <div style={{ fontSize: "2.5rem", fontWeight: "700", color: "var(--secondary)" }}>
                {progressData?.totalTimeSpent ? `${(progressData.totalTimeSpent / 60).toFixed(1)}h` : '0h'}
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