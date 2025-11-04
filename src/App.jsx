import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Marriage from './components/Marriage'
import Courier from './components/Courier'


const App = () => {
  return (
   <>
   <BrowserRouter>
   <Routes >
    <Route path='/' element={<Home/>} />
    <Route path='/marriage' element={<Marriage/>} />
    <Route path='/courier' element={<Courier/>} />
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App