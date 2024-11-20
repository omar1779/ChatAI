'use client'
import { type Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'

/* export const metadata: Metadata = {
  title: 'Sign Up',
} */

export default function Register() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lead, setLead] = useState('website');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password ,name, lastname, lead}),
    });

    const data = await res.json();
    if (res.ok) {
      console.log('User created successfully', data);
    } else {
      setError(data.message);
      console.log(res)
    }
  };

  return (
    <AuthLayout
      title="Sign up for an account"
      subtitle={
        <>
          Already registered?{' '}
          <Link href="/login" className="text-green-600">
            Sign in
          </Link>{' '}
          to your account.
        </>
      }
    >
      <form onSubmit={handleRegister}>
      {error && <p className='mb-10 text-red-500 font-semibold text-center'>{error}</p>}
        <div className="grid grid-cols-2 gap-6">
          <TextField
            onChange={(e) => setName(e.target.value)}
            label="First name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
          />
          <TextField
            onChange={(e) => setLastname(e.target.value)}
            label="Last name"
            name="last_name"
            type="text"
            autoComplete="family-name"
            required
          />
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            className="col-span-full"
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            className="col-span-full"
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
          <SelectField
            onChange={(e) => setLead(e.target.value)}
            className="col-span-full"
            label="How did you hear about us?"
            name="referral_source"
          >
            <option value={'Website'}>Website</option>
            <option value={'Instagram'}>Instagram</option>
            <option value={'Youtube'}>Youtube</option>
            <option value={'Linkeding'}>Linkedin</option>
            <option value={'Adds'}>Adds</option>
          </SelectField>
        </div>
        <Button type="submit" color="green" className="mt-8 w-full">
          Get started today
        </Button>
      </form>
    </AuthLayout>
  )
}
