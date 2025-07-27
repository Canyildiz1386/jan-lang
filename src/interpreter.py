from .ast import *

class Environment:
    def __init__(self, enclosing=None):
        self.values = {}
        self.enclosing = enclosing
    
    def define(self, name, value):
        self.values[name] = value
    
    def get(self, name):
        if name in self.values:
            return self.values[name]
        
        if self.enclosing:
            return self.enclosing.get(name)
        
        raise Exception(f"Undefined variable '{name}'")
    
    def assign(self, name, value):
        if name in self.values:
            self.values[name] = value
            return
        
        if self.enclosing:
            self.enclosing.assign(name, value)
            return
        
        raise Exception(f"Undefined variable '{name}'")

class Function:
    def __init__(self, declaration, closure):
        self.declaration = declaration
        self.closure = closure
    
    def call(self, interpreter, arguments):
        environment = Environment(self.closure)
        
        for i, param in enumerate(self.declaration.params):
            environment.define(param, arguments[i])
        
        try:
            interpreter.execute_block(self.declaration.body.statements, environment)
        except Return as return_value:
            return return_value.value
        
        return None

class Return(Exception):
    def __init__(self, value):
        self.value = value

class Interpreter:
    def __init__(self):
        self.globals = Environment()
        self.environment = self.globals
    
    def interpret(self, statements):
        if isinstance(statements, Program):
            for statement in statements.statements:
                self.execute(statement)
        else:
            self.execute(statements)
    
    def execute(self, stmt):
        if isinstance(stmt, ExpressionStatement):
            result = self.evaluate(stmt.expression)
            if result is not None:
                print(result)
        elif isinstance(stmt, Assignment):
            value = self.evaluate(stmt.value)
            try:
                self.environment.assign(stmt.name, value)
            except:
                self.environment.define(stmt.name, value)
        elif isinstance(stmt, IfStatement):
            self.execute_if(stmt)
        elif isinstance(stmt, WhileStatement):
            self.execute_while(stmt)
        elif isinstance(stmt, Block):
            self.execute_block(stmt.statements, Environment(self.environment))
        elif isinstance(stmt, FunctionDeclaration):
            function = Function(stmt, self.environment)
            self.environment.define(stmt.name, function)
        elif isinstance(stmt, ReturnStatement):
            value = None
            if stmt.value:
                value = self.evaluate(stmt.value)
            raise Return(value)
    
    def execute_if(self, stmt):
        condition = self.evaluate(stmt.condition)
        if self.is_truthy(condition):
            self.execute(stmt.then_branch)
        elif stmt.else_branch:
            self.execute(stmt.else_branch)
    
    def execute_while(self, stmt):
        while self.is_truthy(self.evaluate(stmt.condition)):
            self.execute(stmt.body)
    
    def execute_block(self, statements, environment):
        previous = self.environment
        try:
            self.environment = environment
            for statement in statements:
                self.execute(statement)
        finally:
            self.environment = previous
    
    def evaluate(self, expr):
        if isinstance(expr, BinaryOp):
            return self.evaluate_binary(expr)
        elif isinstance(expr, UnaryOp):
            return self.evaluate_unary(expr)
        elif isinstance(expr, NumberLiteral):
            return expr.value
        elif isinstance(expr, StringLiteral):
            return expr.value
        elif isinstance(expr, BooleanLiteral):
            return expr.value
        elif isinstance(expr, NilLiteral):
            return None
        elif isinstance(expr, Identifier):
            return self.environment.get(expr.name)
        elif isinstance(expr, FunctionCall):
            return self.evaluate_function_call(expr)
    
    def evaluate_binary(self, expr):
        left = self.evaluate(expr.left)
        right = self.evaluate(expr.right)
        
        if expr.operator == '+':
            if isinstance(left, (int, float)) and isinstance(right, (int, float)):
                return left + right
            elif isinstance(left, str) or isinstance(right, str):
                return str(left) + str(right)
            else:
                raise Exception("Operands must be numbers or strings")
        
        elif expr.operator == '-':
            self.check_number_operands(expr.operator, left, right)
            return left - right
        
        elif expr.operator == '*':
            self.check_number_operands(expr.operator, left, right)
            return left * right
        
        elif expr.operator == '/':
            self.check_number_operands(expr.operator, left, right)
            if right == 0:
                raise Exception("Division by zero")
            return left / right
        
        elif expr.operator == '==':
            return self.is_equal(left, right)
        
        elif expr.operator == '!=':
            return not self.is_equal(left, right)
        
        elif expr.operator == '<':
            self.check_number_operands(expr.operator, left, right)
            return left < right
        
        elif expr.operator == '<=':
            self.check_number_operands(expr.operator, left, right)
            return left <= right
        
        elif expr.operator == '>':
            self.check_number_operands(expr.operator, left, right)
            return left > right
        
        elif expr.operator == '>=':
            self.check_number_operands(expr.operator, left, right)
            return left >= right
        
        elif expr.operator == 'and':
            return self.is_truthy(left) and self.is_truthy(right)
        
        elif expr.operator == 'or':
            return self.is_truthy(left) or self.is_truthy(right)
        
        return None
    
    def evaluate_unary(self, expr):
        right = self.evaluate(expr.operand)
        
        if expr.operator == '-':
            self.check_number_operand(expr.operator, right)
            return -right
        
        elif expr.operator == '!':
            return not self.is_truthy(right)
        
        return None
    
    def evaluate_function_call(self, expr):
        callee = self.evaluate(expr.callee)
        
        if not isinstance(callee, Function):
            raise Exception("Can only call functions")
        
        if len(expr.arguments) != len(callee.declaration.params):
            raise Exception(f"Expected {len(callee.declaration.params)} arguments but got {len(expr.arguments)}")
        
        arguments = [self.evaluate(arg) for arg in expr.arguments]
        return callee.call(self, arguments)
    
    def check_number_operand(self, operator, operand):
        if not isinstance(operand, (int, float)):
            raise Exception(f"Operand must be a number for {operator}")
    
    def check_number_operands(self, operator, left, right):
        if not isinstance(left, (int, float)) or not isinstance(right, (int, float)):
            raise Exception(f"Operands must be numbers for {operator}")
    
    def is_truthy(self, object):
        if object is None:
            return False
        if isinstance(object, bool):
            return object
        return True
    
    def is_equal(self, a, b):
        if a is None and b is None:
            return True
        if a is None:
            return False
        return a == b 