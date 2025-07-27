class ASTNode:
    pass

class Program(ASTNode):
    def __init__(self, statements):
        self.statements = statements

class Expression(ASTNode):
    pass

class Statement(ASTNode):
    pass

class BinaryOp(Expression):
    def __init__(self, left, operator, right):
        self.left = left
        self.operator = operator
        self.right = right

class UnaryOp(Expression):
    def __init__(self, operator, operand):
        self.operator = operator
        self.operand = operand

class NumberLiteral(Expression):
    def __init__(self, value):
        self.value = value

class StringLiteral(Expression):
    def __init__(self, value):
        self.value = value

class BooleanLiteral(Expression):
    def __init__(self, value):
        self.value = value

class NilLiteral(Expression):
    pass

class Identifier(Expression):
    def __init__(self, name):
        self.name = name

class Assignment(Statement):
    def __init__(self, name, value):
        self.name = name
        self.value = value

class VariableDeclaration(Statement):
    def __init__(self, name, initializer):
        self.name = name
        self.initializer = initializer

class IfStatement(Statement):
    def __init__(self, condition, then_branch, else_branch=None):
        self.condition = condition
        self.then_branch = then_branch
        self.else_branch = else_branch

class WhileStatement(Statement):
    def __init__(self, condition, body):
        self.condition = condition
        self.body = body

class Block(Statement):
    def __init__(self, statements):
        self.statements = statements

class FunctionDeclaration(Statement):
    def __init__(self, name, params, body):
        self.name = name
        self.params = params
        self.body = body

class FunctionCall(Expression):
    def __init__(self, callee, arguments):
        self.callee = callee
        self.arguments = arguments

class ReturnStatement(Statement):
    def __init__(self, value):
        self.value = value 