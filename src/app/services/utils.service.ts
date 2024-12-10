import { Injectable, inject } from '@angular/core';
import {LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController) ;

  toastCtrl= inject(ToastController);
  modalCtrl= inject(ModalController);
router= inject(Router);


async takePicture (promptLabelHeader:string){
  return await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
    promptLabelHeader,
    promptLabelPhoto: 'Selecciona una imagen',
    promptLabelPicture:'Toma una foto'
  });

};




  // =========== Loading :

  loading (){

  return this.loadingCtrl.create({spinner:'crescent'

  });

 

} //====toastr
async presentToast(opts?:ToastOptions){
  const toast = await this.toastCtrl.create(opts);
  toast.present();
}

  //====entrar a cualquier pagina


routerlink(url:string){
return this.router.navigateByUrl(url);
}

 //==== Guarda un elemento


 saveInLocalStorage(key: string, value: any){
  return localStorage.setItem(key, JSON.stringify(value))
  }
  
  
 //==== Obtiene un elemento desde localstorage


 getFromLocalStorage(key: string){
  return JSON.parse(localStorage.getItem(key))
  }
  

 //==== modal

 async presentModal(opts: ModalOptions ){
  const modal = await this.modalCtrl.create(opts);
  await modal.present();
  const {data} = await modal.onWillDismiss();
  if(data) return data;
}

dismissModal(data?: any){
 return this.modalCtrl.dismiss(data); 
}
}
