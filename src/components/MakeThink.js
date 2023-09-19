import React, { useRef, useState } from 'react';
import { dbService, storageService } from '../fBase';
import { addDoc, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { MakeContent, MakeToggleBtn, DefalutBg, Loading } from './styled';

const MakeThink = ({ userInfo, making, setMaking, onMakeToggle, darkMode, underBar }) => {
  const [think, setThink] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [makeLoading, setMakeLoading] = useState(false);
  const fileInputRef = useRef();
  const thinkInputRef = useRef();
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setThink(value);
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const myFile = files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(myFile);
    fileReader.onloadend = (loadend) => {
      const {
        currentTarget: { result },
      } = loadend;
      setImgUrl(result);
    };
  };
  const onClearImg = () => {
    setImgUrl('');
    fileInputRef.current.value = null;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let getImgUrl = '';
    if (think) {
      setMakeLoading(true);
      if (imgUrl != '') {
        const fileRef = ref(storageService, `${userInfo.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, imgUrl, 'data_url');
        getImgUrl = await getDownloadURL(response.ref);
      }
      const postThink = {
        text: think,
        createTime: Date.now(),
        creatorId: userInfo.uid,
        creatorName: userInfo.displayName,
        creatorImg: userInfo.photoURL,
        img: getImgUrl,
      };
      await addDoc(collection(dbService, 'myThink'), postThink);
      setThink('');
      setImgUrl('');
      setMaking('');
      fileInputRef.current.value = null;
      setMakeLoading(false);
    } else {
      thinkInputRef.current.focus();
    }
  };
  return (
    <>
      <MakeContent onSubmit={onSubmit} className={`${making}`} $darkmode={darkMode}>
        <h4>New Think</h4>
        <p>{userInfo.displayName}</p>
        <textarea
          placeholder="What do you Think About?"
          maxLength={200}
          value={think}
          onChange={onChange}
          ref={thinkInputRef}
        />
        {imgUrl && (
          <>
            <div className="MakeThinkImgBox">
              <img src={imgUrl} />
              <button type="button" onClick={onClearImg}>
                X
              </button>
            </div>
          </>
        )}
        <input type="file" accept="image/*" onChange={onFileChange} ref={fileInputRef} />
        {!makeLoading ? (
          <button
            type="submit"
            style={{
              color: think ? (darkMode ? '#fff' : '#333') : darkMode ? '#7f7f7f' : '#bbb',
            }}
          >
            Think Up
          </button>
        ) : (
          <Loading className="thinkLoading" $darkmode={darkMode} />
        )}
      </MakeContent>
      <MakeToggleBtn
        type="button"
        onClick={onMakeToggle}
        $darkmode={darkMode}
        $making={making}
        $underbar={underBar}
      ></MakeToggleBtn>
      {making === 'on' && <DefalutBg $darkmode={darkMode} name="make_toggle_bg" />}
    </>
  );
};

export default MakeThink;
