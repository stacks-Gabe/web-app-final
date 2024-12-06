import { db } from "../firebaseConfig";
import { collection, query, getDocs, addDoc, setDoc, doc} from "firebase/firestore";
import { auth } from "../firebaseConfig";

export async function saveProgress( levelProgress) {
  const user = auth.currentUser;
  const userDocRef = doc(db, "users", user.uid); 
  if(user){
    try {
      await setDoc(
        userDocRef,
        { levelsCompleted: levelProgress },
        { merge: true } 
      );
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  }
}
export async function fetchProgress() {
  const user = auth.currentUser;
  const userDocRef = doc(db, "users", user.uid); 
  
  if(user){
    try {
      const docSnap = await getDoc(userDocRef); 
      if (docSnap.exists()) {
        const levelsCompleted = docSnap.data().levelsCompleted;
        console.log("Levels completed:", levelsCompleted);
        return levelsCompleted; 
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
}
// const snapshot = await getDocs(query(collection(db, "Levels Completed")));
  // const docSnap = await getDoc(doc(db, "Levels Completed"))
  // const progress = snapshot.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data(),
  // }));
  // console.log(doc.data())
  // return ;