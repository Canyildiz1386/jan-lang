from .tokens import TokenType
from .ast import *

class SimpleParser:
    def __init__(self, lexer):
        self.lexer = lexer
        self.current_token = None
        self.tokens = []
        self.position = 0
        self.collect_tokens()
        self.next_token()
    
    def collect_tokens(self):
        while True:
            token = self.lexer.get_next_token()
            self.tokens.append(token)
            if token.type == TokenType.EOF:
                break
    
    def next_token(self):
        if self.position < len(self.tokens):
            self.current_token = self.tokens[self.position]
            self.position += 1
        else:
            self.current_token = Token(TokenType.EOF, None, 0, 0)
    
    def expect(self, token_type):
        if self.current_token.type == token_type:
            token = self.current_token
            self.next_token()
            return token
        else:
            raise Exception(f"Expected {token_type}, got {self.current_token.type}")
    
    def parse(self):
        statements = []
        while self.current_token.type != TokenType.EOF:
            statements.append(self.parse_statement())
        return Program(statements)
    
    def parse_statement(self):
        if self.current_token.type == TokenType.IF:
            return self.parse_if_statement()
        elif self.current_token.type == TokenType.WHILE:
            return self.parse_while_statement()
        elif self.current_token.type == TokenType.FUNCTION:
            return self.parse_function_declaration()
        elif self.current_token.type == TokenType.RETURN:
            return self.parse_return_statement()
        elif self.current_token.type == TokenType.VAR:
            return self.parse_variable_declaration()
        elif self.current_token.type == TokenType.IDENTIFIER:
            name = self.current_token.value
            self.next_token()
            if self.current_token.type == TokenType.ASSIGN:
                self.next_token()
                value = self.parse_expression()
                return Assignment(name, value)
            else:
                return ExpressionStatement(Identifier(name))
        else:
            expr = self.parse_expression()
            return ExpressionStatement(expr)
    
    def parse_if_statement(self):
        self.expect(TokenType.IF)
        condition = self.parse_expression()
        then_branch = self.parse_statement()
        
        else_branch = None
        if self.current_token.type == TokenType.ELSE:
            self.next_token()
            else_branch = self.parse_statement()
        
        return IfStatement(condition, then_branch, else_branch)
    
    def parse_while_statement(self):
        self.expect(TokenType.WHILE)
        condition = self.parse_expression()
        body = self.parse_statement()
        return WhileStatement(condition, body)
    
    def parse_function_declaration(self):
        self.expect(TokenType.FUNCTION)
        name = self.expect(TokenType.IDENTIFIER).value
        
        param = None
        if self.current_token.type == TokenType.IDENTIFIER:
            param = self.expect(TokenType.IDENTIFIER).value
        
        body = self.parse_indented_block()
        return FunctionDeclaration(name, [param] if param else [], body)
    
    def parse_return_statement(self):
        self.expect(TokenType.RETURN)
        value = None
        if self.current_token.type not in [TokenType.EOF]:
            value = self.parse_expression()
        return ReturnStatement(value)
    
    def parse_variable_declaration(self):
        self.expect(TokenType.VAR)
        name = self.expect(TokenType.IDENTIFIER).value
        self.expect(TokenType.IS)
        initializer = self.parse_expression()
        return VariableDeclaration(name, initializer)
    
    def parse_indented_block(self):
        statements = []
        while self.current_token.type != TokenType.EOF:
            if self.current_token.type == TokenType.RETURN:
                statements.append(self.parse_statement())
                break
            statements.append(self.parse_statement())
        return IndentedBlock(statements)
    
    def parse_function_call_statement(self, name):
        arguments = []
        
        if self.current_token.type == TokenType.IDENTIFIER:
            arguments.append(Identifier(self.current_token.value))
            self.next_token()
        elif self.current_token.type == TokenType.STRING:
            arguments.append(StringLiteral(self.current_token.value))
            self.next_token()
        elif self.current_token.type == TokenType.NUMBER:
            arguments.append(NumberLiteral(self.current_token.value))
            self.next_token()
        
        return ExpressionStatement(FunctionCall(Identifier(name), arguments))
    
    def parse_function_call(self, name):
        arguments = []
        
        if self.current_token.type == TokenType.IDENTIFIER:
            arguments.append(Identifier(self.current_token.value))
            self.next_token()
        elif self.current_token.type == TokenType.STRING:
            arguments.append(StringLiteral(self.current_token.value))
            self.next_token()
        elif self.current_token.type == TokenType.NUMBER:
            arguments.append(NumberLiteral(self.current_token.value))
            self.next_token()
        
        return FunctionCall(Identifier(name), arguments)
    
    def parse_expression(self):
        return self.parse_or()
    
    def parse_or(self):
        left = self.parse_and()
        
        while self.current_token.type == TokenType.OR:
            operator = self.current_token.value
            self.next_token()
            right = self.parse_and()
            left = BinaryOp(left, operator, right)
        
        return left
    
    def parse_and(self):
        left = self.parse_equality()
        
        while self.current_token.type == TokenType.AND:
            operator = self.current_token.value
            self.next_token()
            right = self.parse_equality()
            left = BinaryOp(left, operator, right)
        
        return left
    
    def parse_equality(self):
        left = self.parse_comparison()
        
        while self.current_token.type in [TokenType.EQUALS, TokenType.NOT_EQUALS]:
            operator = self.current_token.value
            self.next_token()
            right = self.parse_comparison()
            left = BinaryOp(left, operator, right)
        
        return left
    
    def parse_comparison(self):
        left = self.parse_term()
        
        while self.current_token.type in [TokenType.LESS_THAN, TokenType.GREATER_THAN, 
                                         TokenType.LESS_EQUALS, TokenType.GREATER_EQUALS]:
            operator = self.current_token.value
            self.next_token()
            right = self.parse_term()
            left = BinaryOp(left, operator, right)
        
        return left
    
    def parse_term(self):
        left = self.parse_factor()
        
        while self.current_token.type in [TokenType.PLUS, TokenType.MINUS]:
            operator = self.current_token.value
            self.next_token()
            right = self.parse_factor()
            left = BinaryOp(left, operator, right)
        
        return left
    
    def parse_factor(self):
        left = self.parse_unary()
        
        while self.current_token.type in [TokenType.MULTIPLY, TokenType.DIVIDE]:
            operator = self.current_token.value
            self.next_token()
            right = self.parse_unary()
            left = BinaryOp(left, operator, right)
        
        return left
    
    def parse_unary(self):
        if self.current_token.type in [TokenType.MINUS, TokenType.NOT]:
            operator = self.current_token.value
            self.next_token()
            operand = self.parse_unary()
            return UnaryOp(operator, operand)
        
        return self.parse_primary()
    
    def parse_primary(self):
        if self.current_token.type == TokenType.NUMBER:
            value = self.current_token.value
            self.next_token()
            return NumberLiteral(value)
        
        elif self.current_token.type == TokenType.STRING:
            value = self.current_token.value
            self.next_token()
            return StringLiteral(value)
        
        elif self.current_token.type == TokenType.TRUE:
            self.next_token()
            return BooleanLiteral(True)
        
        elif self.current_token.type == TokenType.FALSE:
            self.next_token()
            return BooleanLiteral(False)
        
        elif self.current_token.type == TokenType.NIL:
            self.next_token()
            return NilLiteral()
        
        elif self.current_token.type == TokenType.IDENTIFIER:
            name = self.current_token.value
            self.next_token()
            
            if self.current_token.type == TokenType.IDENTIFIER:
                return self.parse_function_call(name)
            else:
                return Identifier(name)
        
        elif self.current_token.type == TokenType.LPAREN:
            self.next_token()
            expr = self.parse_expression()
            self.expect(TokenType.RPAREN)
            return expr
        
        else:
            raise Exception(f"Unexpected token: {self.current_token.type}") 