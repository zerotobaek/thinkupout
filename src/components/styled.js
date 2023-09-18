import { styled } from 'styled-components';

const primaryWhite = '#f9f9f9';
const primaryBlack = '#151515';

const ModeColor = ($darkmode, darkBg, lightBg, darkC, lightC) => `
    background-color: ${$darkmode ? darkBg : lightBg};
    color: ${$darkmode ? darkC : lightC};
`;
const opacityOn = (sec, del) => `opacityOn ${sec}s ${del}s both`;

const Title = ($darkmode, del) => `
    display: grid;
    place-content: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 2rem;
    font-weight: 500;
    color: ${$darkmode ? primaryWhite : primaryBlack};
    user-select: none;
    margin-bottom: 40px;
    animation: ${opacityOn(0.4, del)}
    
`;
const defaultBgStyle = ($darkmode) => `
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    background: ${$darkmode ? primaryBlack : primaryWhite};
    opacity: 0.9; 
`;

const basicBtn = ($darkmode) => `
    ${ModeColor($darkmode, '#333', '#eee', primaryWhite, primaryBlack)};
    `;

const btnUrl = ($darkmode, dM, lM) => `
    background: url("img/${$darkmode ? dM : lM}.png") no-repeat center center transparent
`;

const profileEditBtn = ($darkmode) => `
    padding: 7px 13px;
    border-radius: 10px;
    color: ${$darkmode ? primaryWhite : primaryBlack};
    background: ${$darkmode ? '#333' : '#eee'};
    box-shadow: 1px 1px 2px 0 ${$darkmode ? '#000' : '#ccc'};;
    font-size : 0.9rem;
    `;

export const SignIn = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: grid;
  place-content: center;
  background: ${(props) => (props.$darkmode ? primaryBlack : primaryWhite)};
  > .signInBox {
    width: auto;
    height: auto;
    position: relative;
    > h1 {
      ${(props) => Title(props.$darkmode, 0)}
    }
    > .createTitle {
      ${(props) => Title(props.$darkmode, 0)}
    }
    > form {
      width: 90vw;
      max-width: 353px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      row-gap: 35px;
      > input {
        width: 100%;
        padding: 10px 20px;
        background: ${(props) => (props.$darkmode ? primaryBlack : primaryWhite)};
        color: ${(props) => (props.$darkmode ? primaryWhite : primaryBlack)};
        box-shadow: 2px 2px 2px 0 ${(props) => (props.$darkmode ? '#000' : '#999')} inset,
          -1px -1px 2px 0 ${(props) => (props.$darkmode ? '#000' : '#999')} inset;
        border-radius: 20px;
        font-size: 1rem;
        animation: ${opacityOn(0.4, 0.4)};
      }
      > button {
        width: 100%;
        padding: 10px;
        border-radius: 20px;
        font-size: 1rem;
        ${(props) => ModeColor(props.$darkmode, '#1f1f1f', '#fbfbfb', primaryWhite, primaryBlack)};
        box-shadow: 2px 2px 2px 0 ${(props) => (props.$darkmode ? '#000' : '#999')};
        animation: ${opacityOn(0.4, 0.4)};
      }
      > button:nth-of-type(2) {
        width: ${(props) => (props.newUser ? '100%' : '48%')};
        ${(props) => ModeColor(props.$darkmode, '#fbfbfb', '#555', primaryBlack, primaryWhite)};
        box-shadow: ${(props) => (props.$darkmode ? '5px 5px 5px 0 #111' : '3px 3px 4px 0 #111')};
        transition: width 0.4s;
      }
      > button:nth-of-type(3) {
        position: absolute;
        bottom: 0;
        right: 0;
        animation: ${opacityOn(0.4, 0.4)};
        width: 48%;
      }
    }
    > .socialBtns {
      display: inline-flex;
      justify-content: space-around;
      gap: 20px;
      padding: 10px 0;
      border-radius: 20px;
      overflow: hidden;
      animation: SocialwidthOn 0.4s both;
      position: absolute;
      left: 0;
      bottom: -100px;
      > .socialBtn {
        padding-top: 42px;
        color: ${(props) => (props.$darkmode ? '#fff' : primaryBlack)};
        background: url('img/google.png') no-repeat center top;
      }
      > .socialBtn:nth-of-type(2) {
        background-image: url('img/facebook.png');
      }
      > .socialBtn:nth-of-type(3) {
        background-image: ${(props) =>
          props.$darkmode ? "url('img/github_light.png')" : "url('img/github.png')"};
      }
    }
  }
