---
title: Résoudre le problème de section cachée par le header en position "fixed" ou "sticky"
pubDate: 2024-07-06T17:27:15.097Z
type: blog
description: Comment ressoudre le problème de section caché derriere les headers de votre page simplement
preview: preview/css-tips-and-tricks.avif
tags:
  - CSS
---

En développement web, un problème courant lors de l'utilisation de liens d'ancrage (`<a>` tags) est que la section ciblée se cache derrière un en-tête fixe. Cela peut être ennuyeux pour les utilisateurs, surtout lorsque l'en-tête est grand. Récemment, j'ai découvert une astuce facile pour résoudre ce problème, et j'aimerais la partager avec vous.

## Le Problème

Lorsque vous cliquez sur un lien d'ancrage, il fait défiler la page jusqu'à l'élément cible. Cependant, si votre site Web a un en-tête fixe, l'élément cible peut se retrouver caché derrière, par exemple ici notre titre de section est caché par l'entête.
Voici un exemple :

## La Solution

Pour résoudre ce problème, vous definissiez juste le selecteur `html` dans votre balise `<style>` ou dans un fichier style externe:

```css
html {
  scroll-padding-top: var(--hauteur-header);
  overscroll-behavior: none;
  scroll-behavior: smooth;
}
```

Après avoir ajouter juste ce petit bout de code vous constaterez deux choses :

- le scroll est devenu plus `fluide`
- votre section n'est pas obstrué par le `header`

### Le resultat

### Exemple Complet

Voici l'exemple complet avec la solution implémentée :

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Exemple d'Ancre</title>
    <style>
      * {
        box-sizing: border-box;
      }

      /*on defini une variable definissant la taille du header*/
      :root {
        --hauteur-header: 50px;
      }

      /*Correction */
      html {
        scroll-padding-top: var(--hauteur-header);
        overscroll-behavior: none;
        scroll-behavior: smooth;
      }

      body {
        margin: 0;
        padding: 0;
      }

      /*style des liens*/
      nav {
        display: flex;
        gap: 10px;
      }
      nav a {
        text-decoration: none;
        color: yellow;
      }

      /*style du header*/
      header {
        position: sticky; /*pour rendre le header fixe*/
        top: 0;
        width: 100%;
        height: var(--hauteur-header); /*on utilise cette variable*/
        background-color: #333;
        color: white;
        text-align: center;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
      }

      /*styles des sections*/
      section {
        min-height: 100vh; /*pour simuler du contenu*/
        color: black;
      }
      section h2 {
        margin-top: 0;
      }
      #section1 {
        background-color: green;
      }
      #section2 {
        background-color: red;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>Mon site</h1>
      <nav>
        <a href="#section1">lien 1</a>
        <a href="#section2">lien 2</a>
      </nav>
    </header>
    <section id="section1">
      <h2>Section 1</h2>
      <p>Contenu de la section 1...</p>
    </section>
    <section id="section2">
      <h2>Section 2</h2>
      <p>Contenu de la section 2...</p>
    </section>
  </body>
</html>
```

## Conclusion

Cette astuce simple peut vous éviter bien des tracas et améliorer l'expérience utilisateur sur votre site Web.N'hésitez pas à essayer cette solution et à me faire savoir si elle fonctionne pour vous !

Vous pouviez rejoindre ma communauté des dévéloppeurs [içi](/community)
