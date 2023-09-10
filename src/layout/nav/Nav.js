import './Nav.css';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="navigation">
            <NavLink 
                to='/'
                className={({ isActive, isPending }) =>
                    isPending ? 'pending' : isActive ? 'active' : ''
                }
            >
                <p>Overview</p>
            </NavLink>
            <NavLink 
                to='/books'
                className={({ isActive, isPending }) =>
                    isPending ? 'pending' : isActive ? 'active' : ''
                }
            >
                <p>Books</p>
            </NavLink>
            <NavLink 
                to='/members'
                className={({ isActive, isPending }) =>
                    isPending ? 'pending' : isActive ? 'active' : ''
                }
            >
                <p>Members</p>
            </NavLink>
        </nav>
    )
}

export default Nav;