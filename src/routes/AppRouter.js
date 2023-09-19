import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Home from './Home';
import Profile from './Profile';
import Auth from './Auth';
import Nav from '../components/Nav';
import { dbService } from '../fBase';

const AppRouter = ({ isLoggedIn, darkMode, userInfo, userInfoChange }) => {
  const [underBar, setUnderBar] = useState(true);
  const [thinks, setThinks] = useState([]);

  useEffect(() => {
    const docRef = query(collection(dbService, 'myThink'), orderBy('createTime', 'desc'));
    onSnapshot(docRef, (snapshot) => {
      const thinkArr = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setThinks(thinkArr);
    });
  }, []);

  const displayDate = (objTime) => {
    const nowDate = Date.now();
    const timeDifference = nowDate - objTime;
    const agoStandard = timeDifference / (1000 * 60 * 60);
    const agoMins = Math.floor(timeDifference / (1000 * 60));
    const agoTimes = Math.floor(timeDifference / (1000 * 60 * 60));
    const agoDays = Math.floor(agoTimes / 24);
    if (agoStandard < 1 / 60) {
      return '방금 전';
    } else if (agoStandard < 1) {
      return `${agoMins}분 전`;
    } else if (agoStandard < 24) {
      return `${agoTimes}시간 전`;
    } else if (agoStandard >= 24) {
      return `${agoDays}일 전`;
    }
  };
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {isLoggedIn && <Nav darkMode={darkMode} underBar={underBar} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              exact
              path="/"
              element={
                <Home
                  userInfo={userInfo}
                  darkMode={darkMode}
                  underBar={underBar}
                  setUnderBar={setUnderBar}
                  thinks={thinks}
                  displayDate={displayDate}
                />
              }
            />
            <Route
              exact
              path="/profile"
              element={
                <Profile
                  userInfo={userInfo}
                  darkMode={darkMode}
                  thinks={thinks}
                  setUnderBar={setUnderBar}
                  displayDate={displayDate}
                  userInfoChange={userInfoChange}
                />
              }
            />
          </>
        ) : (
          <Route exact path="/" element={<Auth darkMode={darkMode} />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
