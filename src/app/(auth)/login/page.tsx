'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import React, { useState ,useEffect} from 'react'
import Link from 'next/link'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'

export default function Login() {
  const { data: session, status } = useSession()
  console.log(session)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const [loading, setLoading] = useState(true) // Estado para el loader

  // Simular un retraso de 1 segundo
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000) // 1 segundo de retraso

    return () => clearTimeout(timer) // Limpiar el timeout
  }, [])
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      setError('Invalid credentials')
    } else {
      window.location.href = '/'
    }
  }

  // Verifica si la sesión está cargando
  if (status === 'loading' || loading) {
    return (
      <AuthLayout
      title="Sign in to your account"
      subtitle={
        <>
          Don’t have an account?{' '}
          <Link href="/register" className="-600">
            Sign up
          </Link>{' '}
          for a free trial.
        </>
      }
    >
      <form className='flex justify-center items-center'>
      <div className='h-3/5 w-3/5'>
        <svg
        className="fill-current "
          version="1.1"
          id="L7"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enable-background="new 0 0 100 100"
          xmlSpace="preserve"
        >
          <path
            fill="#16a34a"
            d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
      c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="2s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </path>
          <path
            fill="#16a34a"
            d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
      c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="1s"
              from="0 50 50"
              to="-360 50 50"
              repeatCount="indefinite"
            />
          </path>
          <path
            fill="#16a34a"
            d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
      L82,35.7z"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="2s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
      </form>
    </AuthLayout>
     
    )
  }

  // Si el usuario está autenticado, muestra el perfil y el botón para cerrar sesión
  if (session) {
    return (
      <AuthLayout
        title="Your Profile"
        subtitle={
          <>
            Welcome, <span className="-600">{session.user?.name}</span>
          </>
        }
      >
        <div className="space-y-6">
          <p className="text-lg font-semibold">
            Your Current Plan is : {'Plan Business'}
          </p>
          <Button
            color="green"
            className="mt-8 w-full"
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            Cerrar sesión
          </Button>
        </div>
      </AuthLayout>
    )
  }

  // Si el usuario no está autenticado, muestra el formulario de inicio de sesión
  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle={
        <>
          Don’t have an account?{' '}
          <Link href="/register" className="text-green-600">
            Sign up
          </Link>{' '}
          for a free trial.
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        {error && (
          <p className="mb-10 text-center font-semibold text-red-500">
            {error}
          </p>
        )}
        <div className="space-y-6">
          <TextField
            onChange={e => setEmail(e.target.value)}
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            onChange={e => setPassword(e.target.value)}
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <Button type="submit" color="green" className="mt-8 w-full">
          Sign in to your account
        </Button>
      </form>
    </AuthLayout>
  )
}


