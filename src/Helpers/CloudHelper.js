import Firebase from "./Firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

class CloudHelper {
  async uploadFile(file, file_name, folder_name) {
    if (!file) return;
    const storageRef = ref(
      Firebase().storage,
      "/files/" + folder_name + "/" + file_name
    );
    await uploadBytes(storageRef, file)
      .then(() => console.log("upload"))
      .catch((error) => console.log(error));
  }

  async deleteFile(folder_name, file_name) {
    const storageRef = ref(
      Firebase().storage,
      "/files/" + folder_name + "/" + file_name
    );
    await deleteObject(storageRef)
      .then(() => console.log("deleted!"))
      .catch((error) => console.log(error));
  }

  async dowloadFile(folder_name, file_name) {
    const storageRef = ref(
      Firebase().storage,
      "/files/" + folder_name + "/" + file_name
    );
    getDownloadURL(storageRef).then((url) => {
      window.open(url);
    });
  }
}

const cloudHelper = new CloudHelper();
export default cloudHelper;
