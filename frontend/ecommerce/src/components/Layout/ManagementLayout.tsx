'use client'
import React from 'react'

interface LayoutProps {
    children: React.ReactNode
}

const ManagementLayout = ({children}: LayoutProps) => {
  return (
    <>{children}</>
  )
}

export default ManagementLayout;
