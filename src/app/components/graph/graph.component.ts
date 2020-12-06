import { Component, ViewChild, Input, AfterViewInit, ElementRef, SimpleChanges } from '@angular/core';

import { Network } from 'vis';

import { MemoryService } from '../../services/memory.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements AfterViewInit {

  @Input() searchPhrase: string;
  @Input() graphHeight: number;

  constructor(private memoryService: MemoryService) {
  }

  @ViewChild('network') el: ElementRef;

  // TODO:
  // - network config
  // - div container in background
  //
  // - fit 100% width and height
  // https://stackoverflow.com/questions/60270925/finding-resizeobserver-with-typescript-in-angular-9

  ngAfterViewInit(): void {
    //this.createNetwork();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchPhrase){
      this.searchPhrase = changes.searchPhrase.currentValue;

    }

    if (changes.graphHeight){
      this.graphHeight = changes.graphHeight.currentValue;
    }
    this.createNetwork();
  }

  private createNetwork(): void {
    // TODO:
    // https://www.digitalocean.com/community/tutorials/detect-responsive-screen-sizes-in-angular
    // https://www.developintelligence.com/blog/2017/05/creating-network-diagrams-vis-js/

    if (!this.el)
      return;

    new Network(
      this.el.nativeElement,
      this.memoryService.query(this.searchPhrase),
      {
        //height: Math.round(window.innerHeight * 0.7) + 'px',
        height: this.graphHeight + 'px',
        autoResize: true,
        //width: "1800px",
        // needed for bigger graphs
        // TODO: activate on smaller graphs
        // - find a sane number of nodes
        physics: {
          stabilization: false
        }
      });
  }
}
