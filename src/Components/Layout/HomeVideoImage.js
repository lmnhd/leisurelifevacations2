import style from "./HomeVideoImage.module.css";
//import logoStyle from "./logostyle.module.css"
import video from "../../Assets/0727.mp4";
import logo from "./logo.svg";
import webText from "./web text.svg";
export default function HomeVideoImage() {
  const videoLink = "../../Assets/0727.mp4";
  var wrapper = document.querySelector("object");

  function animate() {
    console.log(wrapper);
    wrapper.classList.add("active");
  }

  return (
    <>
      <div className={style.vidCon}>
        <div className={style.overlay1}> </div>
        <object
              type="image/svg+xml"
              data={webText}
              width="100%"
              height="100%"
              className="absolute shadow-md"
            ></object>
        <div className={style.wrapper}>
          <object
            type="image/svg+xml"
            data={logo}
            width="40%"
            height="40%"
            className="z-50"
          ></object>
        </div>
        <div className={style.overlay3}>
          <div className="md:flex flex-col">
            {/* <p
          className="text-3xl font-bold font-body"
          >Your adventure starts here!</p>
           <h2
           className="text-blue-500 shadow-md"
           >Let us make it happen.</h2>
           <h3
           className="font-sans text-gray-800 mt-20"
           >Join Our Group</h3> */}
            
          </div>
        </div>

        <video
          className={style.videobg}
          src={video}
          autoPlay
          muted
          loop
        ></video>
      </div>
    </>
  );
}
