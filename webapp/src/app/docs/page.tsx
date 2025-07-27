import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">📚</div>
            <div>
              <h1 className="text-2xl font-bold text-white">Jan Language Documentation</h1>
              <p className="text-slate-400">Complete guide to the Jan programming language</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700 sticky top-8">
              <CardHeader>
                <CardTitle className="text-white">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <a href="#getting-started" className="block text-slate-300 hover:text-white transition-colors">
                    Getting Started
                  </a>
                  <a href="#variables" className="block text-slate-300 hover:text-white transition-colors">
                    Variables
                  </a>
                  <a href="#functions" className="block text-slate-300 hover:text-white transition-colors">
                    Functions
                  </a>
                  <a href="#control-flow" className="block text-slate-300 hover:text-white transition-colors">
                    Control Flow
                  </a>
                  <a href="#operators" className="block text-slate-300 hover:text-white transition-colors">
                    Operators
                  </a>
                  <a href="#data-types" className="block text-slate-300 hover:text-white transition-colors">
                    Data Types
                  </a>
                  <a href="#examples" className="block text-slate-300 hover:text-white transition-colors">
                    Examples
                  </a>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Getting Started */}
            <section id="getting-started">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Getting Started</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300">
                    Jan is a minimal, elegant scripting language designed to be simple, powerful, and beautiful. 
                    It features clean syntax, dynamic typing, and a focus on readability.
                  </p>
                  
                  <div className="bg-slate-900 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Key Features</h4>
                    <ul className="text-slate-300 space-y-1">
                      <li>• Clean, readable syntax</li>
                      <li>• Dynamic typing</li>
                      <li>• No semicolons required</li>
                      <li>• Simple function declarations</li>
                      <li>• Minimal boilerplate</li>
                    </ul>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Your First Program</h4>
                    <CodeBlock
                      code={`var message is "Hello, World!"
message`}
                      language="jan"
                    />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Variables */}
            <section id="variables">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Variables</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300">
                    Variables in Jan are declared using the <code className="bg-slate-700 px-1 rounded">var</code> keyword 
                    and assigned using <code className="bg-slate-700 px-1 rounded">is</code>.
                  </p>
                  
                  <CodeBlock
                    code={`var name is "Jan"
var age is 25
var isActive is true
var result is 10 + 5`}
                    language="jan"
                  />

                  <div className="bg-slate-900 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Variable Rules</h4>
                    <ul className="text-slate-300 space-y-1">
                      <li>• Variable names must start with a letter or underscore</li>
                      <li>• Names are case-sensitive</li>
                      <li>• Use <code className="bg-slate-700 px-1 rounded">var</code> to declare</li>
                      <li>• Use <code className="bg-slate-700 px-1 rounded">is</code> for assignment</li>
                      <li>• No semicolons needed</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Functions */}
            <section id="functions">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Functions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300">
                    Functions are declared using the <code className="bg-slate-700 px-1 rounded">function</code> keyword, 
                    followed by the function name and parameter.
                  </p>
                  
                  <CodeBlock
                    code={`function greet name
    return "Hello, " + name + "!"

function add a b
    return a + b

var message is greet "World"
var result is add 5 3`}
                    language="jan"
                  />

                  <div className="bg-slate-900 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Function Rules</h4>
                    <ul className="text-slate-300 space-y-1">
                      <li>• Use <code className="bg-slate-700 px-1 rounded">function</code> keyword</li>
                      <li>• Function name followed by parameter</li>
                      <li>• Body is indented</li>
                      <li>• Use <code className="bg-slate-700 px-1 rounded">return</code> to return values</li>
                      <li>• Call functions with <code className="bg-slate-700 px-1 rounded">name arg</code> syntax</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Control Flow */}
            <section id="control-flow">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Control Flow</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300">
                    Jan supports conditional statements and loops with clean, readable syntax.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">If Statements</h4>
                      <CodeBlock
                        code={`var x is 15

if x > 10
    "x is greater than 10"
else
    "x is 10 or less"`}
                        language="jan"
                      />
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-2">While Loops</h4>
                      <CodeBlock
                        code={`var i is 0

while i < 5
    i is i + 1
    i`}
                        language="jan"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Control Flow Rules</h4>
                    <ul className="text-slate-300 space-y-1">
                      <li>• No parentheses around conditions</li>
                      <li>• Use indentation for blocks</li>
                      <li>• <code className="bg-slate-700 px-1 rounded">if</code> and <code className="bg-slate-700 px-1 rounded">else</code> keywords</li>
                      <li>• <code className="bg-slate-700 px-1 rounded">while</code> for loops</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Operators */}
            <section id="operators">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Operators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Arithmetic Operators</h4>
                      <div className="space-y-1 text-slate-300">
                        <div><code className="bg-slate-700 px-1 rounded">+</code> Addition</div>
                        <div><code className="bg-slate-700 px-1 rounded">-</code> Subtraction</div>
                        <div><code className="bg-slate-700 px-1 rounded">*</code> Multiplication</div>
                        <div><code className="bg-slate-700 px-1 rounded">/</code> Division</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-2">Comparison Operators</h4>
                      <div className="space-y-1 text-slate-300">
                        <div><code className="bg-slate-700 px-1 rounded">==</code> Equal</div>
                        <div><code className="bg-slate-700 px-1 rounded">!=</code> Not equal</div>
                        <div><code className="bg-slate-700 px-1 rounded">&lt;</code> Less than</div>
                        <div><code className="bg-slate-700 px-1 rounded">&gt;</code> Greater than</div>
                        <div><code className="bg-slate-700 px-1 rounded">&lt;=</code> Less or equal</div>
                        <div><code className="bg-slate-700 px-1 rounded">&gt;=</code> Greater or equal</div>
                      </div>
                    </div>
                  </div>

                  <CodeBlock
                    code={`var a is 10
var b is 5

var sum is a + b
var product is a * b
var isEqual is a == b
var isGreater is a > b`}
                    language="jan"
                  />
                </CardContent>
              </Card>
            </section>

            {/* Data Types */}
            <section id="data-types">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Data Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Basic Types</h4>
                      <div className="space-y-2 text-slate-300">
                        <div>
                          <Badge variant="secondary" className="mr-2">Number</Badge>
                          <code className="bg-slate-700 px-1 rounded">42</code>, <code className="bg-slate-700 px-1 rounded">3.14</code>
                        </div>
                        <div>
                          <Badge variant="secondary" className="mr-2">String</Badge>
                          <code className="bg-slate-700 px-1 rounded">"Hello"</code>
                        </div>
                        <div>
                          <Badge variant="secondary" className="mr-2">Boolean</Badge>
                          <code className="bg-slate-700 px-1 rounded">true</code>, <code className="bg-slate-700 px-1 rounded">false</code>
                        </div>
                        <div>
                          <Badge variant="secondary" className="mr-2">Nil</Badge>
                          <code className="bg-slate-700 px-1 rounded">nil</code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CodeBlock
                    code={`var number is 42
var float is 3.14
var text is "Hello, Jan!"
var flag is true
var empty is nil`}
                    language="jan"
                  />
                </CardContent>
              </Card>
            </section>

            {/* Examples */}
            <section id="examples">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Complete Examples</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Fibonacci Sequence</h4>
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
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Simple Calculator</h4>
                    <CodeBlock
                      code={`function calculate op a b
    if op == "add"
        return a + b
    else if op == "subtract"
        return a - b
    else if op == "multiply"
        return a * b
    else
        return a / b

var sum is calculate "add" 10 5
var product is calculate "multiply" 4 3
sum
product`}
                      language="jan"
                    />
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">String Operations</h4>
                    <CodeBlock
                      code={`function greet name
    return "Hello, " + name + "!"

function repeat text times
    var result is ""
    var i is 0
    while i < times
        result is result + text
        i is i + 1
    return result

var message is greet "Jan"
var repeated is repeat "Jan " 3
message
repeated`}
                      language="jan"
                    />
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 