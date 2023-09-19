import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './routes/AppRouter';
import { useEffect, useState } from 'react';
import { authService } from './fBase';
import { onAuthStateChanged, updateCurrentUser, updateProfile } from 'firebase/auth';
import { DefalutBg, Loading, ModeBtn } from './components/styled';

function App() {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        if (user.displayName === null || user.displayName === '') {
          updateProfile(user, {
            displayName: user.email.split('@')[0],
          });
        }
        if (user.photoURL === null || user.photoURL === '') {
          updateProfile(user, {
            photoURL: 'img/nonUserProfile.png',
          });
        }
        setIsLoggedIn(true);
        setUserInfo(user);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(true);
    });
  }, []);
  const onClick = () => {
    setDarkMode((prev) => !prev);
  };
  const userInfoChange = async () => {
    await updateCurrentUser(authService, authService.currentUser);
    setUserInfo(authService.currentUser);
  };
  return (
    <>
      {loading ? (
        <>
          <AppRouter
            isLoggedIn={isLoggedIn}
            userInfo={userInfo}
            darkMode={darkMode}
            userInfoChange={userInfoChange}
          ></AppRouter>
          {/* {!isLoggedIn && ( */}
          <ModeBtn type="button" $darkmode={darkMode} onClick={onClick}>
            {darkMode ? 'Light' : 'Dark'}
          </ModeBtn>
          {/* )} */}
        </>
      ) : (
        <DefalutBg
          $darkmode={darkMode}
          style={{
            opacity: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loading $darkmode={darkMode}></Loading>
        </DefalutBg>
      )}
    </>
  );
}

export default App;

//해야 할 것
//home화면 긴 글 더보기
//profileItem 수정, 삭제
//게시글 위치
//좋아요누르기
