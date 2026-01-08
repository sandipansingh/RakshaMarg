<<<<<<< HEAD
# RakshaMarg Backend API Documentation

**Version:** 1.0.0  
**Base URL:** `http://localhost:8000` (or your deployed URL)  
**Last Updated:** December 31, 2025

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)
- [API Endpoints](#api-endpoints)
  - [Health Check](#health-check)
  - [Navigation Routes](#navigation-routes)
    - [Get Safe Route](#get-safe-route)
    - [Analyze Route Safety](#analyze-route-safety)
    - [Track Navigation](#track-navigation)
    - [Get Incident Details](#get-incident-details)
    - [Trigger SOS](#trigger-sos)
- [Response Formats](#response-formats)
- [Error Handling](#error-handling)
- [Examples](#examples)

---

## Overview

The RakshaMarg Backend API provides intelligent route planning and safety analysis services. It integrates:

- **Google Maps** for route calculation
- **Gemini AI** for crime risk analysis
- **Safecity API** for incident data
- Real-time navigation tracking

### Tech Stack

- **Runtime:** Node.js
- **Framework:** Fastify 4.x
- **AI:** Google Generative AI (Gemini)
- **Maps:** Google Maps Services

---

## Authentication

All API endpoints (except `/health`) require API key authentication.

### Header Required

```
x-api-key: YOUR_API_KEY
```

### Example Request

```bash
curl -H "x-api-key: YOUR_API_KEY" \
     https://api.example.com/api/v1/navigation/route?origin=Delhi&destination=Mumbai
```

### Error Response (401)

```json
{
  "error": "Invalid or Missing API Key"
}
```

---

## Rate Limiting

- **Max Requests:** 100 requests per minute per IP/API key
- **Time Window:** 1 minute
- **Header:** Rate limit status is returned in response headers

**Response Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1704067200
```

**Rate Limit Exceeded (429):**
```json
{
  "statusCode": 429,
  "error": "Too Many Requests",
  "message": "Rate limit exceeded, retry in 1 minute"
}
```

---

## API Endpoints

### Health Check

Check if the API server is running.

**Endpoint:** `GET /health`

**Authentication:** Not required

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-31T10:30:00.000Z"
}
```

---

### Navigation Routes

Base path: `/api/v1/navigation`

---

#### Get Safe Route

Calculate the safest route between two locations with AI-powered safety analysis.

**Endpoint:** `GET /api/v1/navigation/route`

**Authentication:** Required

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `origin` | string | Yes | Starting location (address, "lat,lng", or place_id) |
| `destination` | string | Yes | Destination location (address, "lat,lng", or place_id) |

**Example Request:**

```bash
curl -X GET \
  "http://localhost:8000/api/v1/navigation/route?origin=28.6139,77.2090&destination=28.5355,77.3910" \
  -H "x-api-key: YOUR_API_KEY"
```

**Response (200):**

```json
{
  "routes": [
    {
      "summary": "NH 24",
      "distance": {
        "text": "23.5 km",
        "value": 23500
      },
      "duration": {
        "text": "45 mins",
        "value": 2700
      },
      "legs": [
        {
          "start_location": { "lat": 28.6139, "lng": 77.2090 },
          "end_location": { "lat": 28.5355, "lng": 77.3910 },
          "steps": [...]
        }
      ],
      "overview_polyline": {
        "points": "encoded_polyline_string"
      },
      "safetyScore": 78,
      "crimeScore": 28,
      "aiCrimeAnalysis": {
        "derived_risk_summary": {
          "overall_risk_level": "low",
          "key_concerns": [],
          "recommendations": ["Well-lit area", "Active police presence"]
        },
        "modelUsed": "gemini-1.5-flash"
      },
      "modelUsed": "gemini-1.5-flash"
    }
  ],
  "meta": {
    "count": 3,
    "provider": "Google Maps + Gemini",
    "timestamp": "2025-12-31T10:30:00.000Z"
  }
}
```

**Safety Score Breakdown:**

- **Crime Score (0-30):** Based on AI risk analysis
  - Low risk: 28
  - Moderate risk: 17
  - High risk: 5
- **Lighting Score (0-20):** Street lighting quality
- **Crowd Score (0-20):** Pedestrian activity level
- **Help Nearby (0-15):** Proximity to emergency services
- **Time of Day (0-15):** Current time safety factor

**Total Safety Score:** 0-100 (higher is safer)

---

#### Analyze Route Safety

Detailed safety analysis for routes between origin and destination.

**Endpoint:** `POST /api/v1/navigation/safety`

**Authentication:** Required

**Request Body:**

```json
{
  "origin": "28.6139,77.2090",
  "destination": "28.5355,77.3910"
}
```

**Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `origin` | string | Yes | Starting location (address, "lat,lng", or place_id) |
| `destination` | string | Yes | Destination (address, "lat,lng", or place_id) |

**Example Request:**

```bash
curl -X POST \
  "http://localhost:8000/api/v1/navigation/safety" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "Connaught Place, New Delhi",
    "destination": "India Gate, New Delhi"
  }'
```

**Response (200):**

```json
{
  "routes": [
    {
      "summary": "Rajpath",
      "distance": { "text": "3.2 km", "value": 3200 },
      "duration": { "text": "12 mins", "value": 720 },
      "safetyScore": 85,
      "crimeScore": 28,
      "safetyFactors": {
        "lighting": 18,
        "crowdActivity": 19,
        "emergencyServices": 13,
        "timeOfDay": 12
      }
    }
  ],
  "safest_route": "Rajpath"
}
```

---

#### Track Navigation

Monitor user's location during navigation and detect if they deviate from the planned route.

**Endpoint:** `POST /api/v1/navigation/track`

**Authentication:** Required

**Request Body:**

```json
{
  "currentLat": 28.6139,
  "currentLng": 77.2090,
  "routePolyline": "encoded_polyline_from_route_response"
}
```

**Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `currentLat` | number | Yes | User's current latitude |
| `currentLng` | number | Yes | User's current longitude |
| `routePolyline` | string | Yes | Encoded polyline from route response |

**Example Request:**

```bash
curl -X POST \
  "http://localhost:8000/api/v1/navigation/track" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "currentLat": 28.6145,
    "currentLng": 77.2095,
    "routePolyline": "your_encoded_polyline_here"
  }'
```

**Response (200) - On Route:**

```json
{
  "status": "on_route",
  "needsReroute": false,
  "distanceFromRoute": 12.45,
  "timestamp": "2025-12-31T10:30:00.000Z"
}
```

**Response (200) - Off Route:**

```json
{
  "status": "off_route",
  "needsReroute": true,
  "distanceFromRoute": 75.32,
  "timestamp": "2025-12-31T10:30:00.000Z"
}
```

**Logic:**

- **Threshold:** 50 meters from route
- **Status:** `on_route` if within threshold, `off_route` otherwise
- **distanceFromRoute:** Distance in meters to nearest point on route

---

#### Get Incident Details

Fetch detailed information about specific incidents from Safecity API.

**Endpoint:** `GET /api/v1/navigation/incident/details`

**Authentication:** Required

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Comma-separated incident IDs (max 15) |

**Example Request:**

```bash
curl -X GET \
  "http://localhost:8000/api/v1/navigation/incident/details?id=11837,11842,12099" \
  -H "x-api-key: YOUR_API_KEY"
```

**Response (200):**

```json
{
  "count": 3,
  "incidents": [
    {
      "id": 11837,
      "type": "harassment",
      "description": "Eve teasing near bus stop",
      "location": {
        "lat": 28.6139,
        "lng": 77.2090,
        "address": "Connaught Place, New Delhi"
      },
      "date": "2025-12-15T18:30:00.000Z",
      "severity": "moderate"
    },
    {
      "id": 11842,
      "type": "theft",
      "description": "Mobile snatching",
      "location": {
        "lat": 28.6200,
        "lng": 77.2150,
        "address": "Kashmere Gate, Delhi"
      },
      "date": "2025-12-20T21:00:00.000Z",
      "severity": "high"
    }
  ]
}
```

**Constraints:**

- Maximum 15 incident IDs per request
- IDs can be comma-separated: `?id=11837,11842,12099`
- Or multiple params: `?id=11837&id=11842&id=12099`

---

#### Trigger SOS

Trigger an emergency SOS alert with user's current location.

**Endpoint:** `POST /api/v1/navigation/sos`

**Authentication:** Required

**Request Body:**

```json
{
  "location": {
    "lat": 28.6139,
    "lng": 77.2090
  },
  "userId": "user_12345",
  "message": "Emergency help needed"
}
```

**Example Request:**

```bash
curl -X POST \
  "http://localhost:8000/api/v1/navigation/sos" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "location": {
      "lat": 28.6139,
      "lng": 77.2090
    },
    "userId": "user_12345",
    "message": "Emergency help needed"
  }'
```

**Response (200):**

```json
{
  "status": "SOS Triggered",
  "timestamp": "2025-12-31T10:30:00.000Z",
  "alertId": "sos_abc123xyz"
}
```

---

## Response Formats

### Success Response

All successful responses follow this structure:

```json
{
  "data": { ... },
  "meta": {
    "timestamp": "2025-12-31T10:30:00.000Z"
  }
}
```

### Error Response

All error responses include:

```json
{
  "error": "Error Type",
  "message": "Human-readable error message",
  "statusCode": 400
}
```

---

## Error Handling

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid/missing API key |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

### Common Errors

#### 400 Bad Request

```json
{
  "error": "Bad Request",
  "message": "Both origin and destination are required"
}
```

#### 401 Unauthorized

```json
{
  "error": "Invalid or Missing API Key"
}
```

#### 404 Not Found

```json
{
  "error": "No Routes Found",
  "message": "No routes found between the specified origin and destination"
}
```

#### 500 Internal Server Error

```json
{
  "error": "Internal Server Error",
  "message": "An error occurred while processing your request"
}
```

---

## Examples

### Complete Workflow Example

#### 1. Get Safe Route

```bash
# Request safest route
curl -X GET \
  "http://localhost:8000/api/v1/navigation/route?origin=Connaught%20Place&destination=India%20Gate" \
  -H "x-api-key: YOUR_API_KEY"
```

#### 2. Start Navigation Tracking

```bash
# Send periodic location updates
curl -X POST \
  "http://localhost:8000/api/v1/navigation/track" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "currentLat": 28.6325,
    "currentLng": 77.2197,
    "routePolyline": "encoded_polyline_from_step_1"
  }'
```

#### 3. Check Incident Details (if needed)

```bash
# Get details for nearby incidents
curl -X GET \
  "http://localhost:8000/api/v1/navigation/incident/details?id=11837,11842" \
  -H "x-api-key: YOUR_API_KEY"
```

#### 4. Trigger SOS (if emergency)

```bash
# Send emergency alert
curl -X POST \
  "http://localhost:8000/api/v1/navigation/sos" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "location": { "lat": 28.6139, "lng": 77.2090 },
    "userId": "user_12345",
    "message": "Emergency"
  }'
```

---

## Additional Information

### Environment Variables

Required environment variables:

```env
PORT=8000
APP_API_KEY=your_api_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_key
GEMINI_API_KEY=your_gemini_key
```

### CORS Configuration

CORS is enabled for all origins in development. Configure for production:

```javascript
cors: {
  origin: ['https://yourdomain.com']
}
```

### Logging

All API requests are logged using Fastify's built-in logger (Pino).

---

## Support

For issues or questions:
- GitHub: [Your Repository]
- Email: support@rakshamarg.com

---

**Last Updated:** December 31, 2025  
**API Version:** 1.0.0
=======
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

## 💡 Inspiration

We've all been there—walking home late at night, clutching our phones, hyper-aware of every shadow. Most navigation apps tell you the *fastest* route, sending you down dark alleys or desolate streets just to save a minute.

We asked ourselves: **Why isn't there a map that cares about your safety as much as your time?**

That's why we built **RakshaMarg**. It's not just a navigation tool; it's a companion that guides you through the safest, most well-lit, and populated paths. Because arriving safely is more important than arriving early.

## 🚀 What it does

RakshaMarg is an intelligent safety-first navigation system.

*   **🛡️ Safety Scores**: We analyze routes and assign a safety score (0-100) based on street lighting, crime data, and crowd density.
*   **💡 Smart Routing**: Our algorithm prioritizes "Safety Corridors"—well-lit main roads and active areas—over shortcuts through unsafe zones.
*   **📍 Live Tracking**: Share your real-time location with trusted contacts. They can watch over you virtually until you reach your destination.
*   **🆘 SOS Button**: A single tap instantly alerts your emergency contacts with your precise location.
*   **🏥 Safe Zones**: Automatically highlights nearby police stations, hospitals, and 24/7 open establishments along your route.

## ⚙️ How we built it

We built RakshaMarg using a modern, scalable tech stack:

### Frontend 🎨
*   **React + TypeScript**: For a robust and type-safe UI.
*   **Vite**: For lightning-fast development and building.
*   **Tailwind CSS + Shadcn UI**: For a sleek, accessible, and responsive design.
*   **Three.js (@react-three/fiber)**: To create an immersive 3D map experience.
*   **Google Maps Platform**: The core engine for routing and geolocation.

## 🧠 Challenges we ran into

*   **Quantifying "Safety"**: Safety is subjective. Combining objective data (streetlights) with subjective feelings (isolation) into a single score was a complex algorithmic challenge.
*   **3D Map Performance**: Rendering 3D elements on a map without lagging the browser required heavy optimization of our Three.js components.

## 🏆 Accomplishments that we're proud of

*   Successfully integrating **safety analysis** with standard routing.
*   Building a **beautiful, dark-mode first UI** that feels premium and trustworthy.
*   The **3D integration** on the landing page just looks cool!

## 🔮 What's next for RakshaMarg

*   **Crowdsourced Safety**: allowing users to report broken streetlights or unsafe incidents in real-time.
*   **WearOS Support**: A companion watch app for discreet vibration-based navigation.
*   **Offline Mode**: Downloading safe routes for areas with poor connectivity.

## 📦 quick Links

*   [**Frontend Documentation**](./frontend/README.md) - Setup, and directory structure.

---

<div align="center">
  <p>Made with ❤️ for a safer world.</p>
  <p>© 2025 RakshaMarg. All rights reserved.</p>
</div>
>>>>>>> 9dcea342f49b6725b7c4d1c59e7d1368ad20e918
