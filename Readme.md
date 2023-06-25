# API Documentation

## Base URL
 - http://localhost:3000


## Authentication

To access the API endpoints, you need to include a valid API key in the request headers. The API key should be provided as follows:

x-api-key: foo


If an invalid or missing API key is provided, you will receive a 401 Unauthorized error.

---

## `POST /keys/:address`

Adds new keys to the specified address.

### Request

- Method: `POST`
- Path: `/keys/:address`
- Headers:
  - `x-api-key: foo` (valid API key)
- Parameters:
  - `:address` (string): The address to add keys to.
- Body:
  - `keys` (array of strings): The keys to be added.

### Response

- Status: `200 OK`
- Body:
  - `message` (string): Keys added successfully.

---

## `GET /keys/:address`

Retrieves filtered and paginated keys for the specified address.

### Request

- Method: `GET`
- Path: `/keys/:address`
- Headers:
  - `x-api-key: foo` (valid API key)
- Parameters:
  - `:address` (string): The address to retrieve keys from.
- Query Parameters:
  - `page` (optional, number): The page number for pagination (default: 1).
  - `pageSize` (optional, number): The number of keys per page (default: 10).

### Response

- Status: `200 OK`
- Body:
  - `keys` (array of strings): Filtered and paginated keys for the specified address.

---

## `PUT /keys/:address/:key`

Marks a key as invalid for the specified address.

### Request

- Method: `PUT`
- Path: `/keys/:address/:key`
- Headers:
  - `x-api-key: foo` (valid API key)
- Parameters:
  - `:address` (string): The address to update the key for.
  - `:key` (string): The key to mark as invalid.

### Response

- Status: `200 OK`
- Body:
  - `message` (string): The key has been marked as invalid.

---

## Error Responses

- Status: `401 Unauthorized`
  - Body:
    - `error` (string): Invalid API key.

- Status: `404 Not Found`
  - Body:
    - `error` (string): Address not found (for GET and PUT operations).
    - `error` (string): Key not found (for PUT operation).

Please make sure to include the required headers, request parameters, and body as specified in the documentation for successful API interaction.
