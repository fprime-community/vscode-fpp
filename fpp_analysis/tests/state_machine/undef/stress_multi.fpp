state machine M {
  state S {
    on sig1 enter Bogus
    on sig2 do { badAction } enter S
  }
  initial enter Nowhere
}
