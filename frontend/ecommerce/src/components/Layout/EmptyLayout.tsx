'use client'
import React from 'react'

interface LayoutProps {
    children: React.ReactNode
}

export default function EmptyLayout({children} : LayoutProps) {
  return (
    <>{children}</>
  )
}
