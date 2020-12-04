import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ImageService } from './../../shared/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  imageSrc: string;
  imgUrl: string = '../../../assets/images/drop-file-here.jpg';
  selectedImg: any = null;
  isSubmitted: boolean;

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl(''),
    imageUrl: new FormControl('', Validators.required),
  });

  constructor(private storage: AngularFireStorage, private service: ImageService) { }

  ngOnInit(): void {
    this.resetForm();

    this.service.getImageDetailList();

  }


  showPreview = (event: any) => {
    if(event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => this.imgUrl = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];

    } else {
      this.imgUrl = '../../../assets/images/drop-file-here.jpg';
      this.selectedImg = null;
    }
  } // end of function

  onSubmit(formValue) {
    this.isSubmitted = true;


    if(this.formTemplate.valid) {
      var filePath = `${formValue.category}/${this.selectedImg.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef= this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
              formValue['imageUrl'] = url;
              this.service.insertImageDetails(formValue);
              this.resetForm();
            })
          })
          ).subscribe();
        }

        console.log(formValue);

  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
      this,this.formTemplate.reset();
      this.formTemplate.setValue({
        caption: '',
        imageUrl: '',
        category: 'Animal'
      })

     this.imgUrl =  '../../../assets/images/drop-file-here.jpg';
     this.isSubmitted = false;
     this.selectedImg = null;
  } //end of function
}
