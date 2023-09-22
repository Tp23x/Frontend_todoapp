
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

export default function Updatetodo() {

    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:3333/todos/" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setTitle(result[0].title)
                    setDescription(result[0].description)
                }
            )
    }, [id])

    //--------------------UPDATE TODO LIST--------------------//
    const handleSubmit = event => {
        event.preventDefault();
        var data = {
            'id': id,
            'title': title,
            'description': description
        }
        fetch('http://localhost:3333/todos', {
            method: 'PUT',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.data)
            .then((data) => {
                const MySwal = withReactContent(Swal)
                MySwal.fire({
                    title: <p>Update todo list</p>,
                    icon: "success",
                    didOpen: () => {
                        MySwal.clickConfirm();
                    },
                }).then(() => {
                    return MySwal.fire({
                        title: 'Update todo list successfully',
                        text: "successfully",
                        icon: "success",
                        confirmButtonColor: '#0f962d',
                        confirmButtonText: 'OK',
                    }
                    ).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/Dashboard";
                        }
                    });
                });
            });
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', backgroundColor: "#fff" }}>
            <Container sx={{ p: 6, borderRadius: 10, backgroundColor: "#D6EAF8" }} maxWidth="sm">
                <div>
                    <Typography component="h1" variant="h5">
                        Update Todo
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container sx={{ pt: 2 }} spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="title"
                                    name="title"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="descripton"
                                    label="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="outlined" 
                                    color="error"
                                    onClick={() => navigate("/Dashboard")}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </Box>
    );
}