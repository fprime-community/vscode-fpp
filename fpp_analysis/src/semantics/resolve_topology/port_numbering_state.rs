use std::collections::BTreeSet;

/// Port numbering state
#[derive(Clone)]
pub struct PortNumberingState {
    /// The used port numbers
    used_port_numbers: BTreeSet<i128>,
    /// The next port number
    next_port_number: i128,
}

impl PortNumberingState {
    /// Marks the specified port number as used and generates
    /// a new one
    pub fn use_port_number(&self, n: i128) -> PortNumberingState {
        let mut s = self.used_port_numbers.clone();
        s.insert(n);
        let n1 = PortNumberingState::get_next_number(self.next_port_number, &s);
        PortNumberingState {
            used_port_numbers: s,
            next_port_number: n1,
        }
    }

    /// Marks the next port number as used and generates a new one
    pub fn use_next_port_number(&self) -> PortNumberingState {
        self.use_port_number(self.next_port_number)
    }

    /// Gets the next port number and updates the state
    pub fn get_port_number(&self) -> (PortNumberingState, i128) {
        let s = self.use_next_port_number();
        (s, self.next_port_number)
    }

    /// Construct an initial state
    pub fn initial(used_port_numbers: BTreeSet<i128>) -> PortNumberingState {
        let next_port_number = PortNumberingState::get_next_number(0, &used_port_numbers);
        PortNumberingState {
            used_port_numbers,
            next_port_number,
        }
    }

    /// Gets the next available port number
    fn get_next_number(from: i128, used: &BTreeSet<i128>) -> i128 {
        let mut n = from;
        while used.contains(&n) {
            n += 1;
        }
        n
    }
}
