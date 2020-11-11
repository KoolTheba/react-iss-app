import React from "react"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const Navbar = () => {

    return (
        <>
        <AppBar position="static">
            <Toolbar className="app-bar-menu">
                <IconButton edge="start" aria-label="menu">
                <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                International Space Station <span role='img' aria-label='emoji'>👩‍🚀</span>
                </Typography>
            </Toolbar>
        </AppBar>
        </>
    )
}

export default Navbar