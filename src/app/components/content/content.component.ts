import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { MemoryService } from '../../services/memory.service';

import { Memory } from '../../models/memory';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit, AfterViewInit {

  @ViewChild('memory') el: ElementRef;

  private memory: Memory;

  constructor(
    private route: ActivatedRoute,
    private memoryService: MemoryService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id; 

   this.memory = this.memoryService.getById(id);
   
  }

  ngAfterViewInit(): void {
   this.el.nativeElement.innerHTML =  this.memory.content;

  }
}
