# Expense Tracker REST API

A Node.js and Express REST API that stores users, expenses, and income records in Firebase Cloud Firestore. Successful responses contain `success: true` and `data`; errors contain `success: false` and `error.message`.

## Requirements

- Node.js 18 or newer and npm
- A Firebase project with Cloud Firestore enabled
- A Firebase Admin SDK service account key for local development

## Run locally

1. Run `npm install`.
2. In Firebase Console, enable Cloud Firestore and generate an Admin SDK service account key under Project settings > Service accounts.
3. Save the downloaded JSON in the project root as `serviceAccountKey.json`. Never commit this private key. The local `.env` references the Firebase key supplied with this workspace; update `FIREBASE_SERVICE_ACCOUNT_PATH` if you use a different key filename.
4. Copy `.env.example` to `.env` for a fresh checkout. Set `FIREBASE_SERVICE_ACCOUNT_PATH` to your key path (default `./serviceAccountKey.json`). `PORT` defaults to `3000`.
5. Run `npm start`, or `npm run dev` during development.
6. Visit `http://localhost:3000/` for the API description.

For deployment, set configuration through the host's environment/secret manager and provision credentials securely. Do not upload the key file or `.env` to source control.

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/` | API description and endpoint list |
| GET | `/users` | List users |
| POST | `/users` | Create a user (`name`, `email` required) |
| PUT | `/users/:id` | Update supplied user fields |
| DELETE | `/users/:id` | Delete a user |
| GET | `/expenses` | List expenses |
| POST | `/expenses` | Create an expense (`title`, numeric `amount` required) |
| PUT | `/expenses/:id` | Update supplied expense fields |
| DELETE | `/expenses/:id` | Delete an expense |
| GET | `/income` | List income records |
| POST | `/income` | Create income (`source`, numeric `amount` required) |
| PUT | `/income/:id` | Update supplied income fields |
| DELETE | `/income/:id` | Delete income |

Send JSON request bodies with `Content-Type: application/json`. Example sample records:

```json
{ "name": "Alex Morgan", "email": "alex@example.com" }
```

```json
{ "title": "Groceries", "amount": 64.25, "category": "Food", "date": "2026-09-30" }
```

```json
{ "source": "Salary", "amount": 3200, "date": "2026-09-30" }
```

Firestore assigns each record an `id`; the API also stores `createdAt` and `updatedAt`. Updates are partial and return the updated record, including a refreshed `updatedAt` timestamp as a visible indication of an edit. Missing records return 404, invalid input returns 400, and unexpected database/server errors return a generic 500 response.

## Firestore data

The API uses top-level `users`, `expenses`, and `income` collections. Firestore creates them after the first record is added. Sample records above can be created with POST requests; the server does not insert records automatically.
