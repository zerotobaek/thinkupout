import React, { useState } from 'react';
import MakeThink from '../components/MakeThink';
import Think from '../components/Think';
import { HomeContain } from '../components/styled';

const Home = ({ userInfo, darkMode, underBar, setUnderBar, thinks, displayDate }) => {
  const [making, setMaking] = useState('');
  const onMakeToggle = () => {
    {
      making == '' ? setMaking('on') : setMaking('');
    }
  };
  return (
    <>
      <HomeContain $darkmode={darkMode}>
        <h1>Logo</h1>
        <div className="thinkBox">
          {thinks.map((think) => (
            <Think
              key={think.id}
              userInfo={userInfo}
              thinkObj={think}
              isMaker={think.creatorId == userInfo.uid}
              darkMode={darkMode}
              setUnderBar={setUnderBar}
              displayDate={displayDate}
            />
          ))}
        </div>
      </HomeContain>
      <MakeThink
        userInfo={userInfo}
        making={making}
        setMaking={setMaking}
        onMakeToggle={onMakeToggle}
        underBar={underBar}
        darkMode={darkMode}
      />
    </>
  );
};

export default Home;
