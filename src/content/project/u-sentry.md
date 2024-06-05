---
title: U-sentry
description: "Is a project based university, which aims to act as a tools reminder for student"
preview: "./preview/u-sentry.png"
pubDate: 2022-07-15
tags: ["mobile app", "Web"]
demoLink: https://u-sentry.vercel.app/
---

# My Journey: Creating U-Sentry – An Alert App and Web Dashboard

## Introduction

As part of my journey in software development, I embarked on creating **U-Sentry**, an integrated system that combines a mobile app and a web dashboard. U-Sentry serves two main purposes:

1. **Alert System**: U-Sentry provides real-time alerts to keep university communities informed about critical events, emergencies, and important announcements.
2. **News Aggregator**: The web dashboard aggregates university-related news, ensuring that users stay up-to-date with campus happenings.

## Goals

1. **Skill Enhancement**: I aimed to deepen my knowledge in various technologies:

   - **React**: For building the web dashboard.
   - **React Native**: To create the mobile app for Android and iOS.
   - **Supabase**: As the backend database and authentication provider.
   - **Authentication**: Implementing secure user authentication.

2. **User Experience**: I wanted U-Sentry to be intuitive, efficient, and visually appealing.
3. **Placeholder Images**: To enhance the user interface, I included placeholder images for various sections.

## Implementation

### 1. Setting Up the Project

I started by creating separate directories for the mobile app and web dashboard:

```bash
# Mobile App (React Native)
npx react-native init U-Sentry-app

# Web Dashboard (React)
npx create-react-app U-Sentry
```

### 2. Designing the Mobile App

#### Features:

- **Alert Notifications**: Push notifications for emergency alerts (e.g., weather warnings, security incidents).
- **News Feed**: Displaying university news articles.
- **User Profile**: Authentication and personalized settings.

#### Placeholder Images:

|            screen-1             |
| :-----------------------------: |
| ![screen](./preview/screen.jpg) |

### 3. Building the Web Dashboard

#### Components:

- **Dashboard Overview**: Summary of recent alerts and news.
- **News Section**: Displaying articles with titles, summaries, and images.
- **Admin Panel**: For authorized users to manage alerts and news.

#### Placeholder Images:

|        Sign in page         |
| :-------------------------: |
| ![](./preview/u-sentry.png) |

### 4. Integrating Supabase

I chose **Supabase** as the backend because of its simplicity and real-time capabilities:

1. **Database Schema**:

   - Created tables for alerts, news, and user profiles.
   - Stored alert details (type, location, timestamp) and news articles.

2. **Authentication**:
   - Set up user authentication using email/password.
   - Implemented login, registration, and password reset flows.

## Conclusion

Creating U-Sentry was both challenging and rewarding. It allowed me to apply my skills, contribute to campus safety, and stay informed about university news. 🚀📰🔔
