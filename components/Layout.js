import { CartProvider } from '@/context/Store'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { NotificationContainer } from 'react-notifications'

function Layout({ children }) {
  
  return (
    <CartProvider>
      <div className='sticky top-0 z-40 shadow'>
        <Nav/>
      </div>

        <main className='bg-palette-bg'>
          <NotificationContainer />
          {children}
        </main>

        <Footer />
    </CartProvider>
  )
}

export default Layout
