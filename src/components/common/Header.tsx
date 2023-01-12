import { Box, Typography } from "@mui/material"
import { useTheme } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getUser } from "../../hooks/store";
import Popover from "@mui/material/Popover/Popover";
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import logoutAction from "../../hooks/useLogout";

export const Header = () => {
  const theme = useTheme()
  const user = getUser()

  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false)
  };


  return (
    <Box
      height={'40px'}
      display={'flex'}
      flexDirection={'row-reverse'}
      alignItems={'center'}
      padding={'0 20px 0 20px'}
      sx={{ backgroundColor: theme.palette.primary.main }}
      gap={'12px'}
    >
      { user &&
        <>
          <IconButton onClick={handleClick}>
            <AccountCircleIcon sx={{ color: 'white' }} />
          </IconButton>
          <Typography 
            fontSize={'20px'}
            color={'white'}
          >
            {user.role}
          </Typography> 
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={logoutAction}>Wyloguj</MenuItem>
          </Popover>
        </> 
      }
    </Box>
  )
}