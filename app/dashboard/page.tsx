"use client"

import { useAuth } from "../../source/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Header from "../../source/components/Header"
import { apiClient } from "../../lib/api/client"

interface ProgressStats {
  experimentsCompleted: string
  totalExperiments: number
  studyTime: number
  achievementLevel: string
  averageScore: number
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [progressStats, setProgressStats] = useState<ProgressStats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchProgressStats = async () => {
      if (user) {
        try {
          const response = await apiClient.getProgressStats()
          console.log('API Response:', response) // Debug log
          
          // Map backend data to dashboard format:
          setProgressStats({
            experimentsCompleted: `${response.completedSimulations}/${response.totalSimulations}`,
            totalExperiments: response.totalSimulations || 0,
            studyTime: response.totalTimeSpent || 0,
            achievementLevel: 'Physics Explorer',
            averageScore: response.averageScore || 0
          })
        } catch (error) {
          console.error('Failed to fetch progress stats:', error)
          // Set default stats on error
          setProgressStats({
            experimentsCompleted: '0/3',
            totalExperiments: 0,
            studyTime: 0,
            achievementLevel: 'Physics Explorer',
            averageScore: 0
          })
        } finally {
          setStatsLoading(false)
        }
      }
    }

    fetchProgressStats()
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p>Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect via useEffect
  }

  return (
    <>
      <Header showAuthNav={true} />

      <main className="container" role="main">
        <section className="hero">
          <h1 className="hero-title">
            Welcome back, <span className="text-accent">{user?.name || "Guest"}</span>!
          </h1>
          <p className="lead">
            Continue your physics journey with our interactive simulations. Track your progress and explore new
            concepts.
          </p>
        </section>

        <section id="experiments" className="section">
          <div className="section-head">
            <h2>Your Physics Lab</h2>
            <p>Choose an experiment to begin your interactive learning experience.</p>
          </div>

          <div className="grid">
            <article className="card">
              <h3 className="card-title">Simple Pendulum</h3>
              <p className="card-text">
                Investigate harmonic motion by adjusting pendulum length, mass, and initial angle. See how parameters
                affect the period and energy conservation.
              </p>
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/1Q15fgz-lUk?si=75oxZc0LWWH2ufSi"
                  title="Simple Pendulum Physics Explained"
                  allowFullScreen
                />
              </div>
              <div className="materials">
                <h4 style={{ color: "var(--fg)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                  Study Materials:
                </h4>
                <a href="https://www.physicsclassroom.com/class/waves/lesson-0/pendulum-motion" target="_blank" rel="noopener noreferrer" className="material-link">
                  📖 Pendulum Theory Guide
                </a>
                <a href="https://physics.info/pendulum/practice.shtml" target="_blank" rel="noopener noreferrer" className="material-link">
                  📊 Lab Worksheet
                </a>
                <a href="https://spoonfeedme.com.au/api/courses/250/cheatsheet.pdf" target="_blank" rel="noopener noreferrer" className="material-link">
                  🧮 Formula Reference
                </a>
              </div>
              <Link className="btn btn-primary" href="/simulations/pendulum">
                Open Simulation
              </Link>
            </article>

            <article className="card">
              <h3 className="card-title">Electrical Circuit</h3>
              <p className="card-text">
                Visualize current flow with a racing car analogy. Experiment with voltage and resistance to understand
                Ohm's law fundamentals.
              </p>
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/r-SCyD7f_zI?si=XgMU-e0mykDdDQnz"
                  title="Ohm's Law and Electrical Circuits"
                  allowFullScreen
                />
              </div>
              <div className="materials">
                <h4 style={{ color: "var(--fg)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Study Materials:</h4>
                <a href="https://www.physicsclassroom.com/class/circuits" target="_blank" rel="noopener noreferrer" className="material-link">
                  ⚡ Circuit Analysis Guide
                </a>
                <a href="https://www.circuitbread.com/study-guides/dc-circuits/circuit-analysis-methods" target="_blank" rel="noopener noreferrer" className="material-link">
                  📋 Ohm's Law Practice
                </a>
                <a href="https://cdn.prod.website-files.com/6634a8f8dd9b2a63c9e6be83/669d61268590a11dfa545fee_369492.image0.jpeg" target="_blank" rel="noopener noreferrer" className="material-link">
                  🔧 Component Reference
                </a>
              </div>
              <Link className="btn btn-primary" href="/simulations/circuit">
                Open Simulation
              </Link>
            </article>

            <article className="card">
              <h3 className="card-title">Cannonball Trajectory</h3>
              <p className="card-text">
                Explore projectile motion by adjusting initial velocity, angle, and air resistance. Observe the
                trajectory and understand the factors affecting its flight.
              </p>
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/1eRimU5befo?si=IWeBpujHAQewFJnJ"
                  title="Projectile Motion Physics"
                  allowFullScreen
                />
              </div>
              <div className="materials">
                <h4 style={{ color: "var(--fg)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Study Materials:</h4>
                <a href="https://www.physicsclassroom.com/class/vectors/lesson-2/what-is-a-projectile" target="_blank" rel="noopener noreferrer" className="material-link">
                  🎯 Projectile Motion Theory
                </a>
                <a href="https://www.omnicalculator.com/physics/trajectory-projectile-motion" target="_blank" rel="noopener noreferrer" className="material-link">
                  📐 Trajectory Calculator
                </a>
                <a href="https://www.physicsclassroom.com/class/newtlaws/Lesson-3/Free-Fall-and-Air-Resistance" target="_blank" rel="noopener noreferrer" className="material-link">
                  🌪️ Air Resistance Effects
                </a>
              </div>
              <Link className="btn btn-primary" href="/simulations/cannonball">
                Open Simulation
              </Link>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>Your Learning Progress</h2>
            <p>Track your achievements and continue building your physics knowledge.</p>
          </div>

          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", maxWidth: "800px" }}
          >
            {statsLoading ? (
              <>
                <div className="card">
                  <h4 style={{ color: "var(--primary)" }}>Loading...</h4>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--fg)", margin: "0.5rem 0" }}>--</div>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>Fetching data...</p>
                </div>
                <div className="card">
                  <h4 style={{ color: "var(--secondary)" }}>Loading...</h4>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--fg)", margin: "0.5rem 0" }}>--</div>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>Fetching data...</p>
                </div>
                <div className="card">
                  <h4 style={{ color: "var(--accent)" }}>Loading...</h4>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--fg)", margin: "0.5rem 0" }}>--</div>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>Fetching data...</p>
                </div>
              </>
            ) : (
              <>
                <div className="card">
                  <h4 style={{ color: "var(--primary)" }}>Experiments Completed</h4>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--fg)", margin: "0.5rem 0" }}>
                    {progressStats?.experimentsCompleted || '0/3'}
                  </div>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>
                    {progressStats?.experimentsCompleted === '3/3' ? 'All simulations unlocked!' : 'Keep exploring!'}
                  </p>
                </div>
                <div className="card">
                  <h4 style={{ color: "var(--secondary)" }}>Study Time</h4>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--fg)", margin: "0.5rem 0" }}>
                    {progressStats?.studyTime || 0}h
                  </div>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>Total time</p>
                </div>
                <div className="card">
                  <h4 style={{ color: "var(--accent)" }}>Achievement Level</h4>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--fg)", margin: "0.5rem 0" }}>
                    {progressStats?.averageScore || 0}
                  </div>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>{progressStats?.achievementLevel || 'Physics Explorer'}</p>
                </div>
              </>
            )}
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
