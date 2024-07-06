---
title: My Third Blog Post
description: I had some challenges, but asking in the community really helped!
preview: ./preview/make-it.avif
pubDate: 2022-07-15
tags:
  - Astro
---

# My Astro-React-Tailwind Journey

## Discovery

Once upon a time, I embarked on a web development adventure. Armed with Astro, React, and Tailwind CSS, I set out to create something magical.

## Setting the Stage

In my project directory, I installed Astro using:

```bash
npm create astro@latest my-astro-website
```

Next, I added React and Tailwind CSS:

```bash
npx astro add react
npx astro add tailwind
```

## Crafting the Layout

I customized my layout in `Layout.astro` and organized my components. Here's a snippet of how I imported them:

```astro
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import Problem from '../components/Problem.astro';
// ... other components
import Footer from '../components/Footer.astro';

<Layout>
  <main class='pt-[58px] lg:pt-[72px]'>
    <Hero />
    <Problem />
    <!-- More components -->
    <Footer />
  </main>
</Layout>
```

## Tailwind Magic

In my `tailwind.config.mjs`, I defined custom colors and extended the theme:

```js title="tailwind.config.mjs" {2, 5-8}
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Roboto", sans-serif'],
      },
      colors: {
        // Custom colors here
        // ...
      },
    },
  },
  plugins: [],
};
```

## The Grand Finale

With Astro's server-first approach, React's dynamic UI, and Tailwind's styling prowess, my website came to life. It was fast, SEO-friendly, and delightful.

And so, my Astro-React-Tailwind journey continues, weaving code into pixels and dreams into reality.

The end. 🌟

It wasn't always smooth sailing, but I'm enjoying building with Astro. And, the [Discord community](https://astro.build/chat) is really friendly and helpful!
