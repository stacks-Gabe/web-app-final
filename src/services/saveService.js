import { db } from "../firebaseConfig";
import {
  collection,
  query,
  getDoc,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { auth } from "../firebaseConfig";

export async function saveProgress(levelProgress) {
  const user = auth.currentUser;
  const userDocRef = doc(db, "users", user.uid);
  const userDocSnap = await getDoc(userDocRef);
  if (user) {
    try {
      if (!userDocSnap.exists()) {
        levelProgress = 0;
      }
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
  if (user) {
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const levelsCompleted = docSnap.data().levelsCompleted;
        return levelsCompleted;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
}
