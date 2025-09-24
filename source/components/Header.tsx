"use client"

import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/source/lib/auth"

interface HeaderProps {
  showAuthNav?: boolean
}

export default function Header({ showAuthNav = false }: HeaderProps) {
  const { user, logout } = useAuth()

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <div className="brand">
          <Image src="/assets/brand.png" alt="Physics Virtual Lab" className="brand-logo" width={36} height={36} />
          <span className="brand-name">Physics Virtual Lab</span>
        </div>

        {showAuthNav && user && (
          <nav className="main-nav" aria-label="Main">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/progress">Progress</Link>
            <Link href="/profile">Profile</Link>
            <button onClick={logout} className="btn btn-ghost" style={{ padding: ".5rem .75rem", fontSize: "0.9rem" }}>
              Logout
            </button>
          </nav>
        )}

        {!user && (
          <nav className="main-nav" aria-label="Main">
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </nav>
        )}
      </div>
    </header>
  )
}
