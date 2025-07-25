"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left"
}

const SheetContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
} | null>(null)

const Sheet = ({ open = false, onOpenChange, children }: SheetProps) => {
  return (
    <SheetContext.Provider value={{ open, onOpenChange: onOpenChange || (() => {}) }}>{children}</SheetContext.Provider>
  )
}

const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, children, asChild, ...props }, ref) => {
  const context = React.useContext(SheetContext)

  const handleClick = () => {
    context?.onOpenChange(true)
  }

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: handleClick,
      ref,
    })
  }

  return (
    <button ref={ref} className={className} onClick={handleClick} {...props}>
      {children}
    </button>
  )
})
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ side = "right", className, children, ...props }, ref) => {
    const context = React.useContext(SheetContext)

    if (!context?.open) return null

    const sideClasses = {
      top: "top-0 left-0 right-0 h-auto",
      right: "top-0 right-0 h-full w-full sm:max-w-sm",
      bottom: "bottom-0 left-0 right-0 h-auto",
      left: "top-0 left-0 h-full w-full sm:max-w-sm",
    }

    return (
      <>
        {/* Overlay */}
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={() => context.onOpenChange(false)}
        />

        {/* Content */}
        <div
          ref={ref}
          className={cn("fixed z-50 bg-background p-6 shadow-lg transition ease-in-out", sideClasses[side], className)}
          {...props}
        >
          {children}
        </div>
      </>
    )
  },
)
SheetContent.displayName = "SheetContent"

export { Sheet, SheetTrigger, SheetContent }
