import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { dbService } from '../fBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { DefalutBg, Loading } from './styled';
import Like from './Like';

const Think = ({ thinkObj, isMaker, darkMode, setUnderBar, displayDate, userInfo }) => {
  const [editing, setEditing] = useState(false);
  const [editDelete, setEditDelete] = useState(false);
  const [newThink, setNewThink] = useState(thinkObj.text);
  const [imgDetail, setImgDetail] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const thinkTextRef = doc(dbService, 'myThink', thinkObj.id);
  const textEllipsis = thinkObj.text.split('\n');

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
    setNewThink(value);
  };

  const onClick = (e) => {
    const {
      currentTarget: {
        dataset: { name },
      },
    } = e;
    if (name === 'editBg') {
      setEditDelete(false);
      setUnderBar(true);
      setImgDetail('');
    } else if (name === 'menuBtn') {
      setEditDelete(true);
      setUnderBar(false);
    } else if (name === 'editBtn' || name === 'editCancleBtn') {
      setEditing((prev) => !prev);
      setEditDelete(false);
      if (name === 'editCancleBtn') {
        setUnderBar(true);
      }
    } else if (name == 'imgBox') {
      setImgDetail('on');
      setUnderBar(false);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    await updateDoc(thinkTextRef, {
      text: newThink,
    });
    setEditing(false);
    setEditDelete(false);
    setUnderBar(true);
    setEditLoading(false);
  };
  const homeItems = () => {
    return (
      <>
        {textEllipsis.map((item, index) => (
          <p key={index} className="thinkText">
            {item}
          </p>
        ))}
        {thinkObj.img && (
          <div className={`thinkImgBox ${imgDetail}`} data-name="imgBox" onClick={onClick}>
            <img src={thinkObj.img} alt="" />
          </div>
        )}
      </>
    );
  };
  return (
    <>
      <div className="thinkItem">
        <div className="creatorImg">
          <img src={thinkObj.creatorImg} />
        </div>
        <p className="creator">{thinkObj.creatorName}</p>
        {editing ? (
          <>
            <form onSubmit={onSubmit} className="changeThink">
              <textarea
                placeholder="Change your Mind!"
                value={newThink}
                required
                onChange={onChange}
                maxLength={200}
              />
              <button type="button" data-name="editCancleBtn" onClick={onClick}>
                Cancle
              </button>
              {!editLoading ? (
                <button type="submit">Update</button>
              ) : (
                <Loading className="thinkLoading" $darkmode={darkMode} />
              )}
            </form>
            <DefalutBg $darkmode={darkMode} />
          </>
        ) : (
          <>
            <div className="thinkContent">{homeItems()}</div>
            <div className="commuicate">
              <Like userInfo={userInfo} thinkObj={thinkObj} darkMode={darkMode} />
              <span className="time">{displayDate(thinkObj.createTime)}</span>
            </div>
          </>
        )}
        {isMaker && (
          <div className="editDelete">
            <span data-name="menuBtn" onClick={onClick}>
              <FontAwesomeIcon icon={faEllipsis} />
            </span>
            {editDelete && (
              <div className="editDeleteMenu">
                <button type="button" data-name="editBtn" onClick={onClick}>
                  수정
                </button>
                <button type="button" onClick={onDeleteClick}>
                  삭제
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {((editDelete && isMaker) || imgDetail == 'on') && (
        <DefalutBg data-name="editBg" onClick={onClick} $darkmode={darkMode}></DefalutBg>
      )}
    </>
  );
};

export default Think;
