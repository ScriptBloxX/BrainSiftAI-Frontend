"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
    email: string
    name: string
    role: "user" | "admin" | "sadmin"
    plan: "free" | "pro" | "enterprise"
    profile: {
        avatar?: string
        bio?: string
        joinedAt: string
        language?: string
        timezone?: string
    }
}

type AuthContextType = {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (user: Omit<User, "profile" | "role"> & { profile?: Partial<User["profile"]>; role?: User["role"] }) => void
    logout: () => void
    updateProfile: (profile: Partial<User["profile"]>) => void
    updateUser: (userData: Partial<Omit<User, "profile">>) => void
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: () => { },
    logout: () => { },
    updateProfile: () => { },
    updateUser: () => { },
})

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check if user is stored in localStorage
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (error) {
                console.error("Failed to parse stored user:", error)
                localStorage.removeItem("user")
            }
        }
        setIsLoading(false)
    }, [])

    const login = (
        userData: Omit<User, "profile" | "role"> & { profile?: Partial<User["profile"]>; role?: User["role"] },
    ) => {
        // Create a complete user object with default values for missing fields
        const completeUser: User = {
            ...userData,
            role: userData.role || "user",
            profile: {
                avatar: "/placeholder.svg?height=200&width=200",
                bio: "",
                joinedAt: new Date().toISOString(),
                language: "english",
                timezone: "utc",
                ...userData.profile,
            },
        }

        setUser(completeUser)
        localStorage.setItem("user", JSON.stringify(completeUser))
    }

    const updateProfile = (profileData: Partial<User["profile"]>) => {
        if (!user) return

        const updatedUser = {
            ...user,
            profile: {
                ...user.profile,
                ...profileData,
            },
        }

        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
    }

    const updateUser = (userData: Partial<Omit<User, "profile">>) => {
        if (!user) return

        const updatedUser = {
            ...user,
            ...userData,
        }

        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
                updateProfile,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

