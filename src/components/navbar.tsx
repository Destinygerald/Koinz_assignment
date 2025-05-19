import '../styles/components.css'
import logo from "../assets/koin-icon.png"

export function Navbar () {

    return (
        <div className='navbar'>
            <img src={logo} alt='Koinx-logo' className='navbar-logo' />
        </div>
    )
}