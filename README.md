# React Redux Product Todo Admin

This project is a React + Redux assignment implementation with authentication, protected routes, a product table, and CRUD operations using DummyJSON APIs.

## Tech Stack

- React with Vite
- Redux Toolkit and React Redux
- React Router
- Axios
- Material UI
- React Hook Form and Yup
- React Toastify

## Features

- Login with DummyJSON auth API
- JWT token storage in `localStorage`
- Protected dashboard and products routes
- Product list table fetched through Redux async thunks
- Total records dashboard and product summary card
- Create, update, and delete product flows
- Form validation and user feedback with toast messages

## API Endpoints

- Login: `POST https://dummyjson.com/auth/login`
- Register: `POST https://dummyjson.com/users/add`
- Products: `GET https://dummyjson.com/products`
- Create product: `POST https://dummyjson.com/products/add`
- Update product: `PUT https://dummyjson.com/products/:id`
- Delete product: `DELETE https://dummyjson.com/products/:id`

DummyJSON simulates create, update, and delete requests. The app updates Redux state after successful responses so the UI reflects the CRUD operation.

## Demo Login

```txt
Username: emilys
Password: emilyspass
```

## Project Structure

```txt
src/
  api/
    axios.js
  app/
    store.js
  components/
    ProtectedRoute.jsx
  features/
    auth/
      authAPI.js
      authSelectors.js
      authSlice.js
    products/
      productsAPI.js
      productsSelectors.js
      productsSlice.js
  layout/
    AppLayout.jsx
  pages/
    Dashboard.jsx
    Login.jsx
    ProductForm.jsx
    ProductList.jsx
    Register.jsx
  routes/
    AppRoutes.jsx
  App.jsx
  main.jsx
```

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Implementation Notes

Redux Toolkit was used because it keeps reducers, actions, and async operations concise while following current Redux best practices. Authentication and products are separated into feature folders to keep API calls, slices, and selectors close to their domain logic.

Axios is configured once in `src/api/axios.js` with the DummyJSON base URL and an interceptor that attaches the saved token when available. Product operations use `createAsyncThunk` for loading, saving, and error states.

Material UI was used for a clean, professional interface with minimal custom CSS. React Hook Form and Yup keep validation logic declarative on the login, register, and product forms.

## Known Notes

DummyJSON does not permanently persist product create, update, or delete operations. The API returns simulated results, and the app applies those results to Redux state for a complete front-end CRUD experience.
