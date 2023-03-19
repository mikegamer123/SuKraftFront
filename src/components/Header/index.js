import Link from 'next/link';
import React from 'react';
import { Cookie } from 'next/font/google';
import { useRouter } from 'next/router';


export default function Header () {
const router = useRouter();
    const [searchProducts, setSearchProducts] = React.useState()
    function handleSearch(event){
        const {value, name} = event.target
        console.log(value)
    }
  
    const [loggedUser, setLoggedUser] = React.useState(undefined)

    React.useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("user")))
        
    }, []);

console.log(loggedUser)
    return(
        

        <header>
            <div className="container">
                <div className="header-top">
                    <Link href={"/"}><img className='logo-img' src="images/logo.png" alt="" /></Link>
                    <div className='search-container'>
                        <input className='search-bar' type="text" onChange={(event) => handleSearch(event)}/>
                        {
                            <div>
                                <div className="search-product-card hidden">
                                    <img style={{maxWidth: '100px'}} src="https://plus.unsplash.com/premium_photo-1675896042153-9dc08f9c9599?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=935&q=80" alt="" />
                                    <div>
                                        <p>Krema za ruke</p>
                                        <p>1000</p>
                                    </div>
                                </div>

                            </div>
                        }
                    </div>
                    <div className='login-container'>
                    {
                        loggedUser == undefined 
                        ?
                            <Link href={'/'}><p>Prijavi se</p></Link>
                        : <Link href={'/profile'}><p>Profil</p></Link>
                    

                    }
                    </div>
                    
                    <div className='cart-container'>
                        
                        <Link href={'/logout'}>Logout</Link>
                    </div>
                </div>

                <div className="header-bottom">
                    <nav>
                        <ul>
                            {/*<li className='navbar-item'><Link href="/category">Kategorije</Link></li>*/}
                            <li className='navbar-item'><Link href="/Kraftovi">Kraftovi</Link></li>
                            <li className='navbar-item'><Link href="/Krafteri">Krafteri</Link></li>
                            <li className='navbar-item'><Link href="/seller-dashboard">Uredi Proizvode</Link></li>

                        </ul>
                    </nav>
                </div>
            </div>

        </header>

    )
}