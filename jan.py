#!/usr/bin/env python3

import sys
from src.interpreter import Interpreter
from src.lexer import Lexer
from src.simple_parser import SimpleParser

def main():
    if len(sys.argv) > 1:
        with open(sys.argv[1], 'r') as f:
            code = f.read()
        run(code)
    else:
        repl()

def run(code):
    lexer = Lexer(code)
    parser = SimpleParser(lexer)
    interpreter = Interpreter()
    ast = parser.parse()
    interpreter.interpret(ast)

def repl():
    print("Jan Language REPL")
    print("Type 'exit' to quit")
    interpreter = Interpreter()
    
    while True:
        try:
            code = input("jan> ")
            if code.strip() == "exit":
                break
            if code.strip():
                run(code)
        except KeyboardInterrupt:
            print("\nGoodbye!")
            break
        except EOFError:
            print("\nGoodbye!")
            break
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    main() 