`;

export const HomeContain = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  padding: 60px 0 53px;
  box-sizing: border-box;
  overflow: hidden;
  color: ${(props) => (props.$darkmode ? primaryWhite : primaryBlack)};
  background: ${(props) => (props.$darkmode ? primaryBlack : primaryWhite)};
  & h1 {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 50%;
    top: 10px;
    z-index: 999;
    transform: translateX(-50%);
    text-indent: -999em;
    background: ${(props) => (props.$darkmode ? 'url("img/logo_dM.png")' : 'url("img/logo.png")')};
  }
  & h1::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 3px;
    background: ${(props) => (props.$darkmode ? primaryWhite : primaryBlack)};
    border-radius: 50%;
    left: 50%;
    top: 40px;
    transform: translateX(-50%);
    animation: logoUnderbarOn 0.4s both;
  }
  > .thinkBox {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    background: ${(props) => (props.$darkmode ? primaryBlack : primaryWhite)};
    overflow: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    > .thinkItem {
      width: 100%;
      height: auto;
      position: relative;
      padding: 10px 0 20px;
      margin-bottom: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid ${(props) => (props.$darkmode ? '#333' : '#ddd')};
      &:last-of-type {
        margin-bottom: 0;
        border: none;
      }
      > .creatorImg {
        > img {
          width: 26px;
          height: 26px;
          object-fit: cover;
          border-radius: 50%;
          position: absolute;
          left: 0;
          top: 10px;
          box-shadow: 0 0 3px 0 #aaa;
        }
      }
      > .creator {
        /* width: 100px; */
        box-sizing: border-box;
        padding: 0 0 10px 35px;
        margin-bottom: 10px;
        border-radius: 0 0 10px 0;
        font-weight: bold;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        gap: 10px;
        position: relative;
      }
      > .thinkContent {
        padding-left: 23px;
        margin-left: 12px;
        border-left: 1px solid ${(props) => (props.$darkmode ? '#444' : '#ccc')};
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        > .thinkText {
          word-break: break-all;
          word-wrap: break-word;
        }
        > .thinkImgBox {
          width: 100%;
          max-height: 100vh;
          overflow: hidden;
          margin-top: 10px;
          border-radius: 10px;
          &.on {
            width: calc(100% - 40px);
            height: auto;
            max-height: 80%;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 99999;
            overflow: scroll;
            border: 1px solid ${(props) => (props.$darkmode ? '#333' : '#ddd')};
            box-shadow: none;
            border-radius: 0;
            scrollbar-width: none;
            -ms-overflow-style: none;
            &::-webkit-scrollbar {
              display: none;
            }
            > img {
              padding: 10px;
              box-sizing: border-box;
              box-shadow: none;
              margin: 0 auto;
            }
          }
          > img {
            width: auto;
            max-width: 100%;
            height: auto;
            object-fit: cover;
            border-radius: 10px;
          }
        }
      }
      > .changeThink {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999999;
        width: 70%;
        max-width: 300px;
        height: 40%;
        padding: 20px;
        border-radius: 5%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        animation: ${opacityOn(0.4, 0)};
        background: ${(props) => (props.$darkmode ? primaryBlack : primaryWhite)};
        box-shadow: 0 0 5px 0 ${(props) => (props.$darkmode ? '#000' : '#ccc')};
        > textarea {
          width: 100%;
          height: 85%;
          font-size: 1.1rem;
          color: ${(props) => (props.$darkmode ? primaryWhite : primaryBlack)};
          padding-bottom: 10px;
          box-sizing: border-box;
          font-family: 'Roboto', sans-serif;
          scrollbar-width: none;
          -ms-overflow-style: none;
          background: transparent;
          &::-webkit-scrollbar {
            display: none;
          }
        }
        > button {
          width: 30%;
          box-sizing: border-box;
          border-radius: 10px;
          font-size: 0.9rem;
          ${(props) => basicBtn(props.$darkmode)};
          color: #ff0000;
        }
        > button:last-of-type {
          color: ${(props) => (props.$darkmode ? primaryWhite : primaryBlack)};
        }
      }
      > .commuicate {
        margin-left: 2px;
        display: flex;
        width: 100%;
        align-items: center;
        gap: 10px;
        > span {
          font-size: 0.9rem;
        }
        > .heart {
          display: inline-block;
          width: 20px;
          height: 20px;
        }
        > .like {
          /* margin-right: auto; */
        }
        > .time {
          margin-left: auto;
        }
      }
    }
    & .editDelete {
      width: 25px;
      height: 25px;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 1.3rem;
      text-align: center;
      > span {
        cursor: pointer;
      }
      > .editDeleteMenu {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        z-index: 9999999;
        animation: editDeleteMenuOn 0.4s both;
        background: ${(props) => (props.$darkmode ? '#222' : '#ddd')};
        border-radius: 10px 0 0 10px;
        overflow: hidden;
        > button {
          width: 40vw;
          padding: 10px 0;
          font-size: 1rem;
          ${(props) => basicBtn(props.$darkmode)};
        }
        > button:last-of-type {
          color: #ff0000;
        }
      }
    }
  }
`;

