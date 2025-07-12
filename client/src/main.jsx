import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Login from './components/LoginUI.jsx'
import Register from './components/SignupUI.jsx'
import TaskManagement from './components/TaskManagement.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoadingProvider } from './components/loading/loading.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[{
      path:"/login",
      element:<Login/>
    },
  {
    path:"/register",
    element:<Register />
  },{
    path:"/mydashboard",
    element:<TaskManagement/>
  }]
  }
]);

const queryClient=new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
    <RouterProvider router={router}/>
    </LoadingProvider>
    </QueryClientProvider>
  </StrictMode>,
)
