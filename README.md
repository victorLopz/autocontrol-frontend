# AutoControl Frontend

AutoControl Pro is a modern web application designed for automotive workshop management, including service orders, clients, inventory, and billing.

This repository contains the frontend application built with Next.js using a scalable architecture based on Clean Architecture and Domain-Driven Design (DDD).

## 🚀 Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Clean Architecture + DDD
- Modular architecture by feature (auth, dashboard, etc.)

## 🧠 Architecture

The project follows a modular structure:

- `modules/` → Business domains (auth, dashboard, etc.)
- `shared/` → Cross-cutting concerns (UI, utils, infrastructure)
- `app/` → Next.js routing layer

Each module is divided into:

- `domain` → Business rules
- `application` → Use cases
- `infrastructure` → External integrations
- `presentation` → UI layer

## 🎯 Goal

Build a scalable, maintainable, and production-ready frontend for a business management system.