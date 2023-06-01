import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-video-swiper',
  templateUrl: './video-swiper.component.html',
  styleUrls: ['./video-swiper.component.css']
})
export class VideoSwiperComponent implements OnInit {
  swiperCOnfig: SwiperConfigInterface = {
    a11y: true,
    observer: true,
    spaceBetween: 10,
    direction: 'horizontal',
    slidesPerView: 3,
    navigation: true,
    keyboard: true,
    mousewheel: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      540: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      899: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      990: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      1300: {
        slidesPerView: 3,
        spaceBetween: 10
      }
    }
  };
  constructor() { }

  ngOnInit(): void {
  }

}
