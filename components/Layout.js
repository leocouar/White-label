import { CartProvider } from '@/context/Store'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

function Layout({ children }) {
  
  return (
    <CartProvider>
      <div className='relative min-h-screen'>
      <div className='sticky top-0 z-40 shadow'>
        <Nav/>
      </div>

        <main className='bg-palette-bg sm:mb-48'>
          {children}
        </main>
        
        <Footer/>
        
        </div>
    </CartProvider>
  )
}

export default Layout
