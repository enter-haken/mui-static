import { Component, OnInit, AfterViewInit, ViewChild, ElementRef,OnDestroy } from '@angular/core';

//import { startWith, tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('search') searchRef: ElementRef;

  graphHeight: number;

  searchPhrase: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    setTimeout(() => {
      this.graphHeight = window.innerHeight
        - this.searchRef.nativeElement.offsetHeight;
    });
  }

  public searchChanged(searchPhrase: string) {
    this.searchPhrase = searchPhrase;
  }

  ngOnDestroy(): void {

  }
}
