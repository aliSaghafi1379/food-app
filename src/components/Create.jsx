import { ref, set } from "firebase/database";
import { useContext, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../firebase";
import { myContexts } from "../contexts";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { ref as sRef } from "firebase/storage";
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
    count,
    infoPerson,
  } = useContext(myContexts);

  const imageUpload = useRef(null);
  const [upload, setUpload] = useState(null);

  const CreateNewItem = (e) => {
    e.preventDefault();
    const id = uuidv4();
    if (upload == null) return;
    const imgRef = sRef(storage, `images/${upload.name}`);
    uploadBytes(imgRef, upload).then(() => {
      getDownloadURL(imgRef).then(
        (url) => {
          set(ref(db, `/Items/${id}`), {
            id,
            title,
            url,
            price,
            details,
            count,
            saved: false,
          });
          if (infoPerson) {
            // eslint-disable-next-line array-callback-return
            infoPerson.map((infoo) => {
              set(ref(db, `/InfoPerson/${infoo.userName}/Items/${id}`), {
                id,
                title,
                url,
                price,
                details,
                count,
              });
            });
          }

          setTitle("");
          setPrice("");
          setDetails("");
          if (imageUpload.current) {
            imageUpload.current.value = "";
            imageUpload.current.type = "text";
            imageUpload.current.type = "file";
          }
        },
        Swal.fire({
          title: "SUCCESSFULLY",
          // text: "Do you want to continue",
          icon: "success",
        })
      );
    });
  };

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
