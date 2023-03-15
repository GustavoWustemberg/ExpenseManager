import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import api from "../../Service/index.js"

const theme = createTheme();

export default function CadastroUsuario() {
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(null);

  function validate() {
    let errors = {};
    const minuscula = /(?=.*[a-z])/;
    const maiuscula = /(?=.*[A-Z])/;
    const especial = /(?=.*[$*&@#])/;

    if (
      !userName ||
      !email ||
      !password
    ) {
      errors.input = toast.warn("Todos os campos devem ser preenchidos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      console.log(userName, email, password)
    }

    if (!errors.input) {
      if (
        email.length > 256 ||
        !email.includes("@") ||
        !email.includes(".") ||
        email.length <= 10
      ) {
        errors.email = toast.warn("Email inválido!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }

    if (!errors.input) {
      if (password.length < 8) {
        errors.password = toast.warn("Senha muito curta!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (!errors.password) {
        if (
          !minuscula.exec(password) &&
          !maiuscula.exec(password) &&
          !especial.exec(password)
        ) {
          errors.password = toast.warn(
            "A senha deve conter letra minúscula, maiúscula e caractere especial",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
      }
      if (!errors.password) {
        if (!minuscula.exec(password)) {
          errors.password = toast.warn(
            "A senha deve conter ao menos uma letra minúscula",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
      }
      if (!errors.password) {
        if (!maiuscula.exec(password)) {
          errors.password = toast.warn(
            "A senha deve conter ao menos uma letra maiúscula",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
      }
      if (!errors.password) {
        if (!especial.exec(password)) {
          errors.password = toast.warn(
            "A senha deve conter ao menos um caractere especial",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
      }
    }

    if (errors.input || errors.email || errors.password) {
      return false;
    }

    return true;
  }

  const validateEmail = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setLoading(<Spinner id="loading" animation="border" />);
        const data = {
          email,
        };
        console.log(email)
        await api.post("/validateEmail", data);

        createUser();
      } catch (err) {
        setLoading(null);
        setEmail(null);
        toast.error("Este email já está cadastrado!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  async function createUser() {
    try {
      const data = {
        userName,
        email,
        password,
      };

      await api.post("/user", data);

      toast.success(`${userName} você foi cadastrado com sucesso!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });


    } catch (err) {
      setLoading("");
      toast.error(`Houve um problema: ${err}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }


  return (
    <div className="hegth-
    ..">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <FaRegUserCircle />
            </Avatar>
            <Typography component="h1" variant="h5">
              Cadastre-se
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="userName"
                    required
                    fullWidth
                    id="userName"
                    label="Nome de usuário"
                    autoFocus
                    onChange={(e) => { setUserName(e.target.value) }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={validateEmail}
              >
                Cadastre-se
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link className='MuiTypography-root MuiTypography-body2 MuiLink-root MuiLink-underlineAlways css-101ca9i-MuiTypography-root-MuiLink-root' to="/login" variant="body2">
                    Já possui conta? Efeute o login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <div className="loading">{loading}</div>
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}