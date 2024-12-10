import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from 'firebase/auth';

import { User} from '../models/user.model';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc,collection } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL } from 'firebase/storage';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

 auth = inject(AngularFireAuth);
 firestore= inject(AngularFirestore);
 utilsSvc= inject(UtilsService);

 //=====autenticacion====

 getAuth(){
  return getAuth();

 }

 //=====acceder====
 
 signIn(user: User){
  return signInWithEmailAndPassword(getAuth(), user.email, user.password);
 }

 signUp(user: User){
  return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
 }

  //=====Actualizar Usuario====
  
  updateUser(displayName:string){
 
  return updateProfile(getAuth().currentUser,{displayName})
}


 //=====Enviar email para recuperar la contraseña====
  
 sendRecoveryEmail(email: string){
 return sendPasswordResetEmail(getAuth(),email);
}

//=====Cerrar sesion====

signOuth(){
 getAuth().signOut();
 localStorage.removeItem('user');
 this.utilsSvc.routerlink('/auth');
}



//=====Base de datos====

//=====Setear un documento====

setDocument(path: string, data:any){
return setDoc(doc(getFirestore(),path), data);
}

//=====Setear un documento====

async getDocument(path: string){
  return (await getDoc(doc(getFirestore(),path))).data();
  }

//=====agregar un documento====
addDocument(path: string, data: any){
  return addDoc(collection(getFirestore(),path),data);

}
//=====almacenamiento====


//=====subir imagenes====
uploadImage(path: string, data_url:string){
return uploadString(ref(getStorage(),path), data_url, 'data_url').then(() =>{
  return getDownloadURL(ref(getStorage(), path))
})
}

}