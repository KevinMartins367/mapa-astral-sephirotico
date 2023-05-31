import routes from './routes';
import { useRoutes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const content = useRoutes(routes);
  return content;
};
export default App;