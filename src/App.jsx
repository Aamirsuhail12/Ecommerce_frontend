
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import SignupPage from './pages/SignupPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';

const router = createBrowserRouter(
  [
    {
      path:'/',
      element:<Home></Home>
    },
    {
      path:'/Signup',
      element:<SignupPage></SignupPage>
    },
    {
      path:'/Login',
      element:<LoginPage></LoginPage>
    },
    {
      path:'/Cart',
      element:<CartPage></CartPage>
    }
  ]
)

function App() {
  return (
    <RouterProvider router={router}>
    <div className="App">
      <SignupPage></SignupPage>
    </div>
    </RouterProvider>
  );
}

export default App;