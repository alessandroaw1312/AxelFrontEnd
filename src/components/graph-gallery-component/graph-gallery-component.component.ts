import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Location, NgClass, NgForOf, NgIf} from "@angular/common";
import {GraphService} from "../../services/graph.service";
import {FormsModule} from "@angular/forms";
import {GraphEdge, GraphNode, kg} from "../../modules/Graph";
import {D3GraphComponent} from "../d3-graph/d3-graph.component";


@Component({
  selector: 'app-graph-gallery-component',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    D3GraphComponent,
    NgClass
  ],
  templateUrl: './graph-gallery-component.component.html',
  styleUrl: './graph-gallery-component.component.css'
})
export class GraphGalleryComponentComponent implements OnInit {

  constructor(private location: Location, private graphService: GraphService) {}

  gotUserGraphs: kg[] = []
  visualizeGraph = false
  selectedGraphId = ""

  ngOnInit() {
    // Call the service to get graphs by user ID
    this.graphService.getGraphsByUserId("1234").subscribe((data) => {
      this.gotUserGraphs = data
    });
  }


  logMe(from: string, data: any) {
  }

  goBack() {
    this.location.back();
  }


  openGraph(graphId: string) {
    this.visualizeGraph = true
    this.selectedGraphId = graphId
  }
}
