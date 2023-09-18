import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, dbService, storageService } from '../fBase';
import { Loading, LogOutBtn, ProfileBg } from '../components/styled';
import ProfileThink from '../components/ProfileThink';
import { updateProfile } from 'firebase/auth';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const Profile = ({ userInfo, darkMode, thinks, displayDate, setUnderBar, userInfoChange }) => {
    const navigate = useNavigate();
    const fileInputRef = useRef();
    const [nameEdit, setNameEdit] = useState(false);
    const [changeDisplayName, setChangeDisplayName] = useState('');
    const [changeDisplayImg, setChangeDisplayImg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onLogOut = () => {
        authService.signOut();
        navigate('/', { replace: true });
    };
    const myThink = thinks.filter((item) => {
        return item.creatorId == userInfo.uid;
    });
    const onClick = (e) => {
        const {
            target: { name },
        } = e;
        if (name === 'editNameBtn') {
            setNameEdit(true);
            setUnderBar(false);
        } else if (name === 'imgChangeCancleBtn') {
            setUnderBar(true);
            setChangeDisplayImg('');
            fileInputRef.current.value = null;
        } else if (name === 'nameChangeCancleBtn') {
            setUnderBar(true);
            setNameEdit(false);
            setChangeDisplayName('');
        }
    };
    const onChange = async (e) => {
        let getImgUrl;
        const {
            target: { name, value, files },
        } = e;
        if (name === 'displayName') {
            setChangeDisplayName(value);
        } else if (name === 'displayImg') {
            setUnderBar(false);
            const myFile = files[0];
            const fileReader = new FileReader();
            fileReader.readAsDataURL(myFile);
            fileReader.onloadend = (loadend) => {
                const {
                    currentTarget: { result },
                } = loadend;
                console.log(result);
                setChangeDisplayImg(result);
            };
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        let getImgUrl;
        const {
            target: { name },
        } = e;
        const q = query(collection(dbService, 'myThink'), where('creatorId', '==', userInfo.uid));
        try {
            setIsLoading(true);
            const qSnapshot = await getDocs(q);
            if (userInfo.displayName !== changeDisplayName) {
                if (name === 'nameForm') {
                    await updateProfile(authService.currentUser, {
                        displayName: changeDisplayName,
                    });
                    qSnapshot.forEach((doc) => {
                        updateDoc(doc.ref, { creatorName: changeDisplayName });
                    });
                    console.log(userInfo);
                }
            }
            if (name === 'imgForm') {
                const fileRef = ref(storageService, `${userInfo.uid}'Img/${uuidv4()}`);
                const response = await uploadString(fileRef, changeDisplayImg, 'data_url');
                getImgUrl = await getDownloadURL(response.ref);
                await updateProfile(authService.currentUser, {
                    photoURL: getImgUrl,
                });
                qSnapshot.forEach((doc) => {
                    updateDoc(doc.ref, { creatorImg: getImgUrl });
                });
                setChangeDisplayImg('');
                fileInputRef.current.value = null;
            }
            setIsLoading(false);
            setUnderBar(true);
        } catch (error) {
            console.log(error);
        }
        userInfoChange();
        setNameEdit(false);
        console.log(userInfo.uid);
    };

    return (
        <>
            <ProfileBg $darkmode={darkMode}>
                <div className="profileContain">
                    <div className="profileInnerBox">
                        <div className="profileImg">
                            <img
                                src={changeDisplayImg !== '' ? changeDisplayImg : userInfo.photoURL}
                            />
                            <form name="imgForm" onSubmit={onSubmit}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="displayImg"
                                    ref={fileInputRef}
                                    onChange={onChange}
                                />
                                {changeDisplayImg !== '' && (
                                    <div className="imgChangeBtns">
                                        {changeDisplayImg !== '' && !isLoading ? (
                                            <>
                                                <button type="submit">저장</button>
                                                <button
                                                    type="button"
                                                    name="imgChangeCancleBtn"
                                                    onClick={onClick}
                                                >
                                                    취소
                                                </button>
                                            </>
                                        ) : (
                                            <Loading $darkmode={darkMode} />
                                        )}
                                    </div>
                                )}
                            </form>
                        </div>
                        <div className="profileName">
                            <p>{userInfo.displayName}</p>
                            {nameEdit ? (
                                <>
                                    <form name="nameForm" onSubmit={onSubmit}>
                                        <input
                                            type="text"
                                            name="displayName"
                                            placeholder="what's your name?"
                                            onChange={onChange}
                                            maxLength="8"
                                            required
                                        />
                                        <div className="nameChangeBtns">
                                            {nameEdit && !isLoading ? (
                                                <>
                                                    <button type="submit">저장</button>
                                                    <button
                                                        type="button"
                                                        name="nameChangeCancleBtn"
                                                        onClick={onClick}
                                                    >
                                                        취소
                                                    </button>
                                                </>
                                            ) : (
                                                <Loading $darkmode={darkMode} />
                                            )}
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <button type="button" name="editNameBtn" onClick={onClick}>
                                    이름 수정
                                </button>
                            )}
                        </div>
                    </div>
                    <p>게시글 {myThink.length}</p>
                    <div className="profileItemBox">
                        {myThink.length == 0 ? (
                            <p className="noText">작성 된 글이 없습니다</p>
                        ) : (
                            myThink.map((think) => (
                                <ProfileThink
                                    key={think.id}
                                    thinkObj={think}
                                    displayDate={displayDate}
                                    setUnderBar={setUnderBar}
                                    darkMode={darkMode}
                                    userInfo={userInfo}
                                />
                            ))
                        )}
                    </div>
                </div>
            </ProfileBg>
            <LogOutBtn type="button" className="logOutBtn" $darkmode={darkMode} onClick={onLogOut}>
                로그아웃
            </LogOutBtn>
        </>
    );
};

export default Profile;
