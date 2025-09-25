import Header from "@/components/Header"
import Link from "next/link"

export default function LandingPage() {
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
            <Link className="btn btn-primary" href="/register">
              Get Started
            </Link>
            <Link className="btn btn-secondary" href="#demos">
              View Demos
            </Link>
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
                <iframe src="hhttps://www.youtube.com/embed/1Q15fgz-lUk?si=75oxZc0LWWH2ufSi" title="Pendulum Physics Demo" allowFullScreen />
              </div>
              <Link className="btn btn-ghost" href="/register">
                Try Simulation
              </Link>
            </article>

            <article className="card">
              <h3 className="card-title">Electrical Circuit</h3>
              <p className="card-text">
                Visualize current flow with a racing car analogy. Experiment with voltage and resistance to understand
                Ohm's law fundamentals.
              </p>
              <div className="video-container">
                <iframe src="https://www.youtube.com/embed/r-SCyD7f_zI?si=XgMU-e0mykDdDQnz" title="Circuit Physics Demo" allowFullScreen />
              </div>
              <Link className="btn btn-ghost" href="/register">
                Try Simulation
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
                  title="Projectile Motion Demo"
                  allowFullScreen
                />
              </div>
              <Link className="btn btn-ghost" href="/register">
                Try Simulation
              </Link>
            </article>
          </div>
        </section>

        <section id="demos" className="section">
          <div className="section-head">
            <h2>Why Choose Our Platform?</h2>
            <p>Built for deep understanding with realistic physics models</p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", maxWidth: "800px" }}>
            <div className="card">
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  margin: "0 auto 1rem",
                  background: "rgba(149, 117, 210, 0.2)",
                }}
              ></div>
              <h4>Real Physics</h4>
              <p>Accurate mathematical models with real-world factors like friction and air resistance</p>
            </div>
            <div className="card">
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  margin: "0 auto 1rem",
                  background: "rgba(42, 101, 190, 0.2)",
                }}
              ></div>
              <h4>Interactive Learning</h4>
              <p>Adjust parameters in real time and see immediate visual feedback</p>
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
