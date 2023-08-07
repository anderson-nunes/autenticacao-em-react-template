
import Router from "./routes/Router";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <div>
      <ChakraProvider>
        <Router />
        <ToastContainer />
      </ChakraProvider>
    </div >
  );
}

export default App;
