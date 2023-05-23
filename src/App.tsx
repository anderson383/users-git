import Header from './components/features/header/header';
import { BrowserRouter } from 'react-router-dom';
import { RouterPage } from './pages/router-page';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <RouterPage />
      <ToastContainer
        theme="colored"
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </BrowserRouter>
  );
}

export default App;
