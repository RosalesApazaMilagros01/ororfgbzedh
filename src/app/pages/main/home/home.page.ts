import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }
//== cerrar sesion
signOuth(){
  this.firebaseSvc.signOuth();
}
//== Agregar o actualizar productos
addUpdateProduct(){
  this.utilsSvc.presentModal({
    component: AddUpdateProductComponent,
    cssClass: 'add-update-modal'
  })
}


}
