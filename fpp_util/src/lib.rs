/// A trait meant to act as a type parameter bound for
/// the [fpp_macros::EnumMap] derive macro. This trait is automatically
/// implemented by the type derived by adding this derive macro to an enum
pub trait EnumMap<K, V> {
    /// Construct a new enum map given a predicate for constructing the default values
    fn new(v: fn(k: K) -> V) -> Self;

    /// Get a reference to a value in the map
    fn get(&self, k: K) -> &V;

    /// Get a mutable reference to a value in the map
    fn get_mut(&mut self, k: K) -> &mut V;
}
