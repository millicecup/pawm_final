"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "../source/lib/auth"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "📊" },
  { name: "Simulations", href: "/simulations", icon: "🔬" },
  { name: "Progress", href: "/progress", icon: "📈" },
  { name: "Profile", href: "/profile", icon: "👤" },
]

export default function SidebarNav() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <div className="sidebar">
      <div className="brand mb-8">
        <img src="/assets/brand.png" alt="Physics Virtual Lab" className="w-8 h-8 rounded-lg" />
        <span className="brand-name">Physics Lab</span>
      </div>

      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">Welcome back,</p>
        <p className="font-semibold">{user?.name}</p>
      </div>

      <nav className="sidebar-nav">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`sidebar-nav-item ${pathname === item.href ? "active" : ""}`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-8">
        <button
          onClick={logout}
          className="sidebar-nav-item w-full text-left text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <span className="text-lg">🚪</span>
          Logout
        </button>
      </div>
    </div>
  )
}
