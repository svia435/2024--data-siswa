import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { 
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCRlnLBhUHGOF7Lfg9iy_SbfK6coM_7f1U",
  authDomain: "insan-cemerlang-6640c.firebaseapp.com",
  projectId: "insan-cemerlang-6640c",
  storageBucket: "insan-cemerlang-6640c.appspot.com",
  messagingSenderId: "917464283158",
  appId: "1:917464283158:web:3a6179cd71818d68f6dd37"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarSiswa() {
  const siswaRef = collection(db, "siswa");
  const q = query(siswaRef, orderBy("nama"));
  const querySnapshot = await getDocs(q);
  
  let retval = [];
  querySnapshot.forEach((doc) => {
    retval.push({ id: doc.id, nama: doc.data().nama });
  });
  
  return retval;
}

export async function tambahSiswa(val) {
  try {
    const docRef = await addDoc(collection(db, "siswa"), {
      nama: val
    });
    console.log('Berhasil menyimpan dokumen dengan ID: ' + docRef.id);
  } catch (e) {
    console.log('Error manambah dokumen '+ e);
  }
}

export async function hapusSiswa(docId) {
  await deleteDoc(doc(db, "siswa", docId));
}

export async function ubahSiswa(docId,val) {
  await updateDoc(doc(db, "siswa",docId), {nama: val });
}

export async function ambilSiswa(docId) {
  const docRef = await doc(db, "siswa", docId);
  const docSnap = await getDoc(docRef);
  
  return await docSnap.data();
}