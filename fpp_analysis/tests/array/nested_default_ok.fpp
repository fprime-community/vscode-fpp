array Inner = [2] I32
array Outer = [2] Inner default [[1, 2], [3, 4]]

array One = [1] I32
array PromoteOuter = [1] One default [5]

array ScalarPromote = [2] Inner default [[1, 2], 3]

array AliasElt = [2] U8
type AliasEltAlias = AliasElt
array AliasOuter = [2] AliasEltAlias default [[1, 2], [3, 4]]

enum E: U8 { A, B }
array Row = [2] E
array Grid = [2] Row default [[E.A, E.B], [E.B, E.A]]

array StructRow = [2] U8
struct S { r: StructRow }
array StructArr = [1] S default [{ r = [1, 2] }]
