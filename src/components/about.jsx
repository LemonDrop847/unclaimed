import {useState} from "react";
// import { Link } from "react-router-dom";
const About = (props) => {
    // const [theme, setTheme] = useState("light-theme");
    const [logo, setLogo] = useState(
        "https://i.postimg.cc/PfVvRDfN/github-mark.png"
    );
    return ( 
        <div className="container-fluid about">
        <div className="container">
        <div className="row" style={{
            textAlign: "left",
            margin:"0 2rem 2rem 2rem"
        }}>
            <h2>Possible Solution:</h2>
            <p style={{
                fontSize: "23px"
            }}>
We can create a website. The problem that this website aims to solve is the issue of lost or misplaced belongings. By allowing users to generate QR codes for their personal items, the website aims to make it easy for someone who finds a lost item to quickly and easily return it to its rightful owner by scanning the QR code and being directed to contact information or a page where they can get in touch with the owner of the item and also the user can check where the QR was last scanned.
</p>
        </div>
        <div className="row" style={{
            textAlign: "left",
            margin:"2rem"
        }}>
            <h2>Problem Statement</h2>
            <p style={{
                fontSize: "23px"
            }}>Many individuals are struggling to find the time to properly care for their valuable possessions due to their busy schedules. This results in neglect and potential damage to these items, causing financial and sentimental loss. A solution is needed to help these individuals effectively manage and maintain their valuable possessions despite their busy lifestyles.</p>
        </div>
        </div>
            <div className="row " style={{
                padding:"1rem 2rem 2rem 2rem",
                paddingBottom:"1rem"
            }}>
                <div className="col">
                    <div className="row type1">
                        <div className="col">
                            <h2>Tanisha Pattnaik</h2>
                            <a href="https://github.com/tanisha11do" target="_blank">
                                <img src="https://i.postimg.cc/PfVvRDfN/github-mark.png" style={{
                                    backgroundColor: "#fff"
                                }} id='github' alt="" />
                            </a>
                        </div>
                        <div className="col">
                            <img src="https://i.postimg.cc/qqRLJB5x/user.png" id="abt-pic"alt="" />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="row type1">
                        <div className="col">
                            <h2>Subhasish Behera</h2>
                            <a href="https://github.com/TheRealSubhasishBehera" target="_blank">
                                <img src="https://i.postimg.cc/PfVvRDfN/github-mark.png" style={{
                                    backgroundColor: "#fff"
                                }} id='github' alt="" />
                            </a>
                        </div>
                        <div className="col">
                            <img src="https://i.postimg.cc/qqRLJB5x/user.png" id="abt-pic"alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row " style={{
                padding:"1rem 2rem .5rem 2rem",
                paddingBottom:"1rem"
            }}>
                <div className="col">
                    <div className="row type1">
                        <div className="col">
                            <h2>Anil Kumar Behera</h2>
                            <a href="https://github.com/Anonymous961" target="_blank">
                                <img src="https://i.postimg.cc/PfVvRDfN/github-mark.png" id='github' style={{
                                    backgroundColor: "#fff"
                                }}
                                    alt="" />
                            </a>
                        </div>
                        <div className="col">
                            <img src="https://i.postimg.cc/XJ1Y7X8Q/Anonymous-emblem-svg.png" id="abt-pic"alt="" />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="row type1">
                        <div className="col">
                            <h2>Nitin Mishra</h2>
                            <a href="https://github.com/LemonDrop847" target="_blank">
                                <img src="https://i.postimg.cc/PfVvRDfN/github-mark.png" style={{
                                    backgroundColor: "#fff"
                                }} id='github' alt="" />
                            </a>
                        </div>
                        <div className="col">
                            <img src="https://i.postimg.cc/9Fngt2xK/lemon.jpg" id="abt-pic"alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default About;