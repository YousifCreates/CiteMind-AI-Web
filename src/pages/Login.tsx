import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useAuth'
import { ROUTES } from '../constants'
import AuthLayout from '../components/auth/AuthLayout'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { mutate: login, isPending, error } = useLogin()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-[#E8EAED]">Welcome back</h2>
      <p className="text-sm text-[#8B93A7] mt-2 mb-8">
        Sign in to continue your learning paths and chats.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="email"
              className="text-xs font-medium tracking-wide text-[#8B93A7]"
            >
              EMAIL
            </label>
          </div>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-[#0B0E14] border border-[#232838] px-3 py-2.5 text-[#E8EAED] focus:outline-none focus:ring-2 focus:ring-[#4F9DFF] transition"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs font-medium tracking-wide text-[#8B93A7] mb-1"
          >
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-[#0B0E14] border border-[#232838] px-3 py-2.5 text-[#E8EAED] focus:outline-none focus:ring-2 focus:ring-[#4F9DFF] transition"
          />
          <div className="flex justify-end mt-1.5">
              <a
              href="#"
              className="text-xs font-medium text-[#4F9DFF] hover:text-[#7ab6ff] transition"
            >
              Forgot password?
            </a>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-400">
            Invalid email or password. Please try again.
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-[#4F9DFF] text-[#0B0E14] font-semibold py-2.5 hover:opacity-90 disabled:opacity-50 transition"
        >
          {isPending ? 'Signing in...' : 'Sign in'}
        </button>
      </form>


      <p className="text-sm text-[#8B93A7] text-center mt-8">
        New to CiteMind?{' '}
        <Link to={ROUTES.REGISTER} className="text-[#4F9DFF] hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  )
}