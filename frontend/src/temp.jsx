import { useEffect, useState } from "react";
import axios from "axios";

 function GetImage() {
    const[image_url,setImage_url] = useState("")
    const retriveImage = async () => {
        const res = await axios.get("http://localhost:5000/get_image");
        setImage_url(res.data.image_url)
    }
    useEffect(() => {
        retriveImage();
      }, []);
   return (
     <img 
      src={image_url}
      alt="new"
      />
   );
 }
 export default GetImage
