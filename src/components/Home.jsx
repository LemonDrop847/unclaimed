
import { useState, useEffect} from "react";
import Popup from "./popUp";
import SignUp from "./auth/signUp";
import SignIn from "./auth/signIn";
import { getAuth } from "firebase/auth";
const Home = () => {
    const [buttonPopup, setButtonPopup] = useState(false);
    const [buttonPopup1, setButtonPopup1] = useState(false);
    const [isLogin, setLogin] = useState(false);
    const auth = getAuth();
    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
          if (user) {
            // setName(user.displayName);
            setLogin(true);
          } else {
            setLogin(null);
          }
        });
      }, [auth]);
    return ( 
        <>
        <div className="container-fluid">

        <div className="row text1">
            <div className="col ">
                <div id="text">
                <h1><strong>Reclaim your lost items</strong></h1>
                <p style={{
                    fontSize:"20px"
                }}>This busy pace of modern life often makes things hectic for people. There are chances you might lose one or more of your valuable belongings on your way or at a particular place you visit. Unclaimed aims to help users to reach their mislaid items easily.</p>
                {!isLogin &&
                <div>
                    <button id="sign" className="btn-land" onClick={()=>setButtonPopup(true)}>Sign Up</button>
                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                        <SignUp/>
                    </Popup>
                    <button id="llog" className="btn-land" onClick={()=>setButtonPopup1(true)}>Log in</button>
                    <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1}>
                        <SignIn/>
                    </Popup>
                </div>
                }
                </div>
            </div>
            <div className="col">
                <img src="https://i.postimg.cc/4NkxH6Tw/laptop.jpg" id="laptop" alt=""  />
            </div>
        </div>
        <div className="row" id="half">
                <div className="col">
                <img src="https://i.postimg.cc/tCMXDx1n/unc.png" id="hand" alt=""  />

                </div>
                <div className="col" >
                <div id="text2">
                <h1><strong>Scan QR to reach the owner </strong></h1>
                <p style={{
                    fontSize:"20px"
                }}>By allowing users to generate QR codes for their personal items, Unclaimed aims to make it easy for someone who finds a lost item to quickly and easily return it to its rightful owner by scanning the QR code. Also the user can check where the QR was last scanned.

                </p>
                <button id="sign" className="btn-land" onClick={()=>setButtonPopup(true)}>Sign Up</button>
                {!isLogin &&
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <SignUp/>
                </Popup>
                }
                <button id="llog" className="btn-land" onClick={()=>setButtonPopup1(true)}>Log in</button>
                {!isLogin &&
                <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1}>
                    <SignIn/>
                </Popup>
                }
                

                </div>
            </div>
        </div>
        </div>
        </>
    );
}
 
export default Home;