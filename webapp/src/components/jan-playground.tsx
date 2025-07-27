"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

const defaultCode = `// Welcome to Jan Language!
// Try writing some code below

var x is 42
var message is "Hello from Jan!"

message
x + 8`

export function JanPlayground() {
  const [code, setCode] = useState(defaultCode)
  const [output, setOutput] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runCode = async () => {
    setIsRunning(true)
    setError(null)
    setOutput([])

    try {
      // For now, we'll simulate running Jan code
      // In a real implementation, this would call the Jan interpreter
      const lines = code.split('\n').filter(line => line.trim())
      const results: string[] = []
      
      for (const line of lines) {
        if (line.trim().startsWith('//')) continue // Skip comments
        
        // Simple simulation of Jan execution
        if (line.includes('var') && line.includes('is')) {
          // Variable declaration
          const match = line.match(/var\s+(\w+)\s+is\s+(.+)/)
          if (match) {
            const [, varName, value] = match
            results.push(`✓ Declared ${varName} = ${value.trim()}`)
          }
        } else if (line.includes('function')) {
          // Function declaration
          const match = line.match(/function\s+(\w+)\s+(\w+)/)
          if (match) {
            const [, funcName, param] = match
            results.push(`✓ Defined function ${funcName}(${param})`)
          }
        } else if (line.trim() && !line.includes('if') && !line.includes('else')) {
          // Expression or function call
          const trimmed = line.trim()
          if (trimmed.includes('"')) {
            results.push(`→ ${trimmed}`)
          } else if (trimmed.match(/\d+/)) {
            results.push(`→ ${trimmed}`)
          } else {
            results.push(`→ Executed: ${trimmed}`)
          }
        }
      }
      
      setOutput(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsRunning(false)
    }
  }

  const clearOutput = () => {
    setOutput([])
    setError(null)
  }

  const loadExample = (exampleCode: string) => {
    setCode(exampleCode)
    setOutput([])
    setError(null)
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Code Editor</span>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => loadExample(`function greet name
    return "Hello, " + name + "!"

var message is greet "World"
message`)}
                >
                  Hello World
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => loadExample(`var a is 10
var b is 5
var sum is a + b
sum`)}
                >
                  Calculator
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your Jan code here..."
              className="min-h-[300px] font-mono text-sm bg-slate-900 border-slate-600 text-slate-200"
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Jan Language</Badge>
                <span className="text-sm text-slate-400">
                  {code.split('\n').length} lines
                </span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearOutput}
                >
                  Clear Output
                </Button>
                <Button
                  onClick={runCode}
                  disabled={isRunning}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isRunning ? "Running..." : "Run Code"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Output</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-[300px] bg-slate-900 border border-slate-600 rounded-md p-4 font-mono text-sm">
              {error ? (
                <div className="text-red-400">
                  <div className="font-semibold mb-2">Error:</div>
                  <div>{error}</div>
                </div>
              ) : output.length > 0 ? (
                <div className="space-y-1">
                  {output.map((line, index) => (
                    <div key={index} className="text-slate-300">
                      {line}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-slate-500 italic">
                  Output will appear here when you run your code...
                </div>
              )}
            </div>
            <div className="mt-4 text-xs text-slate-400">
              <p>💡 This is a simulation. In a real implementation, this would run the actual Jan interpreter.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Examples */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Quick Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-300">Variables</h4>
              <pre className="text-xs text-slate-400 bg-slate-900 p-2 rounded">
{`var x is 42
var name is "Jan"
x + 10`}
              </pre>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-300">Functions</h4>
              <pre className="text-xs text-slate-400 bg-slate-900 p-2 rounded">
{`function add a b
    return a + b

add 5 3`}
              </pre>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-300">Conditionals</h4>
              <pre className="text-xs text-slate-400 bg-slate-900 p-2 rounded">
{`var x is 15
if x > 10
    "x is large"
else
    "x is small"`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 