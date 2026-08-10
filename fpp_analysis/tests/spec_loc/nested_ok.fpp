locate constant A.B.c at "nested_ok.fpp"
module A {
  module B {
    constant c = 0
  }
}

locate constant A.B.D.e at "nested_ok.fpp"
module A {
  module B {
    module D {
      constant e = 1
    }
  }
}
