import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ImageService } from './../../shared/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  constructor(private service: ImageService) { }

  ngOnInit() {
    this.service.getImageDetailList();
  }

}
