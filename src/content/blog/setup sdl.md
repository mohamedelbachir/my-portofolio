---
title: Setting Up a New Blank Window Project with SDL and C++ on Windows
pubDate: 2024-06-12
description: In this blog post, we'll walk through setting up a new project using the Simple DirectMedia Layer (SDL) library with C++ on a Windows platform.

preview: ./preview/sdl-setup.jpg
tags:
  - Cpp
  - SDL
---

## Introduction

In this blog post, we'll walk through setting up a new project using the Simple DirectMedia Layer (SDL) library with C++ on a Windows platform. SDL is a powerful tool for handling graphics, sound, and input, making it ideal for game development and other multimedia applications. By the end of this guide, you'll have a basic SDL project running in a window, ready for further development.

## Prerequisites

Before we start, make sure you have the following:

1. **A Windows PC**
2. **A C++ Compiler** (e.g., MinGW, Visual Studio)
3. **An Integrated Development Environment (IDE)** (e.g., Visual Studio, Code::Blocks)
4. **SDL2 Development Libraries**

## Step 1: Install SDL2

First, you need to download the SDL2 development libraries.

1. Go to the [SDL2 download page](https://www.libsdl.org).
2. Download the development libraries for Windows (SDL2-devel-2.0.x-VC.zip for Visual Studio or SDL2-devel-2.0.x-mingw.zip for MinGW).

Extract the downloaded zip file to a location of your choice.

## Step 2: Setting Up the Project in Your IDE

### Visual Studio

1. **Create a New Project:**

   - Open Visual Studio.
   - Create a new "Empty Project" in C++.

2. **Configure Project Properties:**

   - Right-click on your project in the Solution Explorer and select "Properties".
   - Under "Configuration Properties", navigate to "VC++ Directories".
     - Add the path to the SDL2 include directory to "Include Directories".
     - Add the path to the SDL2 lib directory to "Library Directories".

3. **Link SDL2 Libraries:**
   - Under "Configuration Properties", go to "Linker" -> "Input".
   - Add `SDL2.lib` and `SDL2main.lib` to "Additional Dependencies".

### Code::Blocks with MinGW

1. **Create a New Project:**

   - Open Code::Blocks.
   - Create a new "Console Application" in C++.

2. **Configure Build Options:**

   - Right-click on your project in the "Projects" tab and select "Build options".
   - Under "Search directories", add the path to the SDL2 include directory in the "Compiler" tab and the path to the SDL2 lib directory in the "Linker" tab.

3. **Link SDL2 Libraries:**
   - Go to the "Linker settings" tab and add `-lSDL2 -lSDL2main`.

## Step 3: Writing the SDL Code

Create a new source file (e.g., `main.cpp`) and write the following code to initialize SDL and create a window:

```cpp title="main.cpp"
#include <SDL.h>
#include <iostream>

// Screen dimension constants
const int SCREEN_WIDTH = 640;
const int SCREEN_HEIGHT = 480;

int main(int argc, char* args[])
{
    // Initialize SDL
    if (SDL_Init(SDL_INIT_VIDEO) < 0) {
        std::cerr << "SDL could not initialize! SDL_Error: " << SDL_GetError() << std::endl;
        return 1;
    }

    // Create window
    SDL_Window* window = SDL_CreateWindow("SDL Tutorial", SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, SCREEN_WIDTH, SCREEN_HEIGHT, SDL_WINDOW_SHOWN);
    if (window == NULL) {
        std::cerr << "Window could not be created! SDL_Error: " << SDL_GetError() << std::endl;
        SDL_Quit();
        return 1;
    }

    // Get window surface
    SDL_Surface* screenSurface = SDL_GetWindowSurface(window);

    // Fill the surface white
    SDL_FillRect(screenSurface, NULL, SDL_MapRGB(screenSurface->format, 0xFF, 0xFF, 0xFF));

    // Update the surface
    SDL_UpdateWindowSurface(window);

    // Wait two seconds
    SDL_Delay(2000);

    // Destroy window
    SDL_DestroyWindow(window);

    // Quit SDL subsystems
    SDL_Quit();

    return 0;
}
```

## Step 4: Building and Running the Project

### Visual Studio

1. Save your source file.
2. Build the solution by selecting "Build Solution" from the "Build" menu.
3. Run the application by pressing "F5" or selecting "Start Debugging" from the "Debug" menu.

### Code::Blocks with MinGW

1. Save your source file.
2. Build the project by selecting "Build" from the "Build" menu.
3. Run the application by selecting "Run" from the "Build" menu.

## Conclusion

Congratulations! You've set up a basic SDL project in C++ on a Windows system. This foundational setup allows you to dive deeper into SDL's capabilities, including handling events, rendering graphics, and managing audio. Happy coding!

For more detailed tutorials and SDL documentation, visit the [SDL wiki](https://wiki.libsdl.org/).
