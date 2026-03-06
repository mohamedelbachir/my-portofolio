---
title: XOR Party Tricks – The Magic Bitwise Operation
description: Discover the hidden magic of XOR (exclusive OR) – a bitwise operation that enables elegant solutions for swapping, encryption, and finding missing elements. Learn the tricks that make developers smile.
pubDate: 2026-03-06
lang: en
tags:
  - CPP
  - XOR
---

# XOR Party Tricks: The Bitwise Operation That Keeps On Giving

XOR (exclusive OR) is one of those operations that seems simple on the surface but hides extraordinary power beneath. It's the kind of trick that makes experienced developers nod appreciatively and junior developers think, "How did they come up with that?"

Let's unlock the magic.

---

## The Foundation: Understanding XOR

The XOR operation is beautifully simple: it returns `1` when bits are different, and `0` when they're the same.

| A   | B   | A ⊕ B |
| --- | --- | ----- |
| 0   | 0   | 0     |
| 0   | 1   | 1     |
| 1   | 0   | 1     |
| 1   | 1   | 0     |

But here's where it gets interesting. XOR has a magical property that forms the foundation of all these tricks:

### The Self-Annihilation Property

**`a ⊕ b ⊕ b = a`**

This simple property is the key to everything. When you XOR a value with itself, it disappears. When you XOR it with something else, it comes back.

```
a = 5       (binary: 101)
b = 3       (binary: 011)

a ⊕ b = 6   (binary: 110)
a ⊕ b ⊕ b = a ⊕ (b ⊕ b) = a ⊕ 0 = 5
```

Let's build something amazing with this property.

---

## Trick #1: Find the Missing Number

Imagine you have numbers 1 through 100, but one is missing. You also have a scrambled array where one number appears twice instead. How do you find what's missing and what's duplicate?

**The XOR Solution:**

```c
#include <stdio.h>

int xs[] = {7,62,2,46,73,43,26,82,5,95,57,56,44,21,40,79,13,6,9,8,72,59,65,81,60,78,13,85,87,58,48,25,32,47,67,4,31,19,33,1,92,14,53,89,84,54,29,10,17,3,77,70,45,97,34,23,86,55,15,64,68,83,76,41,18,39,94,22,74,11,69,49,12,35,20,90,100,98,36,63,91,38,66,93,50,96,61,71,75,37,52,88,30,28,99,27,42,51,80,24,16};

int main()
{
    int x = 0;

    // XOR all numbers from 1 to 100
    for (int i = 1; i <= 100; ++i) {
        x ^= i;
    }

    // XOR all numbers in our array
    size_t n = sizeof(xs)/sizeof(xs[0]);
    for (int i = 0; i < n; ++i) {
        x ^= xs[i];
    }

    // The result is the number we're looking for!
    printf("%d\n", x);
    return 0;
}
```

**How it works:**

When you XOR all numbers from 1-100, each number appears once. When you XOR with the array, the duplicate cancels itself out (because `a ⊕ a = 0`), leaving only the missing number standing.

It's like a magician making everything disappear except what was never there to begin with.

---

## Trick #2: Secret Encryption with One Key

Need a simple encryption scheme? XOR has your back.

```python
def encrypt(m, k):
  return ''.join([chr(ord(a)^k) for a in m])

# Usage:
message = "Hello, World!"
key = 42

encrypted = encrypt(message, key)
print(encrypted)  # Looks like gibberish

# To decrypt, just encrypt again!
decrypted = encrypt(encrypted, key)
print(decrypted)  # "Hello, World!"
```

**Why does this work?**

XOR is its own inverse. If you encrypt with a key, encrypting again with the same key gives you back the original.

```
plaintext ⊕ key = ciphertext
ciphertext ⊕ key = plaintext
```

**Important Note:** This is perfect for simple obfuscation or learning purposes, but real cryptography needs much more complexity. Don't use this for protecting sensitive data!

---

## Trick #3: XOR Linked List – Memory Magic

