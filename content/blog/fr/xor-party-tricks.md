---
title: Les Astuces XOR – La Magie de l'Opération Bitwise
description: Découvrez la magie cachée du XOR (OU exclusif) – une opération bitwise qui permet des solutions élégantes pour l'échange de variables, le chiffrement et la recherche d'éléments manquants. Apprenez les astuces qui font sourire les développeurs.
date: 2026-03-06
---

# Les Astuces XOR : L'Opération Bitwise Qui Continue de Fasciner

XOR (OU exclusif) est l'une de ces opérations qui semble simple en surface mais cache une puissance extraordinaire en dessous. C'est le genre d'astuce qui fait hocher la tête aux développeurs expérimentés et penser aux développeurs juniors : « Comment ont-ils trouvé ça ? »

Découvrons la magie.

---

## Les Fondations : Comprendre XOR

L'opération XOR est magnifiquement simple : elle retourne `1` quand les bits sont différents, et `0` quand ils sont identiques.

| A   | B   | A ⊕ B |
| --- | --- | ----- |
| 0   | 0   | 0     |
| 0   | 1   | 1     |
| 1   | 0   | 1     |
| 1   | 1   | 0     |

Mais c'est ici que ça devient intéressant. XOR possède une propriété magique qui forme la fondation de tous ces astuces :

### La Propriété d'Auto-annihilation

**`a ⊕ b ⊕ b = a`**

Cette simple propriété est la clé de tout. Quand vous faites un XOR d'une valeur avec elle-même, elle disparaît. Quand vous la faites avec quelque chose d'autre, elle réapparaît.

```
a = 5       (binaire: 101)
b = 3       (binaire: 011)

a ⊕ b = 6   (binaire: 110)
a ⊕ b ⊕ b = a ⊕ (b ⊕ b) = a ⊕ 0 = 5
```

Construisons quelque chose d'extraordinaire avec cette propriété.

---

## Astuce #1 : Trouver le Nombre Manquant

Imaginez que vous ayez les nombres 1 à 100, mais l'un d'entre eux manque. Vous avez aussi un tableau mélangé où un nombre apparaît deux fois à la place de celui qui manque. Comment trouvez-vous ce qui manque et ce qui est dupliqué ?

**La Solution XOR :**

```c
#include <stdio.h>

int xs[] = {7,62,2,46,73,43,26,82,5,95,57,56,44,21,40,79,13,6,9,8,72,59,65,81,60,78,13,85,87,58,48,25,32,47,67,4,31,19,33,1,92,14,53,89,84,54,29,10,17,3,77,70,45,97,34,23,86,55,15,64,68,83,76,41,18,39,94,22,74,11,69,49,12,35,20,90,100,98,36,63,91,38,66,93,50,96,61,71,75,37,52,88,30,28,99,27,42,51,80,24,16};

int main()
{
    int x = 0;

    // Faire un XOR de tous les nombres de 1 à 100
    for (int i = 1; i <= 100; ++i) {
        x ^= i;
    }

    // Faire un XOR de tous les nombres dans notre tableau
    size_t n = sizeof(xs)/sizeof(xs[0]);
    for (int i = 0; i < n; ++i) {
        x ^= xs[i];
    }

    // Le résultat est le nombre que nous cherchons !
    printf("%d\n", x);
    return 0;
}
```

**Comment ça marche :**

Quand vous faites un XOR de tous les nombres de 1-100, chaque nombre apparaît une fois. Quand vous le faites avec le tableau, le double s'annule (car `a ⊕ a = 0`), ne laissant que le nombre manquant.

C'est comme un magicien qui fait tout disparaître sauf ce qui n'a jamais été là pour commencer.

---

## Astuce #2 : Chiffrement Secret Avec Une Seule Clé

Vous avez besoin d'un simple schéma de chiffrement ? XOR vous couvre.

```python
def encrypt(m, k):
  return ''.join([chr(ord(a)^k) for a in m])

# Utilisation :
message = "Bonjour, le Monde !"
key = 42

encrypted = encrypt(message, key)
print(encrypted)  # Cela ressemble à du charabia

# Pour déchiffrer, chiffrez simplement à nouveau !
decrypted = encrypt(encrypted, key)
print(decrypted)  # "Bonjour, le Monde !"
```

**Pourquoi ça marche ?**

XOR est son propre inverse. Si vous chiffrez avec une clé, chiffrer à nouveau avec la même clé vous donne l'original.

