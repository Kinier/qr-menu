import { Grid, Paper, Avatar, Typography, Button, IconButton, TextField, Container } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

const styles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '16px',
    textAlign: 'center',
  },
  avatar: {
    width: '100px',
    height: '100px',
  },
  button: {
    margin: '8px',
  },
}
export default function ProfilePage() {

  return (
    <div style={styles.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={styles.paper}>
            <Avatar sx={styles.avatar} src="path/to/image" />
            <Typography variant="h5">John Doe</Typography>
            <Typography variant="subtitle1">Software Engineer</Typography>
            
            <Container sx={{ p: 2, m: 2 }}>
              <TextField
                label="Update password"
                type="password"
                name="confirmPassword"
              />
              
              <Button variant="contained" color="primary" sx={styles.button} >
                Change Password
              </Button>
              <br />
              <Button variant="text" color="primary" sx={styles.button}>
                Logout
              </Button>
            </Container>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}