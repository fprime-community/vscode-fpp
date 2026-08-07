module M {
  active component C {
    guarded command SET_MODE(mode: U32) opcode 0x10 priority 5 assert

    constant matrix = [[1, 2], [3, 4]]
  }
}
