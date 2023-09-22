import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StorefrontSharpIcon from '@mui/icons-material/StorefrontSharp';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';


export default function Dashboard() {
  //--------------------Authorization token--------------------//
  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch("http://localhost:3333/authen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
        } else {
          alert('authen Failed')
          localStorage.removeItem('token');
          window.location = '/Login'
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [])

  //--------------------Fucntion Logout--------------------//
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location = '/Login'
  }

  //--------------Fucntion Open Dialog Content--------------//
  const [opennewshop, setNewshop] = React.useState(false);
  const handleClickNewshop = () => {
    setNewshop(true);
  };
  const handleCloseNewshop = () => {
    setNewshop(false);
  };

  //--------------------CREATE TODO LIST--------------------//
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    axios.post(`http://localhost:3333/todos`, JSON.stringify({
      title, description
    }), { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        window.location.href = "/Dashboard";
      })
      .catch(error => this.errors = error.response.data.errors);
  }

  //--------------------GET DATA LIST--------------------//
  const [data, setData] = useState([]);
  useEffect(() => {
    GetData()
  }, [])

  const GetData = () => {
    fetch("http://localhost:3333/todos")
      .then(res => res.json())
      .then(
        (result) => {
          setData(result)
        }
      )
  }

  const UpdateTodo = id => {
    window.location = '/update/' + id
  }

  //--------------------DELETE DATA LIST--------------------//
  const TodoDelete = id => {
    var data = {
      'id': id
    }
    fetch('http://localhost:3333/todos', {
      method: 'DELETE',
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
          title: <p>Want delete</p>,
          icon: "warning",
          didOpen: () => {
            MySwal.clickConfirm();
          },
        }).then(() => {
          return MySwal.fire({
            title: 'Want delete todo list?',
            icon: "warning",
            showCancelButton: true,
            showDenyButton: false,
            confirmButtonColor: '#E74C3C',
            confirmButtonText: 'Confirm',
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
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100vh', backgroundColor: "#fff" }}>
      <Box sx={{ display: "colume", justifyContent: "center" }}>
        <Typography sx={{ fontSize: 30, display: "flex", justifyContent: "center", }}>  Create for add new to do </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleClickNewshop}
            sx={{
              border: '1px solid #2c64ec',
              ':hover': { border: '1px solid #275AD6' },
              color: "#2c64ec",
              padding: "7px 20px",
              marginTop: "23px",
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
            <StorefrontSharpIcon sx={{ marginRight: '8px' }} />
            Create TO DO LIST
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Button sx={{ color: "#000", borderRadius: "30px" }} onClick={handleLogout}>ออกจากระบบ</Button>
        </Box>

        <Dialog open={opennewshop} onClose={handleCloseNewshop}>
          <DialogTitle sx={{ borderRadius: "500px", width: "500px" }}>Todo List</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseNewshop}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Divider />
          <DialogContent >
            <TextField
              sx={{ width: '100%', padding: '20px' }}
              id="outlined-textarea"
              placeholder="Title"
              required value={title} onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              sx={{ width: '100%', padding: '20px' }}
              id="outlined-textarea"
              placeholder="Description"
              required value={description} onChange={(e) => setDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button variant='outlined' sx={{
              width: '150px',
              height: 'fit-content',
              fontSize: '18px', color: '#2c64ec',
              border: '1px solid #2c64ec',
              ':hover': { border: '1px solid #275AD6' }
            }} /* component={NavLink} */ to='/'
              onClick={handleCloseNewshop}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "150px",
                height: "fit-content",
                fontSize: "18px",
                marginLeft: "20px",
                backgroundColor: "#2c64ec",
                ":hover": { backgroundColor: "#275AD6" },
              }}
              onClick={handleSubmit}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>

        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 950 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >

                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button onClick={() => UpdateTodo(row.id)}>Edit</Button>
                        <Button onClick={() => TodoDelete(row.id)}>Delete</Button>
                      </ButtonGroup>
                    </TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

      </Box>
    </Box>
  );
}