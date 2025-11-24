
import Link from 'next/link'
import classes from './navbar.module.css'

import LogoImg from '@/assets/logo.png'
import Image from 'next/image'
import HeaderBackground from './headerbackground'
import Navlink from './navlink'

export default function Navbar() {
    
  return (
    <>
        <HeaderBackground />
        
        <header className={classes.header}>


            <Link className={classes.logo} href="/">
                <Image src={LogoImg} 
                    alt="A plate with food on it" 
                    priority
                />
                    NextLevel Food
            </Link>

            <nav className={classes.nav}>
                <ul>
                    <li>
                        <Navlink href="/meals">Browse Meals</Navlink>
                    </li>
                    <li>
                        <Navlink href="/community">Foodies Community</Navlink>
                    </li>
                </ul>
            </nav>
        </header>
    </>
  )
}
