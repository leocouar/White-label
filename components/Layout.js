import { CartProvider } from '@/context/Store'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

function Layout({ children }) {
  
  return (
    <CartProvider>
      <div className='relative'>
      <div className='sticky top-0 z-40 shadow'>
        <Nav/>
      </div>

        <main className='bg-palette-bg'>
          {children}
        </main>
        <div className='min-h-screen'>
        <Footer/>
        </div>
        </div>
    </CartProvider>
  )
}

export default Layout
