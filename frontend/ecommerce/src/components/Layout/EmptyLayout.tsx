'use client'
import React from 'react'

interface LayoutProps {
    children: React.ReactNode
}

export function EmptyLayout({children} : LayoutProps) {
  return (
    <div>{children}</div>
  )
}
