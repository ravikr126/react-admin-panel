import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault() // Prevents the default form submission

        try {
            const response = await fetch('http://13.233.139.58/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()
            if (response.ok) {
                // Handle success scenario, such as redirecting to another page or storing the JWT token
                console.log('Login successful:', data)
                navigate('/')
            } else {
                // Handle failure scenario
                setError(data.message || 'An error occurred. Please try again.')
            }
        } catch (error) {
            // Handle network errors
            setError('Network error. Please try again later.')
        }
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring sm:max-w-md lg:max-w-xl">
                <h1 className="text-2xl sm:text-3xl font-semibold text-center uppercase">Sign in</h1>
                <form className="mt-6" onSubmit={handleLogin}>
                    <div className="mb-2">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    {error && <div className="text-sm text-red-500 mb-2">{error}</div>}
                    <a href="#" className="text-xs hover:underline">
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#398DCA] rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    Don't have an account?
                    <a href="#" className="font-medium text-purple-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}
