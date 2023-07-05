'use client'
import React from 'react'

interface LayoutProps {
    children: React.ReactNode
}

export function MainLayout({children}: LayoutProps) {
  return (
    <>{children}</>
  )
}