Want to traverse a linked list in both directions while storing half the pointers?

Welcome to the XOR linked list – a data structure that uses XOR as a memory trick:

```c
#include <stdint.h>
#include <stdlib.h>
#include <stdio.h>

typedef struct {
    int value;
    uintptr_t xored;  // Stores: prev ^ next
} Node;

Node *node_create(int value)
{
    Node *node = malloc(sizeof(*node));
    node->value = value;
    node->xored = 0;
    return node;
}

typedef struct {
    Node *begin;
    Node *end;
} Linked_List;

void ll_append(Linked_List *ll, int value)
{
    if (ll->end == NULL) {
        ll->end = node_create(value);
        ll->begin = ll->end;
    } else {
        Node *node = node_create(value);
        node->xored     = (uintptr_t)ll->end;
        ll->end->xored ^= (uintptr_t)node;  // Update to: prev ^ next
        ll->end         = node;
    }
}

Node *node_next(Node *node, uintptr_t *prev)
{
    Node *next = (Node*)(node->xored ^ (*prev));
    *prev = (uintptr_t)node;
    return next;
}

int main()
{
    Linked_List xs = {0};
    for (int x = 5; x <= 10; ++x) {
        ll_append(&xs, x);
    }

    uintptr_t prev = 0;
    for(Node *iter = xs.end; iter; iter = node_next(iter, &prev)) {
        printf("%d\n", iter->value);
    }

    return 0;
}
```

Each node stores `prev ⊕ next` instead of two pointers. To traverse, you XOR this value with the previous node's address to recover the next pointer.

**Why?** In systems where memory is tight, this saves storage. But in modern computing, it's more of an elegant puzzle than a practical solution.

---

## Trick #4: Swap Two Variables Without a Temporary

The classic interview question trick:

```c
#include <stdio.h>

int main()
{
    int a = 69;
    int b = 420;

    printf("Before: %d %d\n", a, b);

    a ^= b;  // a = 69 ^ 420, b = 420
    b ^= a;  // b = 420 ^ (69 ^ 420) = 69
    a ^= b;  // a = (69 ^ 420) ^ 69 = 420

    printf("After: %d %d\n", a, b);

    return 0;
}
```

**Output:**

```
Before: 69 420
After: 420 69
```

**How it works:**

- `a ^= b` transforms `a` into a container holding both values
- `b ^= a` extracts the original `a` and stores it in `b`
- `a ^= b` extracts the original `b` and stores it in `a`

**Modern Note:** Compilers are smart enough to optimize the simple `temp` variable approach, and it's more readable. Use the XOR trick in interviews to impress, but in production code, keep it simple.

---

## Why XOR is Special

These tricks work because XOR has properties that few other operations share:

1. **Self-annihilation:** `a ⊕ a = 0`
2. **Identity:** `a ⊕ 0 = a`
3. **Commutativity:** `a ⊕ b = b ⊕ a`
4. **Associativity:** `(a ⊕ b) ⊕ c = a ⊕ (b ⊕ c)`
5. **Inverse:** XOR is its own inverse

These properties make XOR a powerful tool for bit manipulation, data processing, and algorithmic elegance.

---

## Practical Applications Beyond Tricks

XOR isn't just for party tricks. Real-world uses include:

- **Error detection:** XOR checksums in data transmission
- **Cryptography:** Foundation of many encryption algorithms
- **Graphics:** Toggling pixels without knowing their current state
- **Parity checking:** Detecting single-bit errors in memory
- **Puzzles and games:** Memory-efficient state management

---

## The Takeaway

XOR is a bitwise operation that demonstrates how understanding fundamental properties can unlock elegant solutions. Whether you're finding missing numbers, encrypting messages, or impressing colleagues at technical interviews, XOR remains one of the most versatile tools in a programmer's toolkit.

Next time you see XOR in code, remember: it's not magic. It's mathematics being beautifully, efficiently clever.

---

**Ready to apply these tricks?** Start with the missing number problem – it's the perfect gateway to appreciating XOR's power.
