"use client"

import * as React from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

const oauthProviders = [
  { name: "Google", strategy: "google", icon: "google" },
  { name: "Github", strategy: "github", icon: "gitHub" },
] satisfies {
  name: string
  icon: keyof typeof Icons
  strategy: string
}[]

export function OAuthSignIn() {
  const [loading, setLoading] = React.useState<string | null>(null)

  async function oauthSignIn(provider: string) {
    setLoading(provider) 
    try {
      await signIn(provider, { callbackUrl: "/" }) 
    } catch (err) {
      setLoading(null) 
      console.error("Error during authentication:", err)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon] 
        return (
          <Button
            key={provider.strategy}
            variant="outline"
            className="w-full bg-background"
            onClick={() => void oauthSignIn(provider.strategy)} 
            disabled={loading !== null} 
          >
            {loading === provider.strategy ? (
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Icon className="mr-2 size-4" aria-hidden="true" /> 
            )}
            {provider.name} 
            <span className="sr-only">{provider.name}</span> 
          </Button>
        )
      })}
    </div>
  )
}


///https://pythontutor.com/java.html#mode=edit