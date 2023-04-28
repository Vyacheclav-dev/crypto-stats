import React, { FC, MouseEvent, useState } from 'react'
import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CurrencyExchange from '@mui/icons-material/CurrencyExchange'
import Home from '@mui/icons-material/Home'
import Timeline from '@mui/icons-material/Timeline'
import { NavLink } from 'react-router-dom'
import { Routes } from '../../router/routes'
import useMediaQuery from '@mui/material/useMediaQuery'
import { grey } from '@mui/material/colors'


type Link = {
  title: string
  icon?: JSX.Element,
  to: string
}

const links: Link[] = [
  { title: 'Home', icon: <Home sx={{ mr: 1 }} />, to: Routes.HOME },
  { title: 'OHLC Candlesticks', icon: <Timeline sx={{ mr: 1 }} />, to: Routes.OHLC_Candlesticks }
]

const Header: FC = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)')
  const [anchorElNav, setAnchorElNav] = useState<null | undefined | HTMLElement>(null)

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }


  return (
    <AppBar
      position={'static'}
      sx={{ width: { sx: '100%', md: 300 } }}
    >
      <Container
        maxWidth='xl'
        sx={{ height: 'fit-content', paddingLeft: { md: 0 } }}
      >
        <Toolbar disableGutters sx={{
          display: 'flex',
          flexDirection: { xs: 'row', md: 'column' }
        }}>
          <Box sx={{ display: 'flex', marginTop: { xs: 0, md: 5 } }}>
            <CurrencyExchange
              fontSize={'large'}
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />
            <Typography
              variant='h5'
              noWrap
              component='a'
              href='/'
              sx={{
                mr: 3,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              Cryptostats
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {
                links.map(({ title, to, icon }: Link) => (
                  <MenuItem
                    sx={{ color: 'black', padding: 0, minHeight: 'fit-content' }}
                    key={title}
                    onClick={handleCloseNavMenu}
                  >
                    <NavLink
                      to={to}
                      style={({ isActive }) => ({
                        color: isActive ? 'white' : grey[800],
                        backgroundColor: isActive ? 'secondary.light' : '',
                        width: '100%',
                        display: 'flex',
                        padding: '6px 16px'
                      })}
                    >
                      {icon!}
                      <Typography textAlign='center'>{title}</Typography>
                    </NavLink>
                  </MenuItem>
                ))
              }
            </Menu>
          </Box>
          <CurrencyExchange
            fontSize={'small'}
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: isSmallScreen ? 18 : 20
            }}
          >
            Cryptostats
          </Typography>

          <Box sx={{
            width: '100%',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            marginTop: 3
          }}>
            {
              links.map(({ title, to, icon }: Link) => (
                <Box
                  key={title}
                  onClick={handleCloseNavMenu}
                  sx={[
                    {
                      width: '90%',
                      mb: 1.5,
                      display: 'flex',
                      cursor: 'pointer'
                    },
                    {
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderBottomRightRadius: 20
                      }
                    }
                  ]}>
                  <NavLink
                    to={to}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? 'secondary.light' : '',
                      width: '100%',
                      display: 'flex',
                      padding: '4px 0 4px 24px',
                      borderBottomRightRadius: 20
                    })}
                  >
                    {icon!}
                    <Typography
                      sx={{
                        color: 'white',
                        display: 'block'
                      }}
                    >
                      {title}
                    </Typography>
                  </NavLink>
                </Box>
              ))
            }
          </Box>

          <Box sx={{ flexGrow: 0 }} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header