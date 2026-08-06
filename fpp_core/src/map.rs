use rustc_hash::FxHashMap as HashMap;

/// A special map that will manage unique keys for you
/// This will keep key IDs packed and reuse old IDs when items are removed
pub(crate) struct IdMap<V> {
    /// The map storing the items
    store: HashMap<usize, V>,
    /// The last added ID, if we need a new ID, use this
    current: usize,
    /// If an item has been invalidated, this keeps track of IDs that can be used
    dropped: Vec<usize>,
}

impl<V> IdMap<V> {
    fn new_key(&mut self) -> usize {
        match self.dropped.pop() {
            None => {
                let out = self.current;
                self.current += 1;
                out
            }
            Some(v) => v,
        }
    }

    /// Add an item to the map
    ///
    /// # Arguments
    ///
    /// * `v`: Value to add to the map
    ///
    /// returns: usize Unique ID assigned to this item
    pub fn push(&mut self, v: V) -> usize {
        let key = self.new_key();
        match self.store.insert(key, v) {
            None => {}
            Some(_) => {
                panic!("unexpected overlapping map key {key}")
            }
        }
        key
    }

    pub fn iter(&self) -> impl Iterator<Item = &V> {
        self.store.values()
    }

    /// Insert an item into the map given a predicate.
    /// The predicate will be given the new items key.
    /// This is to be used when they key is needed to construct the item
    ///
    /// # Arguments
    ///
    /// * `f`: Function to construct the item given it's key
    ///
    /// returns: usize
    pub fn push_with<F: FnOnce(usize) -> V>(&mut self, f: F) -> usize {
        let key = self.new_key();
        let v = f(key);
        match self.store.insert(key, v) {
            None => {}
            Some(_) => {
                panic!("unexpected overlapping map key {key}")
            }
        }
        key
    }

    pub fn get(&self, key: usize) -> &V {
        self.store.get(&key).unwrap()
    }

    pub fn get_mut(&mut self, key: usize) -> &mut V {
        self.store.get_mut(&key).unwrap()
    }

    /// Retains only the elements specified by the predicate.
    ///
    /// In other words, remove all pairs `(k, v)` for which `f(&k, &mut v)` returns `false`.
    /// The elements are visited in unsorted (and unspecified) order.
    ///
    /// # Examples
    ///
    /// ```
    /// use std::collections::HashMap;
    ///
    /// let mut map: HashMap<i32, i32> = (0..8).map(|x| (x, x*10)).collect();
    /// map.retain(|&k, _| k % 2 == 0);
    /// assert_eq!(map.len(), 4);
    /// ```
    ///
    /// # Performance
    ///
    /// In the current implementation, this operation takes O(capacity) time
    /// instead of O(len) because it internally visits empty buckets too.
    pub fn extract_if<F>(&mut self, f: F) -> Vec<usize>
    where
        F: FnMut(&usize, &mut V) -> bool,
    {
        let dropped_keys: Vec<_> = self.store.extract_if(f).map(|(k, _)| k).collect();
        self.dropped.extend(dropped_keys.clone());
        dropped_keys
    }
}

impl<V> Default for IdMap<V> {
    fn default() -> Self {
        IdMap {
            store: HashMap::default(),
            current: 0,
            dropped: Default::default(),
        }
    }
}