export const MakeContent = styled.form`
  width: 95%;
  height: 80%;
  background: ${(props) => (props.$darkmode ? primaryBlack : primaryWhite)};
  box-shadow: 0 0 5px 0 ${(props) => (props.$darkmode ? '#000' : '#ccc')};
  padding: 20px 20px 45px 20px;
  box-sizing: border-box;
  position: fixed;
  bottom: -60%;
  left: 50%;
  transform: translate(-50%, 50%);
  z-index: 999999;
  display: inline-flex;
  flex-direction: column;
  gap: 20px;
  transition: all 0.4s;
  color: ${(props) => (props.$darkmode ? primaryWhite : primaryBlack)};
  &.on {
    bottom: 50%;
  }
  > h4 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.3rem;
    font-weight: 500;
    text-align: center;
  }
  > p {
    font-weight: bold;
  }
  > textarea {
    width: 100%;
    height: 40%;
    font-size: 1.2rem;
    color: ${(props) => (props.$darkmode ? primaryWhite : primaryBlack)};
    padding-bottom: 10px;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    background: transparent;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  > input[type='file'] {
    color: transparent;
    width: 24px;
    height: 24px;
    background: ${(props) =>
        props.$darkmode ? "url('img/imgUpload_dM.png')" : "url('img/imgUpload.png')"}
      transparent;
    text-indent: -999em;
    cursor: pointer;
    position: absolute;
    bottom: 2%;
    left: 20px;
  }
  > .MakeThinkImgBox {
    width: 100%;
    position: relative;
    display: grid;
    place-content: center;
    gap: 2px;
    > img {
      width: auto;
      max-width: 100%;
      height: auto;
      max-height: 150px;
      object-fit: cover;
      box-shadow: 0 0 3px 0 #aaa;
      border-radius: 10px 10px 0 10px;
    }
    > button {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 0.9rem;
      color: ${(props) => (props.$darkmode ? primaryWhite : primaryBlack)};
      background: transparent;
    }
  }
  > button[type='submit'] {
    /* padding: 10px 40px; */
    width: 24px;
    height: 24px;
    position: absolute;
    right: 20px;
    bottom: 3%;
    text-indent: -9999em;
    ${(props) => btnUrl(props.$darkmode, 'createBtn_dM', 'createBtn')};
    font-size: 1rem;
  }
`;

