"use client"

import Link from "next/link"
import { useAuth } from "../source/lib/auth"
import Header from "../source/components/Header"

export default function LandingPage() {
  const { user } = useAuth()

  return (
    <>
      <Header />

      <main className="container" role="main">
        <section className="hero">
          <span className="badge">⚡ Interactive Physics Education Platform</span>
          <h1 className="hero-title">
            Master Physics Through <span className="text-accent">Interactive</span> Simulations
          </h1>
          <p className="lead">
            Explore fundamental physics concepts through hands‑on virtual experiments. Adjust parameters, observe
            real‑time changes, and deepen your understanding in our immersive lab environment.
          </p>
          <div className="hero-actions">
            {user ? (
              <Link className="btn btn-primary" href="/dashboard">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link className="btn btn-primary" href="/register">
                  Get Started
                </Link>
                <Link className="btn btn-secondary" href="#demos">
                  View Demos
                </Link>
              </>
            )}
          </div>
        </section>

        <section id="experiments" className="section">
          <div className="section-head">
            <h2>Available Experiments</h2>
            <p>Each simulation is designed to demonstrate core physics principles with precision and clarity.</p>
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
                  src="https://www.youtube.com/embed/yVkdfJ9PkRQ" 
                  title="Simple Pendulum Physics Explained" 
                  allowFullScreen 
                />
              </div>
              <Link className="btn btn-ghost" href={user ? "/simulations/pendulum" : "/register"}>
                {user ? "Open Simulation" : "Try Simulation"}
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
                  src="https://www.youtube.com/embed/8mAITcNt710" 
                  title="Ohm's Law and Electrical Circuits" 
                  allowFullScreen 
                />
              </div>
              <Link className="btn btn-ghost" href={user ? "/simulations/circuit" : "/register"}>
                {user ? "Open Simulation" : "Try Simulation"}
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
                  src="https://www.youtube.com/embed/R-WdnCJLhQE" 
                  title="Projectile Motion Physics" 
                  allowFullScreen 
                />
              </div>
              <Link className="btn btn-ghost" href={user ? "/simulations/cannonball" : "/register"}>
                {user ? "Open Simulation" : "Try Simulation"}
              </Link>
            </article>
          </div>
        </section>

        <section id="features" className="section">
          <div className="section-head">
            <h2>Why Choose Our Platform?</h2>
            <p>Designed specifically for physics education with cutting‑edge simulation technology.</p>
          </div>

          <div className="grid">
            <div className="feature">
              <div className="feature-icon">🔬</div>
              <h3>Real‑Time Physics</h3>
              <p>Watch physics principles unfold in real‑time with accurate mathematical models and visual feedback.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🎯</div>
              <h3>Interactive Learning</h3>
              <p>Hands‑on experimentation with adjustable parameters to explore cause‑and‑effect relationships.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">�</div>
              <h3>Data Analysis</h3>
              <p>Built‑in graphing and measurement tools to analyze results and understand physical phenomena.</p>
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