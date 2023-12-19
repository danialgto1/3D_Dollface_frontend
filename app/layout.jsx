import './globals.css'
import { Rubik  } from 'next/font/google'
import NavBar from './components/Navbar'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        
        <div className="main">
          <div className="gradient" />
        </div>
        <NavBar className="z-50" />
        
        {children}
        </body>
    </html>
  )
}
