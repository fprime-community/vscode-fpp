module M {
  module M1 {
    module M2 {
      deployment topology T {}
    }
    deployment topology T {}
  }
  deployment topology T {}

  system S1: T
  system S2: M1.T
  system S3: M1.M2.T

  locate system a.b at "c.fpp"
  locate state machine a.b at "c.fpp"
}
