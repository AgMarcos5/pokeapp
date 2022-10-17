import { collection, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { onLoadTrainer, startSavingTrainer } from "./trainerSlice";


// docName: pokemons - bag 
export const startSaveTrainerInfo = (docName) => {
  return async (dispatch, getState) => {

    const {uid} = getState().auth.user;
    const info = getState().trainer[docName];

    
    const docRef = doc(FirebaseDB, `${uid}/${docName}`);
    await setDoc(docRef, {[docName] : info}, {merge:true});
  }
}


export const startNewTrainerInfo = () => {
  return async (dispatch, getState) => {
    const {uid} = getState().auth.user;
    const trainer = {...getState().trainer};
    delete trainer.isSaving;
    for (const key in trainer) {
        const newDoc = doc( collection( FirebaseDB, `${uid}` ), `${key}` )
        await setDoc( newDoc, {[key] : trainer[key]} )
    }

  }
}

export const startLoadingTrainerInfo = () => {
  return async( dispatch, getState) => {
    const {uid} = getState().auth.user;
    
    const collectionRef = collection(FirebaseDB,`${uid}`);
    const { docs } = await getDocs(collectionRef)
    if(docs.length){
      // Obtengo datos del entrenador desde firebase

      const data = docs.map(doc => ({...doc.data()}))
      const trainerInfo = Object.assign({}, ...data );
      dispatch(onLoadTrainer(trainerInfo))
    }
    else{
      // No tengo datos en firebase
      dispatch(startNewTrainerInfo());
    }
  }
};