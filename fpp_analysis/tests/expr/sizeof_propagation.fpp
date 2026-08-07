struct S { a: U32, b: U8 }

constant c = sizeof(S)

@ X evaluates to sizeof(S) == 5, colliding with Y
enum E {
  X = c
  Y = 5
}
