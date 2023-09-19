import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { dbService } from '../fBase';
import { DefalutBg } from './styled';
import Like from './Like';
const ProfileThink = ({ userInfo, thinkObj, displayDate, setUnderBar, darkMode }) => {
  const textEllipsis = thinkObj.text.split('\n');
  const thinkTextRef = doc(dbService, 'myThink', thinkObj.id);
  const [detail, setDetail] = useState('');
  const [textEdit, setTextEdit] = useState(false);
  const [newText, setNewText] = useState('');

  const onDeleteClick = async () => {
    const deleteOn = window.confirm('Think를 삭제하겠습니까?');
    if (deleteOn) {
      try {
        await deleteDoc(thinkTextRef);
      } catch (error) {
        window.alert('삭제를 실패했습니다.');
      }
      setUnderBar(true);
    }
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewText(value);
  };

  const onClick = (e) => {
    const {
      currentTarget: {
        dataset: { name },
      },
    } = e;
    if (name === 'detailOn') {
      setDetail('on');
      setUnderBar(false);
    } else if (name === 'detailOff') {
      setDetail('');
      setUnderBar(true);
      setTextEdit(false);
    } else if (name === 'editOnBtn') {
      setTextEdit(true);
    } else if (name === 'editOffBtn') {
      setTextEdit(false);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(thinkTextRef, { text: newText });
    setUnderBar(false);
  };

  const itemBox = () => {
    return (
      <>
        {!detail && (
          <>
            <span>{displayDate(thinkObj.createTime)}</span>
            <div className="profileLikeText">
              <Like userInfo={userInfo} thinkObj={thinkObj} darkMode={darkMode} />
            </div>
          </>
        )}
        {textEllipsis.map((item, index) => (
          <p key={index} className="thinkText">
            {item}
          </p>
        ))}
        {thinkObj.img && (
          <div className="profileItemImgBox">
            <img src={thinkObj.img} alt="" />
          </div>
        )}
      </>
    );
  };
  return (
    <>
      <div className={`profileItem ${detail}`} data-name="detailOn" onClick={onClick}>
        {textEdit ? (
          <>
            <form
              name="textForm"
              onSubmit={(e) => {
                setTextEdit(false);
                onSubmit(e, newText);
              }}
            >
              <textarea
                placeholder="Change your Mind!"
                value={newText}
                onChange={onChange}
                maxLength={200}
                required
              />
              <button type="submit">저장</button>
              <button type="button" data-name="editOffBtn" onClick={onClick}>
                취소
              </button>
            </form>
          </>
        ) : (
          itemBox()
        )}
        {detail && (
          <div className="profileBtns">
            {!textEdit && (
              <button type="button" data-name="editOnBtn" onClick={onClick}>
                수정
              </button>
            )}
            <button type="button" name="deleteBtn" onClick={onDeleteClick}>
              삭제
            </button>
          </div>
        )}
      </div>
      {detail && <DefalutBg $darkmode={darkMode} data-name="detailOff" onClick={onClick} />}
    </>
  );
};

export default ProfileThink;
