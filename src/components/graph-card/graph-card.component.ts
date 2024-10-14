import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {kg} from "../../modules/Graph";
import {NgForOf} from "@angular/common";
import {SearchBarComponent} from "../search-bar/search-bar.component";

@Component({
  selector: 'app-graph-card',
  standalone: true,
  imports: [
    NgForOf,
    SearchBarComponent
  ],
  templateUrl: './graph-card.component.html',
  styleUrl: './graph-card.component.css'
})
export class GraphCardComponent implements OnInit {
  @Input() gotUserGraphs: kg[] = []
  @Output() selectedGraphToUse= new EventEmitter<kg>


  ngOnInit() {
  }

  selectGraphToUse(graph: kg) {
    this.selectedGraphToUse.emit(graph)
  }
}