export const Navigation = styled.nav`
  position: fixed;
  bottom: ${(props) => (props.$underbar ? '10px' : '-48px')};
  left: 50%;
  z-index: 999;
  transform: translateX(-50%);
  height: 32px;
  transition: bottom 0.4s;
  &::after {
    content: '';
    position: absolute;
    width: 100vw;
    height: 2px;
    border-radius: 50%;
    background: ${(props) => (props.$darkmode ? '#555' : '#ccc')};
    z-index: 99999;
    left: 50%;
    bottom: 42px;
    transform: translateX(-50%);
  }
  &.off {
    bottom: -48px;
  }
  > ul {
    display: inline-flex;
    width: 90vw;
    max-width: 393px;
    height: 32px;
    padding: 0 20px;
    box-sizing: border-box;
    justify-content: space-between;
    > li {
      width: 32px;
      height: 32px;
    }
  }
`;

export const MakeToggleBtn = styled.button`
  position: fixed;
  bottom: ${(props) => (props.$underbar ? '12px' : '-48px')};
  left: 50%;
  z-index: 99999;
  transform: translateX(-50%);
  width: 32px;
  height: 32px;
  border-radius: 25px;
  transition: bottom 0.4s;
  background: ${(props) => {
      const darkmode = props.$darkmode
        ? "url('img/makeCancle_dM.png')"
        : "url('img/makeCancle.png')";
      const lightMode = props.$darkmode
        ? "url('img/makeThink_dM.png')"
        : "url('img/makeThink.png')";

      return props.$making === 'on' ? darkmode : lightMode;
    }}
    no-repeat;
`;

