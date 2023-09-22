import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Swal from 'sweetalert2'

export default function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        const jsonData = {
            email: data.get('email'),
            password: data.get('password'),
        }

        fetch("http://localhost:3333/login", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    localStorage.setItem('token', data.token)
                    window.location = '/Dashboard'
                    //alert('Login Success')
                } else {
                    //alert('Login Failed')
                    Swal.fire(
                        {
                            title: `${data.massage}`,
                            confirmButtonColor: '#17314b',
                            color: '#C74039',
                            confirmButtonText: 'ตกลง',

                        }
                    )
                }
            })
            .catch((error) => {
            console.error("Error:", error);
        });
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', backgroundColor: "#f4f6fc" }}>

            <Container component="main" maxWidth="sm" sx={{ display: 'flex', justifyContent: "center" }}>
                <Box
                    sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        px: 4,
                        py: 6,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "#fff"
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                        
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}