import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.lexer import Lexer
from src.tokens import TokenType

def test_lexer_numbers():
    lexer = Lexer("123 456.789")
    tokens = []
    while True:
        token = lexer.get_next_token()
        tokens.append(token)
        if token.type == TokenType.EOF:
            break
    
    assert len(tokens) == 3
    assert tokens[0].type == TokenType.NUMBER
    assert tokens[0].value == 123
    assert tokens[1].type == TokenType.NUMBER
    assert tokens[1].value == 456.789

def test_lexer_strings():
    lexer = Lexer('"hello world" "test"')
    tokens = []
    while True:
        token = lexer.get_next_token()
        tokens.append(token)
        if token.type == TokenType.EOF:
            break
    
    assert len(tokens) == 3
    assert tokens[0].type == TokenType.STRING
    assert tokens[0].value == "hello world"
    assert tokens[1].type == TokenType.STRING
    assert tokens[1].value == "test"

def test_lexer_operators():
    lexer = Lexer("+-*/= == != < > <= >=")
    tokens = []
    while True:
        token = lexer.get_next_token()
        tokens.append(token)
        if token.type == TokenType.EOF:
            break
    
    assert len(tokens) == 9
    assert tokens[0].type == TokenType.PLUS
    assert tokens[1].type == TokenType.MINUS
    assert tokens[2].type == TokenType.MULTIPLY
    assert tokens[3].type == TokenType.DIVIDE
    assert tokens[4].type == TokenType.ASSIGN
    assert tokens[5].type == TokenType.EQUALS
    assert tokens[6].type == TokenType.NOT_EQUALS
    assert tokens[7].type == TokenType.LESS_THAN
    assert tokens[8].type == TokenType.GREATER_THAN

if __name__ == "__main__":
    test_lexer_numbers()
    test_lexer_strings()
    test_lexer_operators()
    print("All lexer tests passed!") 