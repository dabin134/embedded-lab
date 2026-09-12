# Embedded Lab

A web-first learning system for Embedded Systems. The platform connects three reusable content layers instead of duplicating explanations across projects:

- **Concepts** — transferable ideas such as GPIO, SPI, registers, RFID physics and digital audio.
- **Components** — concrete hardware described through role, interfaces and linked concepts.
- **Projects** — real build paths that reference concepts and components at the moment they become relevant.

The first complete learning path is **RFID-Musikplayer**: from electrical fundamentals and GPIO to MFRC522/SPI, RFID identification, audio and final system integration.

## Stack

- Next.js App Router
- React + TypeScript
- CSS without a UI framework
- Static export (`output: "export"`) so the site can be deployed to any static host

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Information architecture

```text
/                         Home / four learning paths
/projects                 Project library
/projects/rfid-music-player
/projects/rfid-music-player/steps/[slug]
/concepts                 Concept library
/concepts/spi             Example concept detail
/components               Hardware library
/components/mfrc522       Example component detail
/lab                      Interactive learning modules
/knowledge                Recall / knowledge path
```

Core content and relationships live in `lib/data.ts`. UI pages consume these references, so a concept can be improved once and reused across every project.

## Design direction

The first implementation combines **Scientific Minimal** with **Modern Lab**: bright editorial learning pages, technical grid and monospace details, a dark instrumentation layer for signals and protocol views, and a restrained acid-green status accent.
