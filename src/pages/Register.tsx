import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRegister } from '../hooks/useAuth'
import { ROUTES } from '../constants'
import AuthLayout from '../components/auth/AuthLayout'

export default function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { mutate: register, isPending, error } = useRegister()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    register({ email, password, full_name: fullName || undefined })
  }

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-[#E8EAED] mb-8">Create your CiteMind account</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm text-[#8B93A7] mb-1">
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-md bg-[#12161F] border border-[#232838] px-3 py-2 text-[#E8EAED] focus:outline-none focus:ring-2 focus:ring-[#4F9DFF]"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-[#8B93A7] mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md bg-[#12161F] border border-[#232838] px-3 py-2 text-[#E8EAED] focus:outline-none focus:ring-2 focus:ring-[#4F9DFF]"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm text-[#8B93A7] mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md bg-[#12161F] border border-[#232838] px-3 py-2 text-[#E8EAED] focus:outline-none focus:ring-2 focus:ring-[#4F9DFF]"
          />
        </div>

        {error && (
          <p className="text-sm text-red-400">
            Registration failed. That email may already be in use.
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-[#4F9DFF] text-[#0B0E14] font-medium py-2 hover:opacity-90 disabled:opacity-50 transition"
        >
          {isPending ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="text-sm text-[#8B93A7] mt-6">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="text-[#4F9DFF] hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}