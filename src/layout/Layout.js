import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
const Layout = ({children}) => {
  return (
   <div className='bg-white' >
        <Header/>
        {children}
        <Footer/>
    </div>
  )
}

export default Layout