"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CodeBlockProps {
  code: string
  language: string
  title?: string
}

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const highlightSyntax = (code: string, lang: string) => {
    if (lang === "jan") {
      return code
        .replace(/\b(var|function|if|else|return|while|for)\b/g, '<span class="text-purple-400 font-semibold">$1</span>')
        .replace(/\b(is)\b/g, '<span class="text-blue-400 font-semibold">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="text-green-400">$1</span>')
        .replace(/"([^"]*)"/g, '<span class="text-yellow-400">"$1"</span>')
        .replace(/\b(\+|-|\*|\/|<=|>=|==|!=)\b/g, '<span class="text-red-400">$1</span>')
    }
    return code
  }

  return (
    <Card className="bg-slate-900 border-slate-700">
      {title && (
        <div className="px-4 py-2 border-b border-slate-700">
          <span className="text-sm text-slate-400">{title}</span>
        </div>
      )}
      <CardContent className="p-0">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
          <span className="text-xs text-slate-400 uppercase tracking-wide">{language}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-6 px-2 text-xs"
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <pre className="p-4 text-sm text-slate-300 overflow-x-auto">
          <code
            dangerouslySetInnerHTML={{
              __html: highlightSyntax(code, language)
            }}
          />
        </pre>
      </CardContent>
    </Card>
  )
} 