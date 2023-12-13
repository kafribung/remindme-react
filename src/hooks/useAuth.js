import { useState, useEffect, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import getAxios from '../lib/getAxios'
import { useCookies } from 'react-cookie'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    // State
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Cookies
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

    // Router
    const router = useRouter()

    // Checkauth
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const access_token = cookies.access_token
                if (access_token) {
                    getAxios.defaults.headers.Authorization = `Bearer ${access_token}`
                    const response = await getAxios.get('/user')
                    if (response) setUser(response)
                }
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        checkAuth()
    }, [])

    // CSRF
    const csrf = () => getAxios.get('/sanctum/csrf-cookie')

    // Login
    const login = async (credentials) => {
        try {
            await csrf()
            const response = await getAxios.post('/login', credentials)
            const { data: { access_token, refresh_token, user } } = response.data

            if (access_token) {
                // setCookie('refresh_token', refresh_token);
                setCookie('access_token', access_token);
                setUser(user)
                router.push('/')
            }
        } catch (error) {
            setError(error.response.data.msg)
        }
    }

    // Logout
    const logout = async () => {
        try {
            const access_token = cookies.access_token
            if (access_token) {
                getAxios.defaults.headers.Authorization = `Bearer ${access_token}`
                const response = await getAxios.post('/logout')
                if (response) {
                    setUser(null)
                    removeCookie('access_token')
                    router.push('/login')
                }
            }
        } catch (error) {
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
