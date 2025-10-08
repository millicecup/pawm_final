"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../../source/lib/auth"
import { apiClient } from "../../../lib/api/client"

export default function AuthCallback() {
  const router = useRouter()
  const { loading } = useAuth()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get token from URL parameters
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token')
        const error = urlParams.get('error')

        if (error) {
          console.error('OAuth error:', error)
          router.push(`/login?error=${error}`)
          return
        }

        if (token) {
          // Set token and verify user
          apiClient.setToken(token)
          const response = await apiClient.verifyToken()
          
          if (response.user) {
            // Redirect to dashboard on successful authentication
            router.push('/dashboard')
          } else {
            throw new Error('Failed to verify user')
          }
        } else {
          throw new Error('No token received')
        }
      } catch (error) {
        console.error('Callback handling error:', error)
        router.push('/login?error=callback_failed')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-2">Completing sign in...</h1>
        <p className="text-gray-600">Please wait while we verify your account.</p>
      </div>
    </div>
  )
}