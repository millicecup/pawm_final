"use client"

import { useAuth } from "../../source/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Header from "../../source/components/Header"
import { apiClient } from "../../lib/api/client"

interface Achievement {
  _id: string
  type: string
  title: string
  description: string
  icon: string
  points: number
  rarity: string
  unlockedAt: string
}

interface LeaderboardEntry {
  userId: string
  name: string
  avatar?: string
  totalPoints: number
  achievementCount: number
}

export default function AchievementsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [stats, setStats] = useState<any>(null)
  const [dataLoading, setDataLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'achievements' | 'leaderboard'>('achievements')

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          // Fetch user achievements
          const achievementsResponse = await fetch('/api/achievements', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
          })
          
          if (achievementsResponse.ok) {
            const achievementsData = await achievementsResponse.json()
            setAchievements(achievementsData.achievements)
            setStats(achievementsData.stats)
          }

          // Fetch leaderboard
          const leaderboardResponse = await fetch('/api/achievements/leaderboard?limit=10')
          if (leaderboardResponse.ok) {
            const leaderboardData = await leaderboardResponse.json()
            setLeaderboard(leaderboardData.leaderboard)
          }
        } catch (error) {
          console.error('Failed to fetch achievements data:', error)
        } finally {
          setDataLoading(false)
        }
      }
    }

    fetchData()
  }, [user])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600'
      case 'uncommon': return 'text-green-600'
      case 'rare': return 'text-blue-600'
      case 'epic': return 'text-purple-600'
      case 'legendary': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100'
      case 'uncommon': return 'bg-green-100'
      case 'rare': return 'bg-blue-100'
      case 'epic': return 'bg-purple-100'
      case 'legendary': return 'bg-yellow-100'
      default: return 'bg-gray-100'
    }
  }

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p>Fetching your achievements...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Header showAuthNav={true} />

      <main className="container" role="main">
        <section className="hero" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="hero-title">
            🏆 Achievements & <span className="text-accent">Leaderboard</span>
          </h1>
          <p className="lead">
            Track your progress and compete with other physics enthusiasts!
          </p>
        </section>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'achievements' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Achievements
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'leaderboard' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Leaderboard
            </button>
          </div>
        </div>

        {activeTab === 'achievements' && (
          <>
            {/* Stats Overview */}
            {stats && (
              <section className="section">
                <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", maxWidth: "600px", margin: "0 auto" }}>
                  <div className="card text-center">
                    <h3 style={{ color: "var(--primary)", margin: "0 0 0.5rem 0" }}>Total Achievements</h3>
                    <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--fg)" }}>{stats.total}</div>
                  </div>
                  <div className="card text-center">
                    <h3 style={{ color: "var(--secondary)", margin: "0 0 0.5rem 0" }}>Total Points</h3>
                    <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--fg)" }}>{stats.totalPoints}</div>
                  </div>
                  <div className="card text-center">
                    <h3 style={{ color: "var(--accent)", margin: "0 0 0.5rem 0" }}>Legendary</h3>
                    <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--fg)" }}>{stats.byRarity?.legendary || 0}</div>
                  </div>
                </div>
              </section>
            )}

            {/* Achievements Grid */}
            <section className="section">
              <div className="section-head">
                <h2>Your Achievements</h2>
                <p>Unlock more achievements by exploring different simulations and reaching milestones.</p>
              </div>

              {achievements.length > 0 ? (
                <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
                  {achievements.map((achievement) => (
                    <div key={achievement._id} className={`card ${getRarityBg(achievement.rarity)}`}>
                      <div className="flex items-start space-x-3">
                        <div style={{ fontSize: "2rem" }}>{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold">{achievement.title}</h3>
                            <span className={`text-sm font-medium ${getRarityColor(achievement.rarity)}`}>
                              {achievement.rarity.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{achievement.description}</p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-blue-600">+{achievement.points} points</span>
                            <span className="text-gray-500">
                              {new Date(achievement.unlockedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card text-center">
                  <h3>No achievements yet</h3>
                  <p>Complete your first simulation to unlock your first achievement!</p>
                  <Link href="/dashboard" className="btn btn-primary" style={{ marginTop: "1rem" }}>
                    Start Learning
                  </Link>
                </div>
              )}
            </section>
          </>
        )}

        {activeTab === 'leaderboard' && (
          <section className="section">
            <div className="section-head">
              <h2>Global Leaderboard</h2>
              <p>See how you rank against other physics enthusiasts worldwide.</p>
            </div>

            {leaderboard.length > 0 ? (
              <div className="card">
                <div className="space-y-4">
                  {leaderboard.map((entry, index) => (
                    <div key={entry.userId} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-500 text-white' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {index + 1}
                      </div>
                      
                      {entry.avatar && (
                        <img 
                          src={entry.avatar} 
                          alt={entry.name}
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      
                      <div className="flex-1">
                        <div className="font-semibold">{entry.name}</div>
                        <div className="text-sm text-gray-600">{entry.achievementCount} achievements</div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{entry.totalPoints}</div>
                        <div className="text-sm text-gray-500">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="card text-center">
                <h3>Leaderboard Loading...</h3>
                <p>Check back soon to see the top performers!</p>
              </div>
            )}
          </section>
        )}
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