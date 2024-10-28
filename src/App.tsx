import { ToastContainer } from 'react-toastify'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <><ToastContainer autoClose={3000} />
    <RouterProvider router={router} />
    </>
  )
}

export default App
