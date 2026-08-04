module M {
  state machine S {
    type T
    constant c = 1
    enum E { A, B }

    constant d = c

    signal sig: E
    action act: T
    guard g

    initial enter Idle

    state Idle {
      on sig enter Idle
    }
  }
}
