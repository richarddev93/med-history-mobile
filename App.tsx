import { setupHttpInterceptors } from '@/lib/http.interceptors';
import './global.css';
import Root from '@/app/Main';
setupHttpInterceptors() 
export default function App() {
  return (
    <Root/>
  );
}
