# Louise Backend API Documentation

## Overview

This document describes the conventions for sending requests and receiving responses from the Louise Backend API. All endpoints accept and return data in JSON format. Authentication is required for protected routes.

---

## General Request Format

- **Content-Type:** application/json
- **Authentication:** Bearer Token (for protected endpoints)
- **Method:** Use appropriate HTTP methods (GET, POST, PUT, DELETE)

### Example Request Header

```
POST /api/v1/user
Content-Type: application/json
Authorization: Bearer <token>
```

### Example Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourPassword123"
}
```

---

## General Response Format

- **Success:** HTTP status 200/201, JSON body with `success: true`, `data`, and optional `message`
- **Error:** HTTP status 4xx/5xx, JSON body with `success: false`, `message`, and optional `error` details

### Example Success Response

```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "User created successfully."
}
```

### Example Error Response

```json
{
  "success": false,
  "message": "Validation failed.",
  "error": {
    "field": "email",
    "issue": "Email already exists."
  }
}
```

---

## Endpoint Example: User Registration

- **URL:** `/api/v1/user/register`
- **Method:** POST
- **Request Body:**
  - `name` (string, required)
  - `email` (string, required, unique)
  - `password` (string, required, min 8 chars)

- **Success Response:**
  - Status: 201 Created
  - Body: See "Example Success Response" above

- **Error Response:**
  - Status: 400 Bad Request
  - Body: See "Example Error Response" above

---

## Endpoint Example: Login

- **URL:** `/api/v1/auth/login`
- **Method:** POST
- **Request Body:**
  - `email` (string, required)
  - `password` (string, required)

- **Success Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "success": true,
      "data": {
        "token": "<jwt_token>"
      },
      "message": "Login successful."
    }
    ```

- **Error Response:**
  - Status: 401 Unauthorized
  - Body: See "Example Error Response" above

---


---

## Auth API

### 1. Sign Up (User Registration)

- **Endpoint:** `/api/v1/auth/signup`
- **Method:** POST
- **Request Body:**
  - `name` (string, required)
  - `email` (string, required, unique)
  - `password` (string, required, minimum 8 characters)

#### Example Request

```http
POST /api/v1/auth/signup
Content-Type: application/json
```

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securePassword123"
}
```

#### Success Response

- **Status:** 201 Created

```json
{
  "success": true,
  "data": {
    "id": "user_456",
    "name": "Jane Doe",
    "email": "jane@example.com"
  },
  "message": "User registered successfully."
}
```

#### Error Response

- **Status:** 400 Bad Request

```json
{
  "success": false,
  "message": "Validation failed.",
  "error": {
    "field": "email",
    "issue": "Email already exists."
  }
}
```

---

### 2. Sign In (User Login)

- **Endpoint:** `/api/v1/auth/login`
- **Method:** POST
- **Request Body:**
  - `email` (string, required)
  - `password` (string, required)

#### Example Request

```http
POST /api/v1/auth/login
Content-Type: application/json
```

```json
{
  "email": "jane@example.com",
  "password": "securePassword123"
}
```

#### Success Response

- **Status:** 200 OK

```json
{
  "success": true,
  "data": {
    "token": "<jwt_token>"
  },
  "message": "Login successful."
}
```

#### Error Response

- **Status:** 401 Unauthorized

```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

---

## Notes

- Always send data in JSON format.
- All responses are in JSON format.
- For errors, check the `message` and `error` fields for details.
- For authentication, include the Bearer token in the `Authorization` header.

## Bulk Data for Create Venue

```
serialId:00011
name:Baker’s Delight
venue_type:bakery
location:Banani, Dhaka
isBlocked:false
ratings:4
popular_Item:Croissant
isDeleted:false
isFeatured:true
menu:[↵  {↵    "item_name": "Croissant",↵    "item_description": "Buttery French pastry",↵    "item_price": 3.5↵  },↵  {↵    "item_name": "Chocolate Muffin",↵    "item_description": "Rich and soft with dark chocolate",↵    "item_price": 2.75↵  }↵]
opening_hours:{↵  "sunday": { "isClosed": false, "openTime": "08:00", "closeTime": "18:00" },↵  "monday": { "isClosed": false, "openTime": "08:00", "closeTime": "18:00" },↵  "tuesday": { "isClosed": false, "openTime": "08:00", "closeTime": "18:00" },↵  "wednesday": { "isClosed": false, "openTime": "08:00", "closeTime": "18:00" },↵  "thursday": { "isClosed": false, "openTime": "08:00", "closeTime": "18:00" },↵  "friday": { "isClosed": false, "openTime": "08:00", "closeTime": "22:00" },↵  "saturday": { "isClosed": false, "openTime": "09:00", "closeTime": "22:00" }↵}↵

```
## search venue 

```
http://localhost:5001/api/v1/venue/get-all-venues?location=Gulshan,%20Dhaka

```
---
