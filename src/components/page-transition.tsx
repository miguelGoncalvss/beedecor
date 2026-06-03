"use client"

import React from 'react'

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      {children}
    </div>
  )
}
