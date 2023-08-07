import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const useNotifySuccess = () => toast.success('Email Cadastrado!!', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
})