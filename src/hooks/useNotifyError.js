import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const useNotifyError = () => toast.error('Email já cadastrado', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
})