"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
    id: number;
    email: string
    name: string
    role: "user" | "admin" | "sadmin"
    plan: "free" | "pro" | "enterprise"
    isEmailVerified: boolean
    profile: {
        avatar?: string
        bio?: string
        joinedAt: string
        language?: string
        timezone?: string
    }
    token?: string
    profileUrl?: string
}

type AuthContextType = {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (user: {
        id: number;
        email: string
        name: string
        token: string
        role: User["role"]
        plan: User["plan"]
        isEmailVerified: boolean
        profileUrl?: string
    }) => void
    logout: () => void
    updateProfile: (profile: Partial<User["profile"]>) => void
    updateUser: (userData: Partial<Omit<User, "profile">>) => void
    getToken: () => string | null
}
const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: () => { },
    logout: () => { },
    updateProfile: () => { },
    updateUser: () => { },
    getToken: () => null,
})

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
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

    const login = ({
        id,
        email,
        name,
        token,
        role,
        plan,
        isEmailVerified,
        profileUrl,
    }: {
        id: number;
        email: string
        name: string
        token: string
        role: User["role"]
        plan: User["plan"]
        isEmailVerified: boolean
        profileUrl?: string
    }) => {
        const completeUser: User = {
            id,
            email,
            name,
            token,
            role,
            plan,
            isEmailVerified,
            profile: {
                avatar: profileUrl || "/placeholder.svg?height=200&width=200",
                bio: "",
                joinedAt: new Date().toISOString(),
                language: "english",
                timezone: "utc",
            },
        }

        setUser(completeUser)
        console.log('set,',completeUser)
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
                getToken: () => user?.token || null,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
