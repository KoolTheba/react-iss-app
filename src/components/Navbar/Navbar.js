import React from 'react'
import { Link } from 'react-router-dom'

// Icons
import HomeIcon from '@material-ui/icons/Home'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import GroupIcon from '@material-ui/icons/Group'
import ExploreIcon from '@material-ui/icons/Explore'

// Styles
import './Navbar.css'

const Navbar = () => {
    return (
        <>
            <nav role="navigation">
              <div id="menuToggle">
                <input type="checkbox" />
                        <span></span>
                        <span></span>
                        <span></span>
                    <ul id="menu">
                    <li>
                        <Link to="/" className="list-item"
                        ><HomeIcon/>
                        <p className="item-text">Home</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/currentlocation" className="list-item">
                        <PersonPinIcon/>
                        <p className="item-text">ISS current Location</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/people" className="list-item">
                        <GroupIcon/>
                        <p className="item-text">Space People</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/passtimes" className="list-item">
                        <ExploreIcon/>
                        <p className="item-text">Pass times</p>
                        </Link>
                    </li>
                    </ul>
              </div>
              <p className="navbar-title">International Space Station</p>   
            </nav>
        </>
    )
}

export default Navbar

