import Header from '@/components/header/Header'
import LoginForm from '@/components/login-form/LoginForm'
import React from 'react'

export default function LoginPage() {
  return (
    <div className='w-full h-screen flex flex-col bg-blue-100' >
        <Header nombre={''} rol={''} />
        <div className='w-full h-[400px]'>
            <LoginForm/>
        </div>
    </div>
  )
}
