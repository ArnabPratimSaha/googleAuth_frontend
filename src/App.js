import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Auth from './pages/auth/auth';
import Profile from './pages/profile/profile';
import Protected from './pages/protected/protected';
import Error from './pages/Error/error';
import VarifyUser from './pages/varifyAuth/varifyUser';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}/>
        <Route path="/varify/:id/:at/:rt" element={<VarifyUser />}/>
        <Route element={<Protected />}>
          <Route path='profile' element={<Profile/>}/>
        </Route>
        <Route path='/error' element={<Error/>}/>
      </Routes>
  </BrowserRouter>
  );
}

export default App;
