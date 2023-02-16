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
                <h1>Some Heading Text</h1>
                <p style={{
                    fontSize:"20px"
                }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, perspiciatis accusantium dolorum, quidem mollitia maxime, quia repellendus ad corrupti nisi distinctio ducimus vitae dolore! Rem voluptas quos laborum laboriosam debitis natus impedit iure, exercitationem deserunt velit iste neque quaerat doloribus voluptatem odit? Ab eveniet dolores cumque provident eaque perferendis ea.</p>
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
                <h1>Some Heading Text</h1>
                <p style={{
                    fontSize:"20px"
                }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, perspiciatis accusantium dolorum, quidem mollitia maxime, quia repellendus ad corrupti nisi distinctio ducimus vitae dolore! Rem voluptas quos laborum laboriosam debitis natus impedit iure, exercitationem deserunt velit iste neque quaerat doloribus voluptatem odit? Ab eveniet dolores cumque provident eaque perferendis ea.</p>
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