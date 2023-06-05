import { Grid, Paper, Avatar, Typography, Button, IconButton, TextField, Container, Box } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import { useProfileQuery } from '../../store/apis/userApi';
import { useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { clearToken } from '../../store/features/usersSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const styles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '16px',
    textAlign: 'center',
  },
  button: {
    margin: '8px',
    size: 'large',
    width: '190px'
  },
  TextField: {
    margin: '8px'
  }
}
export default function ProfilePage() {
const dispatch = useDispatch()
const navigate = useNavigate()

  const { data, isSuccess } = useProfileQuery()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState<string>('')
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value)
  }

  useEffect(() => {
    isSuccess && setEmail(data.email)
  }, [isSuccess])

  const exitAccount = () => {
    dispatch(clearToken())
    navigate('/login')
  }
  return (
    <div style={styles.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={styles.paper}>
            {isSuccess &&
              <Container sx={{ p: 2, m: 2 }}>
                <Box>
                  <TextField
                    label="Update password"
                    type="password"
                    name="confirmPassword"
                  />

                  <Button variant="contained" color="primary" sx={styles.button} >
                    Change Password
                  </Button>
                </Box>
                <br />
                <Box>
                  <TextField
                    label="Update email"
                    type="email"
                    name="changeEmail"
                    value={email}
                    onChange={handleEmailChange}
                  />

                  <Button variant="contained" color="primary" sx={styles.button}>
                    Change Email
                  </Button>
                </Box>
                <br/>
                <Paper sx={{ width: 'min' }}>
                  <Button fullWidth variant="text" color="primary" sx={styles.button} onClick={() => exitAccount()}>
                    <LogoutIcon /> Logout
                  </Button>
                </Paper>

              </Container>}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}