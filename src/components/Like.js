import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { dbService } from '../fBase';

const Like = ({ userInfo, thinkObj, darkMode }) => {
    const [isLiked, setIsLiked] = useState(null);
    const [likeNum, setLikeNum] = useState(0);
    const [clickState, setClickState] = useState(false);
    const likeCollectionRef = collection(dbService, thinkObj.id);
    const likeDocRef = doc(dbService, thinkObj.id, userInfo.uid);
    const onLikeClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        let likeInfo;
        try {
            const docSnap = await getDoc(likeDocRef);
            if (docSnap.exists()) {
                if (thinkObj.id === likeCollectionRef.id) {
                    likeInfo = {
                        isLiked: !docSnap.data().isLiked,
                    };
                }
            } else {
                likeInfo = {
                    isLiked: true,
                };
            }
            await setDoc(likeDocRef, likeInfo);
            setClickState((prev) => !prev);
        } catch (error) {
            alert(error.message);
        }
    };

    const checkLiked = async () => {
        const docSnap = await getDoc(likeDocRef);
        try {
            if (docSnap.exists() && docSnap.data().isLiked) {
                return { background: "url('img/isLiked.png')" };
            } else {
                return {
                    background: darkMode ? "url('img/heart_dM.png" : "url('img/heart.png')",
                };
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const likeCount = async () => {
        const q = query(likeCollectionRef, where('isLiked', '==', true));
        const qSnap = await getDocs(q);
        return qSnap.size;
    };
    useEffect(() => {
        checkLiked().then((result) => setIsLiked(result));
        likeCount().then((result) => setLikeNum(result));
    }, [clickState]);
    return (
        <>
            <span className="heart" onClick={onLikeClick} style={isLiked}></span>
            {likeNum !== 0 ? (
                <span className="like">{likeNum}명이 좋아합니다</span>
            ) : (
                <span>좋아요</span>
            )}
        </>
    );
};

export default Like;