```
texte_clair ⊕ clé = texte_chiffré
texte_chiffré ⊕ clé = texte_clair
```

**Note Importante :** C'est parfait pour l'obfuscation simple ou l'apprentissage, mais la vraie cryptographie nécessite beaucoup plus de complexité. N'utilisez pas cela pour protéger des données sensibles !

---

## Astuce #3 : Liste Chaînée XOR – La Magie de la Mémoire

Vous voulez traverser une liste chaînée dans les deux directions tout en stockant la moitié des pointeurs ?

Bienvenue à la liste chaînée XOR – une structure de données qui utilise XOR comme astuce de mémoire :

```c
#include <stdint.h>
#include <stdlib.h>
#include <stdio.h>

typedef struct {
    int value;
    uintptr_t xored;  // Stocke : prev ^ next
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
        ll->end->xored ^= (uintptr_t)node;  // Mise à jour : prev ^ next
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

Chaque nœud stocke `prev ⊕ next` au lieu de deux pointeurs. Pour traverser, vous faites un XOR de cette valeur avec l'adresse du nœud précédent pour récupérer le pointeur suivant.

**Pourquoi ?** Dans les systèmes où la mémoire est limitée, cela économise du stockage. Mais dans l'informatique moderne, c'est plus un puzzle élégant qu'une solution pratique.

---

## Astuce #4 : Échanger Deux Variables Sans Variable Temporaire

L'astuce classique des questions d'entretien d'embauche :

```c
#include <stdio.h>

int main()
{
    int a = 69;
    int b = 420;

    printf("Avant : %d %d\n", a, b);

    a ^= b;  // a = 69 ^ 420, b = 420
    b ^= a;  // b = 420 ^ (69 ^ 420) = 69
    a ^= b;  // a = (69 ^ 420) ^ 69 = 420

    printf("Après : %d %d\n", a, b);

    return 0;
}
```

**Sortie :**

```
Avant : 69 420
Après : 420 69
```

**Comment ça marche :**

- `a ^= b` transforme `a` en un conteneur contenant les deux valeurs
- `b ^= a` extrait l'original `a` et le stocke dans `b`
- `a ^= b` extrait l'original `b` et le stocke dans `a`

**Note Moderne :** Les compilateurs sont assez intelligents pour optimiser l'approche simple avec une variable `temp`, et c'est plus lisible. Utilisez l'astuce XOR lors d'entretiens pour impressionner, mais dans le code de production, gardez-le simple.

---

## Pourquoi XOR est Spécial

Ces astuces fonctionnent car XOR possède des propriétés que peu d'autres opérations partagent :

1. **Auto-annihilation :** `a ⊕ a = 0`
2. **Identité :** `a ⊕ 0 = a`
3. **Commutativité :** `a ⊕ b = b ⊕ a`
4. **Associativité :** `(a ⊕ b) ⊕ c = a ⊕ (b ⊕ c)`
5. **Inverse :** XOR est son propre inverse

Ces propriétés font de XOR un outil puissant pour la manipulation de bits, le traitement des données et l'élégance algorithmique.

---

## Applications Pratiques Au-delà des Astuces

XOR n'est pas seulement pour les astuces amusantes. Les utilisations réelles incluent :

- **Détection d'erreurs :** Sommes de contrôle XOR dans la transmission de données
- **Cryptographie :** Fondation de nombreux algorithmes de chiffrement
- **Graphiques :** Basculer les pixels sans connaître leur état actuel
- **Vérification de parité :** Détecter les erreurs de bit unique en mémoire
- **Puzzles et jeux :** Gestion efficace des états en mémoire

---

## Le Message à Retenir

XOR est une opération bitwise qui démontre comment comprendre les propriétés fondamentales peut déverrouiller des solutions élégantes. Que vous trouviez des nombres manquants, chiffriez des messages ou impressionniez vos collègues lors d'entretiens techniques, XOR reste l'un des outils les plus polyvalents dans la boîte à outils d'un programmeur.

La prochaine fois que vous voyez XOR dans le code, souvenez-vous : ce n'est pas de la magie. C'est des mathématiques qui sont magnifiquement, efficacement intelligentes.

---

**Prêt à appliquer ces astuces ?** Commencez par le problème du nombre manquant – c'est la porte d'entrée parfaite pour apprécier la puissance de XOR.
