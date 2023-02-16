import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Popup from "./popUp";
import SignIn from "./auth/signIn";
import Dropdown from "react-bootstrap/Dropdown";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const auth = getAuth();
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        window.location.reload(true);
      })
      .catch((error) => console.log(error));
  };
  const [theme, setTheme] = useState("light-theme");
  const [logo, setLogo] = useState(
    "https://i.postimg.cc/hvcMCKZf/20230203-143738.png"
  );
  const [dark, setDark] = useState(
    "https://i.postimg.cc/qM11YRqV/brightness.png"
  );

  const [user, setUser] = useState(null);
  const [userName, setName] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);

  const toggleTheme = () => {
    // theme==="dark-theme"?setTheme("light-theme"):setTheme("dark-theme");
    if (theme === "dark-theme") {
      setTheme("light-theme");
      setLogo("https://i.postimg.cc/hvcMCKZf/20230203-143738.png");
      setDark("https://i.postimg.cc/qM11YRqV/brightness.png");
    } else {
      setTheme("dark-theme");
      setLogo("https://i.postimg.cc/nr2M2NHZ/20230203-143825.png");
      setDark("https://i.postimg.cc/0QFh30C4/moon-2.png");
    }
    console.log("toggle");
  };
  useEffect(() => {
    document.body.className = theme;
    document.getElementById("Logo").src = logo;
    document.getElementById("Dark").src = dark;
  }, [theme, dark, logo]);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setName(user.displayName);
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [auth]);

  return (
    <>
      <nav>
        <div className="container-fluid">
          <div className="row navs">
            <div
              className="col-sm-3 col-lg-3"
              style={{
                height: "120px",
              }}
            >
              <Link to="/">
                <img
                  className="col-2 logo"
                  src="https://i.postimg.cc/hvcMCKZf/20230203-143738.png"
                  id="Logo"
                  alt=""
                  style={{
                    width: "140px",
                    height: "140px",
                  }}
                />
              </Link>
            </div>
            <div className="col-sm-3 col-lg-9">
              <div
                className="row"
                style={{
                  float: "center",
                }}
              >
                <div className="col-sm-3 col-md-2 col-lg-1 offset-4">
                  <img
                    src="https://i.postimg.cc/qM11YRqV/brightness.png"
                    id="Dark"
                    onClick={() => toggleTheme()}
                    alt=""
                  />
                </div>
                <div className="col-sm-3 col-md-2 col-lg-1">
                  <Link className="links" to="/">
                    Home
                  </Link>
                </div>
                {/* <div className="col-sm-3 col-md-2 col-lg-2">
                  <Link className="links" to="/dashboard">
                    Dashboard
                  </Link>
                </div> */}
                <div className="col-sm-3 col-md-2 col-lg-1">
                  <Link className="links" to="/about">
                    About
                  </Link>
                </div>
                {!user && (
                  <div className="col-sm-3 col-md-2 col-lg-1">
                    <Link
                      className="links"
                      to="/"
                      onClick={() => setButtonPopup(true)}
                    >
                      Login
                    </Link>
                  </div>
                )}
                <div className="col-sm-3 col-md-2 col-lg-3">
                  {user && (
                    <Dropdown
                      style={{
                        height: "70px",
                      }}
                    >
                      <Dropdown.Toggle variant="" id="dropdown-basic">
                        {user && <img src={user.photoURL} id="pp" alt="" />}
                        <div className="text11">Hello, {userName}</div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu id="dd-menu">
                        {/* <Dropdown.Item href="#/action-1"> */}
                        {/* </Dropdown.Item> */}
                        {/* <Link className="links" to="">Dashboard</Link> */}
                        <Dropdown.Item href="#">
                          <Link className="dd" to="/dashboard">
                            Dashboard
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item  href="#/action-2">
                        <div className="d1">

                          Update Profile
                        </div>
                        </Dropdown.Item>
                        <Dropdown.Item  href="#/action-1" onClick={userSignOut}>
                          <div className="d1">
                            Sign Out

                          </div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {!user && (
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <SignIn />
          </Popup>
        )}
      </nav>
    </>
  );
};

export default Navbar;
