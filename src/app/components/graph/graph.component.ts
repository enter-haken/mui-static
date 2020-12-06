import { Component, ViewChild, Input, ElementRef, SimpleChanges } from '@angular/core';

import { Router } from '@angular/router';
import { Network } from 'vis';

import { MemoryService } from '../../services/memory.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent {

  @Input() searchPhrase: string;
  @Input() graphHeight: number;

  constructor(private memoryService: MemoryService, private router: Router) {
  }

  @ViewChild('network') el: ElementRef;

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
    if (!this.el)
      return;

    let network = new Network(
      this.el.nativeElement,
      this.memoryService.query(this.searchPhrase),
      {
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

      network.on('click', (params) => {
        if (params && params.nodes && params.nodes.length === 1) {
          this.openDetails(params.nodes[0]);
        } else {
          console.log('non node element clicked');
        }
      });
  }

  openDetails(id: string): void {
    this.router.navigate(['/content',id]);
  }
}
