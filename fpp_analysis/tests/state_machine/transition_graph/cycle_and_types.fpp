state machine M {
  guard g: U32
  action a
  initial enter C1
  choice C1 { if g enter C2 else enter C2 }
  choice C2 { if g enter C1 else enter C1 }
}
