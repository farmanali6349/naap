import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
  getDoc,
  writeBatch,
  orderBy,
} from "firebase/firestore";
import { app } from "./firebase";
import { ImageDoc, NaapDoc } from "../types";

const db = getFirestore(app);

// Create New Naap
export const createNaap = async (data: Omit<NaapDoc, "id">) => {
  try {
    const docRef = await addDoc(collection(db, "naaps"), {
      userId: data.userId,
      customerName: data?.customerName || "",
      customerPhone: data?.customerPhone,
      notes: data?.notes || "",
      createdAt: new Date(),
    });

    return docRef.id;
  } catch (error) {
    console.log("Error in db.ts :: createNaap() :: Error :: ", error);
    return null;
  }
};

// Create Images
// Response: Completed Created Images
export const createImages = async (
  userId: string,
  naapId: string,
  images: { cloudinaryId: string; url: string }[]
) => {
  try {
    const promises = images.map(async (img) => {
      const docRef = await addDoc(collection(db, "images"), {
        userId,
        naapId,
        url: img.url,
        cloudinaryId: img.cloudinaryId,
        createdAt: new Date(),
      });

      return {
        id: docRef.id, // Firestore-generated ID
        userId,
        naapId,
        url: img.url,
        cloudinaryId: img.cloudinaryId,
        createdAt: new Date(),
      };
    });

    return Promise.all(promises);
  } catch (error) {
    console.log("Error in db.ts :: createImages() :: Error :: ", error);
    return null;
  }
};

// Update Naap
// Response: Complete Updated Naap
export const updateNaap = async (
  naapId: string,
  data: { name?: string; phone?: string; notes?: string }
) => {
  try {
    const naapRef = doc(db, "naaps", naapId);
    await updateDoc(naapRef, data);
    return true;
  } catch (error) {
    console.log("Error occured in updating naap :: ", error);
    return false;
  }
};

// Delete Single Image
export const deleteImage = async (imageId: string) => {
  try {
    await deleteDoc(doc(db, "images", imageId));
    return true;
  } catch (error) {
    console.log("error occured in deleting single image :: ", error);
    return false;
  }
};

// Delete Full Naap (Naap Document & Related Images)
export const deleteNaap = async (naapId: string) => {
  try {
    // Creating Batch
    const batch = writeBatch(db);

    // Find all images belonging to this Naap
    const q = query(collection(db, "images"), where("naapId", "==", naapId));
    const imageDocs = await getDocs(q);

    // Adding Images Deletion To Batch
    imageDocs.forEach((img) => {
      batch.delete(img.ref);
    });

    // Adding Naap Deletion To Batch
    const naapRef = doc(db, "naaps", naapId);
    batch.delete(naapRef);

    // Commit All Changes At Once
    await batch.commit();

    return true;
  } catch (error) {
    console.log("Error Occured :: db.ts :: deleteNaap() :: Error :: ", error);
    return false;
  }
};

// Get All Naaps
export const getAllNaaps = async (userId: string) => {
  try {
    const naapRefs = collection(db, "naaps");
    const q = query(
      naapRefs,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as Omit<NaapDoc, "id">;
      return { id: doc.id, ...data };
    });
  } catch (error) {
    console.log("Error Occured :: db.ts :: getAllNaaps() :: Error :: ", error);
    return null;
  }
};

// Get All Images
export const getAllImages = async (naapId: string) => {
  try {
    const imagesRefs = collection(db, "images");

    const q = query(
      imagesRefs,
      where("naapId", "==", naapId),
      orderBy("createdAt", "asc")
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as Omit<ImageDoc, "id">;
      return { id: doc.id, ...data };
    });
  } catch (error) {
    console.log("Error Occured :: db.ts :: getAllImages() :: Error :: ", error);
    return null;
  }
};

// Get One Naap
export const getNaap = async (naapId: string): Promise<NaapDoc | null> => {
  try {
    const naapRef = doc(db, "naaps", naapId);

    const docSnapShot = await getDoc(naapRef);

    if (docSnapShot.exists()) {
      const data = docSnapShot.data() as Omit<NaapDoc, "id">;

      return {
        id: docSnapShot.id,
        ...data,
      };
    } else {
      throw new Error("No Such Naap Found");
    }
  } catch (error) {
    console.log("Error Occured :: db.ts :: getNaap() :: Error :: ", error);
    return null;
  }
};
