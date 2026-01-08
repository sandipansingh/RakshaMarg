# RakshaMarg

> **Navigate the Night with Intelligence.**

<div align="center">
  <img src="frontend/public/logo.png" alt="RakshaMarg Logo" width="200" />
</div>

<br />

<div align="center">
  <img src="https://img.shields.io/badge/Safety-First-red?style=for-the-badge&logo=security" alt="Safety First" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Google_Maps-4285F4?style=for-the-badge&logo=google-maps&logoColor=white" alt="Google Maps" />
</div>

<br />

## Inspiration

We've all been there—walking home late at night, clutching our phones, hyper-aware of every shadow. Most navigation apps tell you the *fastest* route, sending you down dark alleys or desolate streets just to save a minute.

We asked ourselves: **Why isn't there a map that cares about your safety as much as your time?**

That's why we built **RakshaMarg**. It's not just a navigation tool; it's a companion that guides you through the safest, most well-lit, and populated paths. Because arriving safely is more important than arriving early.

## What it does

RakshaMarg is an intelligent safety-first navigation system.

*   **Safety Scores**: We analyze routes and assign a safety score (0-100) based on street lighting, crime data, and crowd density.
*   **Smart Routing**: Our algorithm prioritizes "Safety Corridors"—well-lit main roads and active areas—over shortcuts through unsafe zones.
*   **Live Tracking**: Share your real-time location with trusted contacts. They can watch over you virtually until you reach your destination.
*   **SOS Button**: A single tap instantly alerts your emergency contacts with your precise location.
*   **Safe Zones**: Automatically highlights nearby police stations, hospitals, and 24/7 open establishments along your route.

## Google Tech Used

RakshaMarg harnesses the power of Google's advanced technologies to deliver safety and intelligence:

*   **Google Maps API**: Serves as the foundation for the interactive map and location services.
*   **Google Directions API**: Calculates precise routes and navigation paths between locations.
*   **Gemini API**: Powers the advanced crime risk analysis algorithms and provides intelligent fallback logic for safety scoring when data is sparse.

## How we built it

We built RakshaMarg using a modern, scalable tech stack:

### Frontend
*   **React + TypeScript**: For a robust and type-safe UI.
*   **Vite**: For lightning-fast development and building.
*   **Tailwind CSS + Shadcn UI**: For a sleek, accessible, and responsive design.
*   **Three.js (@react-three/fiber)**: To create an immersive 3D map experience.
*   **Google Maps Platform**: The core engine for routing and geolocation.

### Backend
*   **Node.js**: As the runtime environment.
*   **Fastify**: High-performance web framework for the API.
*   **Google Generative AI (Gemini)**: For processing and analyzing safety data.
*   **Google Maps Services**: For server-side routing and geocoding.

## Challenges we ran into

*   **Quantifying "Safety"**: Safety is subjective. Combining objective data (streetlights) with subjective feelings (isolation) into a single score was a complex algorithmic challenge.
*   **3D Map Performance**: Rendering 3D elements on a map without lagging the browser required heavy optimization of our Three.js components.

## Accomplishments that we're proud of

*   Successfully integrating **safety analysis** with standard routing.
*   Building a **beautiful, dark-mode first UI** that feels premium and trustworthy.
*   The **3D integration** on the landing page just looks cool!

## What's next for RakshaMarg

*   **Crowdsourced Safety**: allowing users to report broken streetlights or unsafe incidents in real-time.
*   **WearOS Support**: A companion watch app for discreet vibration-based navigation.
*   **Offline Mode**: Downloading safe routes for areas with poor connectivity.

## Quick Links

*   [**Frontend Documentation**](./frontend/README.md) - Setup, and directory structure.
*   [**Backend Documentation**](./src/README.md) - API endpoints and server setup.

---

<div align="center">
  <p>Made with ❤️ for a safer world.</p>
  <p>© 2025 RakshaMarg. All rights reserved.</p>
</div>
