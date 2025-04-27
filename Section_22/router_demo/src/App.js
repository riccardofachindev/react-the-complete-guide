import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetailsPage from './pages/ProductDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:productId', element: <ProductDetailsPage /> }
    ]
  },
])

/* const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path='/' element={<HomePage></HomePage>} />
    <Route path='/products' element={<ProductsPage></ProductsPage>} />
  </Route>
)

const router = createBrowserRouter(routeDefinitions); */

function App() {
  return <RouterProvider router={router} />;
}

export default App;
