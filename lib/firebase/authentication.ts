import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export { auth, authProvider };
