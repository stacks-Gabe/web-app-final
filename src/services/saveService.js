import { db } from "../firebaseConfig";
import { collection, query, getDocs, addDoc } from "firebase/firestore";

export async function saveProgress({ levelProgress }) {
  console.log(levelProgress);
  const data = { levelProgress };
  const docRef = await addDoc(collection(db, "Levels Completed"), data);
  return { id: docRef.id, ...data };
}

export async function fetchProgress() {
  const snapshot = await getDocs(query(collection(db, "Levels Completed")));
  const progress = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return;
}
