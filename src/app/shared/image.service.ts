import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageDetailList: AngularFireList<any>;
  imageDet: AngularFireObject<any>

  constructor(private firebase: AngularFireDatabase) {
  }

  getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
    return this.imageDetailList.snapshotChanges();
  }

  insertImageDetails(imageDetails: any){
    console.log(imageDetails);
    console.log(imageDetails.caption);

    this.imageDetailList.push({
      caption: imageDetails.caption,
      category: imageDetails.category,
      imageurl: imageDetails.imageUrl
    });
  }
}
