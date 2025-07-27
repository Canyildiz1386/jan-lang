from .tokens import Token, TokenType

class Lexer:
    def __init__(self, source):
        self.source = source
        self.position = 0
        self.line = 1
        self.column = 1
        self.current_char = self.source[0] if source else None
        
        self.keywords = {
            'if': TokenType.IF,
            'else': TokenType.ELSE,
            'while': TokenType.WHILE,
            'for': TokenType.FOR,
            'fun': TokenType.FUN,
            'return': TokenType.RETURN,
            'true': TokenType.TRUE,
            'false': TokenType.FALSE,
            'nil': TokenType.NIL,
            'and': TokenType.AND,
            'or': TokenType.OR,
            'not': TokenType.NOT
        }
    
    def advance(self):
        self.position += 1
        self.column += 1
        
        if self.position >= len(self.source):
            self.current_char = None
        else:
            self.current_char = self.source[self.position]
    
    def peek(self, offset=1):
        peek_pos = self.position + offset
        if peek_pos >= len(self.source):
            return None
        return self.source[peek_pos]
    
    def skip_whitespace(self):
        while self.current_char and self.current_char.isspace():
            if self.current_char == '\n':
                self.line += 1
                self.column = 0
            self.advance()
    
    def skip_comment(self):
        while self.current_char and self.current_char != '\n':
            self.advance()
    
    def read_number(self):
        start_column = self.column
        result = ''
        
        while self.current_char and (self.current_char.isdigit() or self.current_char == '.'):
            result += self.current_char
            self.advance()
        
        try:
            if '.' in result:
                value = float(result)
            else:
                value = int(result)
            return Token(TokenType.NUMBER, value, self.line, start_column)
        except ValueError:
            raise Exception(f"Invalid number: {result}")
    
    def read_string(self):
        start_column = self.column
        self.advance()
        result = ''
        
        while self.current_char and self.current_char != '"':
            if self.current_char == '\\':
                self.advance()
                if self.current_char == 'n':
                    result += '\n'
                elif self.current_char == 't':
                    result += '\t'
                elif self.current_char == 'r':
                    result += '\r'
                else:
                    result += self.current_char
            else:
                result += self.current_char
            self.advance()
        
        if not self.current_char:
            raise Exception("Unterminated string")
        
        self.advance()
        return Token(TokenType.STRING, result, self.line, start_column)
    
    def read_identifier(self):
        start_column = self.column
        result = ''
        
        while self.current_char and (self.current_char.isalnum() or self.current_char == '_'):
            result += self.current_char
            self.advance()
        
        token_type = self.keywords.get(result, TokenType.IDENTIFIER)
        return Token(token_type, result, self.line, start_column)
    
    def get_next_token(self):
        while self.current_char:
            if self.current_char.isspace():
                self.skip_whitespace()
                continue
            
            if self.current_char == '/' and self.peek() == '/':
                self.skip_comment()
                continue
            
            if self.current_char.isdigit():
                return self.read_number()
            
            if self.current_char == '"':
                return self.read_string()
            
            if self.current_char.isalpha() or self.current_char == '_':
                return self.read_identifier()
            
            start_column = self.column
            
            if self.current_char == '+':
                self.advance()
                return Token(TokenType.PLUS, '+', self.line, start_column)
            
            if self.current_char == '-':
                self.advance()
                return Token(TokenType.MINUS, '-', self.line, start_column)
            
            if self.current_char == '*':
                self.advance()
                return Token(TokenType.MULTIPLY, '*', self.line, start_column)
            
            if self.current_char == '/':
                self.advance()
                return Token(TokenType.DIVIDE, '/', self.line, start_column)
            
            if self.current_char == '=':
                if self.peek() == '=':
                    self.advance()
                    self.advance()
                    return Token(TokenType.EQUALS, '==', self.line, start_column)
                else:
                    self.advance()
                    return Token(TokenType.ASSIGN, '=', self.line, start_column)
            
            if self.current_char == '!':
                if self.peek() == '=':
                    self.advance()
                    self.advance()
                    return Token(TokenType.NOT_EQUALS, '!=', self.line, start_column)
                else:
                    self.advance()
                    return Token(TokenType.NOT, '!', self.line, start_column)
            
            if self.current_char == '<':
                if self.peek() == '=':
                    self.advance()
                    self.advance()
                    return Token(TokenType.LESS_EQUALS, '<=', self.line, start_column)
                else:
                    self.advance()
                    return Token(TokenType.LESS_THAN, '<', self.line, start_column)
            
            if self.current_char == '>':
                if self.peek() == '=':
                    self.advance()
                    self.advance()
                    return Token(TokenType.GREATER_EQUALS, '>=', self.line, start_column)
                else:
                    self.advance()
                    return Token(TokenType.GREATER_THAN, '>', self.line, start_column)
            
            if self.current_char == '(':
                self.advance()
                return Token(TokenType.LPAREN, '(', self.line, start_column)
            
            if self.current_char == ')':
                self.advance()
                return Token(TokenType.RPAREN, ')', self.line, start_column)
            
            if self.current_char == '{':
                self.advance()
                return Token(TokenType.LBRACE, '{', self.line, start_column)
            
            if self.current_char == '}':
                self.advance()
                return Token(TokenType.RBRACE, '}', self.line, start_column)
            
            if self.current_char == ';':
                self.advance()
                return Token(TokenType.SEMICOLON, ';', self.line, start_column)
            
            if self.current_char == ',':
                self.advance()
                return Token(TokenType.COMMA, ',', self.line, start_column)
            
            if self.current_char == '.':
                self.advance()
                return Token(TokenType.DOT, '.', self.line, start_column)
            
            raise Exception(f"Unknown character: {self.current_char}")
        
        return Token(TokenType.EOF, None, self.line, self.column) 