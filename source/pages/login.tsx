"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    // Simple validation - just check if fields are filled
    if (!email.trim()) {
      setError("Please enter your email")
      return
    }
    if (!password.trim()) {
      setError("Please enter your password")
      return
    }
    
    login(email, password)
    router.push("/dashboard")
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="brand" style={{ justifyContent: "center", marginBottom: "2rem" }}>
          <Image src="/assets/brand.png" alt="Physics Virtual Lab" className="brand-logo" width={36} height={36} />
          <span className="brand-name">Physics Virtual Lab</span>
        </div>

        <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "var(--fg)" }}>Welcome Back</h1>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ 
              backgroundColor: "var(--destructive)", 
              color: "var(--destructive-foreground)", 
              padding: "0.75rem", 
              borderRadius: "0.5rem", 
              marginBottom: "1rem",
              textAlign: "center"
            }}>
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginBottom: "1rem" }}>
            Sign In
          </button>
        </form>

        <p style={{ textAlign: "center", color: "var(--muted)" }}>
          Don't have an account?{" "}
          <Link href="/register" style={{ color: "var(--secondary)", textDecoration: "none" }}>
            Sign up
          </Link>
        </p>

        <p style={{ textAlign: "center", color: "var(--muted)", marginTop: "1rem" }}>
          <Link href="/" style={{ color: "var(--secondary)", textDecoration: "none" }}>
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  )
}