export const ProfileBg = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  padding: 60px 20px 53px;
  box-sizing: border-box;
  background: ${(props) => (props.$darkmode ? primaryBlack : primaryWhite)};
  color: ${(props) => (props.$darkmode ? primaryWhite : primaryBlack)};
  > .profileContain {
    width: 100%;
    height: auto;
    max-height: calc(100% - 5px);
    padding-top: 5px;
    display: inline-flex;
    flex-wrap: wrap;
    row-gap: 20px;
    justify-content: space-between;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    > .profileInnerBox {
      width: 100%;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      > .profileImg {
        width: 90px;
        height: 90px;
        position: relative;
        > img {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 0 3px 0 #aaa;
        }
        > form {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          > input[type='file'] {
            width: 100%;
            height: 100%;
            text-indent: -9999em;
            color: transparent;
            background: url('img/imgChangeBtn.png') no-repeat right 11px bottom 11px transparent;
            cursor: pointer;
          }
          > .imgChangeBtns {
            ${(props) => defaultBgStyle(props.$darkmode)};
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            opacity: 1;
            background: ${(props) => (props.$darkmode ? '#15151599' : '#f9f9f999')};
            > button {
              ${(props) => profileEditBtn(props.$darkmode)}
            }
          }
        }
      }
      > .profileName {
        font-size: 1.3rem;
        font-weight: 500;
        letter-spacing: 1px;
        position: relative;
        > button {
          width: 18px;
          height: 18px;
          position: absolute;
          background: transparent;
          right: -24px;
          top: 50%;
          transform: translateY(-50%);
          text-indent: -9999em;
          ${(props) => btnUrl(props.$darkmode, 'editName_dM', 'editName')}
        }
        > form {
          ${(props) => defaultBgStyle(props.$darkmode)}
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 30px;
          opacity: 1;
          background: ${(props) => (props.$darkmode ? '#15151599' : '#f9f9f999')};
          > input {
            background: #333;
            border-radius: 10px;
            font-size: 1rem;
            padding: 5px 20px;
            ${(props) => ModeColor(props.$darkmode, '#333', '#eee', primaryWhite, primaryBlack)}
          }
          > .nameChangeBtns {
            display: flex;
            gap: 10px;
            > button {
              ${(props) => profileEditBtn(props.$darkmode)}
            }
          }
        }
      }
    }
    > p {
      width: 100%;
      font-size: 0.9rem;
      padding-top: 10px;
      border-top: 1px solid ${(props) => (props.$darkmode ? '#333' : '#ddd')};
    }
    > .profileItemBox {
      width: 100%;
      height: auto;
      > .profileItem {
        width: 100%;
        height: auto;
        overflow: hidden;
        padding: 15px 15px 60px;
        margin-bottom: 5px;
        border: 1px solid ${(props) => (props.$darkmode ? '#333' : '#ddd')};
        box-sizing: border-box;
        position: relative;
        overflow-y: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
          display: none;
        }
        &.on {
          position: fixed;
          z-index: 999999;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: calc(100% - 40px);
          height: auto;
          max-height: 80%;
          margin: 0;
          padding-top: 40px;
          background: ${(props) => (props.$darkmode ? primaryBlack : primaryWhite)};
          > p {
            white-space: normal;
            text-overflow: clip;
            overflow-wrap: break-word;
            word-wrap: break-word;
          }
          > .profileItemImgBox {
            width: 100%;
            height: auto;
            > img {
              width: 100%;
              max-width: auto;
              height: auto;
              max-height: none;
              border-radius: 10px;
              box-shadow: 0 0 3px 0 #aaa;
            }
          }
          > form {
            min-height: 200px;
            > textarea {
              width: 100%;
              height: 300px;
              font-size: 1.2rem;
              color: ${(props) => (props.$darkmode ? primaryWhite : primaryBlack)};
              box-sizing: border-box;
              font-family: 'Roboto', sans-serif;
              background: transparent;
              scrollbar-width: none;
              -ms-overflow-style: none;
            }
            > button {
              ${(props) => profileEditBtn(props.$darkmode)}
              position: absolute;
              right: 15px;
              bottom: 15px;
              &:first-of-type {
                right: 80px;
              }
            }
          }
        }
        > p {
          font-size: 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &:last-of-type {
            margin-bottom: 15px;
          }
        }
        > span {
          position: absolute;
          right: 15px;
          bottom: 20px;
          font-size: 0.9rem;
        }
        > .profileLikeText {
          position: absolute;
          left: 15px;
          bottom: 20px;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 10px;
          > .heart {
            display: inline-block;
            width: 20px;
            height: 20px;
          }
        }
        > .profileItemImgBox {
          width: 100%;
          height: auto;
          > img {
            width: auto;
            max-width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 0 3px 0 #aaa;
          }
        }
        > .profileBtns {
          position: absolute;
          right: 15px;
          top: 10px;
          display: flex;
          gap: 10px;
          > button {
            width: 24px;
            height: 24px;
            text-indent: -9999em;
            ${(props) => btnUrl(props.$darkmode, 'editBtn_dM', 'editBtn')};
            &:last-of-type {
              ${(props) => btnUrl(props.$darkmode, 'deleteBtn_dM', 'deleteBtn')}
            }
          }
        }
      }
      > .noText {
        height: 100%;
        opacity: 0.4;
        text-align: center;
      }
    }
  }
`;

export const DefalutBg = styled.div`
  ${(props) => defaultBgStyle(props.$darkmode)}
`;

export const ModeBtn = styled.button`
  width: 60px;
  height: 35px;
  border-radius: 30px;
  font-size: 0.9rem;
  position: fixed;
  left: 20px;
  top: 10px;
  transition: all 0.4s;
  background: ${(props) => (props.$darkmode ? primaryWhite : primaryBlack)};
  color: ${(props) => (props.$darkmode ? primaryBlack : primaryWhite)};
`;

export const LogOutBtn = styled.button`
  width: 35px;
  height: 35px;
  position: fixed;
  right: 20px;
  top: 10px;
  text-indent: -9999em;
  ${(props) => btnUrl(props.$darkmode, 'logOut_dM', 'logOut')}
`;

export const Loading = styled.span`
  display: block;
  width: 36px;
  height: 36px;
  animation: loadingLotate 0.8s ease-in infinite;
  ${(props) => btnUrl(props.$darkmode, 'loading_dM', 'loading')};
  &.thinkLoading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
