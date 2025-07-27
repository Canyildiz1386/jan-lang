import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { JanPlayground } from "@/components/jan-playground"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🌱</div>
              <div>
                <h1 className="text-2xl font-bold text-white">Jan Language</h1>
                <p className="text-slate-400">A minimal, elegant scripting language</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">v1.0.0</Badge>
              <Button variant="outline" size="sm">
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Simple. Powerful. Beautiful.
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Jan is a minimal, elegant scripting language designed to be simple, powerful, and beautiful. 
            Inspired by Python, reimagined for clarity and fun.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Try Jan Online
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/docs">View Documentation</a>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Clean Syntax</CardTitle>
              <CardDescription className="text-slate-400">
                Readable and expressive, just like you always wanted.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Dynamic Typing</CardTitle>
              <CardDescription className="text-slate-400">
                No boilerplate, just write and run.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Designed with ❤️</CardTitle>
              <CardDescription className="text-slate-400">
                Because programming should feel good.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Language Showcase */}
        <Tabs defaultValue="playground" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800">
            <TabsTrigger value="playground">Live Playground</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="playground" className="mt-6">
            <JanPlayground />
          </TabsContent>
          
          <TabsContent value="examples" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Hello World</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    code={`function greet name
    return "Hello, " + name + "!"

var message is greet "World"
message`}
                    language="jan"
                  />
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    code={`var a is 10
var b is 5

var sum is a + b
var product is a * b

sum
product`}
                    language="jan"
                  />
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Fibonacci</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    code={`function fib n
    if n <= 1
        return n
    else
        return fib n - 1 + fib n - 2

var result is fib 10
result`}
                    language="jan"
                  />
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Conditionals</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    code={`var x is 15

if x > 10
    "x is greater than 10"
else
    "x is 10 or less"`}
                    language="jan"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="docs" className="mt-6">
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Variables</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">
                    Declare variables using the <code className="bg-slate-700 px-1 rounded">var</code> keyword and <code className="bg-slate-700 px-1 rounded">is</code> for assignment.
                  </p>
                  <CodeBlock
                    code={`var x is 42
var message is "Hello, World!"
var result is x + 10`}
                    language="jan"
                  />
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Functions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">
                    Define functions with the <code className="bg-slate-700 px-1 rounded">function</code> keyword, followed by name and parameter.
                  </p>
                  <CodeBlock
                    code={`function greet name
    return "Hello, " + name + "!"

var message is greet "World"`}
                    language="jan"
                  />
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Control Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">
                    Use <code className="bg-slate-700 px-1 rounded">if</code> and <code className="bg-slate-700 px-1 rounded">else</code> without parentheses.
                  </p>
                  <CodeBlock
                    code={`if x > 10
    "x is greater than 10"
else
    "x is 10 or less"`}
                    language="jan"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
