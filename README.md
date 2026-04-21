# Order Management App

This is a React application for managing orders using React Context, useReducer, and React Router.

## Setup

1. Install dependencies: `npm install`
2. Run the app: `npm run dev`

## Routes

- `/orders`: List all orders
- `/orders/:id`: Order details
- `/filter`: Filter orders by status
- `/stats`: Statistics (total, delivered, cancelled orders)

## Features

- All data stored in React Context (single source of truth)
- All updates go through the reducer
- No hardcoded dataset (data loaded from `/public/data.json`)
- Handles inconsistent and invalid entries by filtering and normalizing
- Uses map, filter, reduce for calculations
- Includes test ids for testing
- Exposes computed values on `window.appstate`

## Testing

Use the provided test ids to verify the app.

Computed values are available on `window.appstate` for testing.