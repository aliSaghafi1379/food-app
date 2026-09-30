import { useContext, useRef, useState , useEffect} from "react";
import { v4 as uuidv4 } from "uuid";
import { myContexts } from "../contexts";
import { supabase } from "../supabase";
import "../scss/create.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Create = () => {
  const {
    title,
    setTitle,
    price,
    setPrice,
    details,
    setDetails,
  } = useContext(myContexts);

  const imageUpload = useRef(null);
  const [upload, setUpload] = useState(null);
  const ADMIN_ID = "3658c665-e6c9-4c3c-9c87-5ed334c94376";
  const [user, setUser] = useState(null);
  const [checkingUser, setCheckingUser] = useState(true);

  useEffect(() => {
  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
    setCheckingUser(false);
  };

  checkUser();
}, []);

  const CreateNewItem = async (e) => {
    e.preventDefault();

    if (!upload) return;

    const id = uuidv4();
    const fileName = `${id}-${upload.name}`;

    // 1. Upload image
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(fileName, upload);

    if (uploadError) {
      console.error("UPLOAD IMAGE ERROR:", uploadError);
      return;
    }

    // 2. Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);

    const url = publicUrlData.publicUrl;

    console.log("FINAL IMAGE URL:", url);

    // 3. Save product + image URL in items
    const { error: itemError } = await supabase
      .from("items")
      .insert({
        title,
        price: Number(price),
        details,
        url,
      });

    if (itemError) {
      console.error("CREATE ITEM ERROR:", itemError);
      return;
    }

    // 4. Clear form
    setTitle("");
    setPrice("");
    setDetails("");

    if (imageUpload.current) {
      imageUpload.current.value = "";
    }

    Swal.fire({
      title: "SUCCESSFULLY",
      icon: "success",
    });
  };

  if (checkingUser) {
    return <p>Loading...</p>;
  }

  if (!user || user.id !== ADMIN_ID) {
    return <a href="/" style={{color: "red" , fontSize: "20px" , marginTop:"150px" , display:"block"}}>You don't have permission to access this page. 🔒</a>;
  }
  return (
    <div className="container-create">
      <div className="row-create">
        <form
          onSubmit={(e) => {
            CreateNewItem(e);
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            placeholder="Details"
            rows="4"
            cols="50"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>

          <input
            type="file"
            onChange={(e) => setUpload(e.target.files[0])}
            ref={imageUpload}
          />

          <button type="submit">click</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
