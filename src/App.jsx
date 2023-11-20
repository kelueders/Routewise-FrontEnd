import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { SignUp } from './components/auth/SignUp'
import { Navbar } from './components/Navbar'
import { Landing } from './views/Landing'
import { Survey } from './views/Survey'
import { Dashboard } from './views/Dashboard'
import { Footer } from './components/Footer'
import { AddPlaces } from './views/AddPlaces'
import { Itinerary } from './views/Itinerary'
import { Test } from './views/Test'
import { OpenMap } from './components/OpenMap'
import { HeroCarousel } from './components/HeroCarousel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <Routes>
      <Route children path='/register' element={<SignUp />} />
      <Route children path='/' element={<Landing />} />
      <Route children path='/survey' element={<Survey />} />
      <Route children path='/dashboard' element={<Dashboard />} />
      <Route children path='/add-places' element={<AddPlaces />} />
      <Route children path='/itinerary' element={<Itinerary />} />
      <Route children path='/test' element={<Test />} />
      <Route children path='/map' element={<OpenMap />} />
      <Route children path='/hero' element={<HeroCarousel />} />
    </Routes>
      <h1 className='empty-3'></h1>
      {/* <h1 className='empty-6'></h1> */}
      <Footer />
    </>
  )
}

export default App
