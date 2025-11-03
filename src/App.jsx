import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Marriage from './components/Marriage'


const App = () => {
  return (
   <>
   <BrowserRouter>
   <Routes >
    <Route path='/' element={<Home/>} />
    <Route path='/marriage' element={<Marriage/>} />
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App