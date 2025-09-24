import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./lib/auth"
import { ThemeProvider } from "./components/theme-provider"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import Dashboard from "./pages/dashboard"
import Profile from "./pages/profile"
import Progress from "./pages/progress"
import PendulumSimulation from "./pages/simulations/pendulum"
import CircuitSimulation from "./pages/simulations/circuit"
import CannonballSimulation from "./pages/simulations/cannonball"
import "./globals.css"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/simulations/pendulum" element={<PendulumSimulation />} />
              <Route path="/simulations/circuit" element={<CircuitSimulation />} />
              <Route path="/simulations/cannonball" element={<CannonballSimulation />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
