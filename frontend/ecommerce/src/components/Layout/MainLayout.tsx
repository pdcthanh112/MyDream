 
import React from 'react'

interface LayoutProps {
    children: React.ReactNode
}

const MainLayout = ({children}: LayoutProps) => {
  return (
    <>{children}</>
  )
}

export default MainLayout;
