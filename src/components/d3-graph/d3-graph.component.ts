import {Component, OnInit, ElementRef, HostListener, Input, Output, EventEmitter} from '@angular/core';
import * as d3 from 'd3';
import { SimulationNodeDatum } from 'd3';
import { GraphService } from "../../services/graph.service";
import {kg} from "../../modules/Graph";

interface Node extends SimulationNodeDatum {
  name: string;
}

interface Link {
  source: Node | string;
  target: Node | string;
}

@Component({
  selector: 'app-d3-graph',
  templateUrl: './d3-graph.component.html',
  styleUrls: ['./d3-graph.component.css'],
  standalone: true
})
export class D3GraphComponent implements OnInit {

  public width: number;
  public height: number;
  private simulation!: d3.Simulation<Node, Link>;

  constructor(private el: ElementRef, private graphService: GraphService) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  @Input() graphId: string | undefined = ""
  @Output() closeGraphEmitter= new EventEmitter<boolean>

  ngOnInit(): void {
    if (this.graphId !== undefined) {
      this.generateGraph(this.graphId)
    }
  }

  generateGraph(graphId: string ) {
    if (this.graphId !== "") {
      this.graphService.getGraphById(graphId).subscribe(data => {
        this.createGraph(data.nodes, data.links);
      });
    }
  }

  private createGraph(nodes: Node[], links: Link[]) {
    const svg = d3.select(this.el.nativeElement).select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    this.simulation = d3.forceSimulation<Node>(nodes)
      .force('link', d3.forceLink<Node, Link>(links)
        .id((d: Node) => d.name)
        .distance(100)
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .alphaDecay(0.065);

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', '#999')
      .attr('stroke-width', 1.5);

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', 10)
      .attr('fill', '#69b3a2')
      .call(
        d3.drag<SVGCircleElement, Node>()
          .on('start', (event, d) => this.dragstarted(event, d))
          .on('drag', (event, d) => this.dragged(event, d))
          .on('end', (event, d) => this.dragended(event, d))
      )
      .on('mouseover', (event, d) => this.handleMouseOver(event, d, link))
      .on('mouseout', (event, d) => this.handleMouseOut(event, d, link));

    const nodeLabels = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .enter().append('text')
      .attr('class', 'node-label')
      .attr('text-anchor', 'middle')
      .attr('dy', -15) // Offset the label above the node circle
      .text(d => d.name);

    this.simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => (d.source as Node).x ?? 0)
        .attr('y1', (d: any) => (d.source as Node).y ?? 0)
        .attr('x2', (d: any) => (d.target as Node).x ?? 0)
        .attr('y2', (d: any) => (d.target as Node).y ?? 0);

      node
        .attr('cx', (d: Node) => d.x ?? 0)
        .attr('cy', (d: Node) => d.y ?? 0);

      nodeLabels
        .attr('x', (d: Node) => d.x ?? 0)
        .attr('y', (d: Node) => d.y ?? 0);
    });

    this.simulation.on('end', () => {
      nodes.forEach(d => {
        d.fx = d.x;
        d.fy = d.y;
      });
    });
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    d3.select(this.el.nativeElement).select('svg')
      .attr('width', this.width)
      .attr('height', this.height);
    this.simulation.force('center', d3.forceCenter(this.width / 2, this.height / 2));
  }

  private dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Node>, d: Node) {
    if (!event.active) {
      this.simulation.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
  }

  private dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>, d: Node) {
    d.fx = event.x;
    d.fy = event.y;
  }

  private dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Node>, d: Node) {
    if (!event.active) {
      this.simulation.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
  }

  private handleMouseOver(event: MouseEvent, d: Node, link: d3.Selection<SVGLineElement, Link, SVGGElement, unknown>) {
    const target = event.currentTarget as SVGCircleElement;

    d3.select(target)
      .transition()
      .duration(200)
      .attr('r', 15);

    link
      .attr('stroke', l => (l.source === d || l.target === d) ? '#ff0000' : '#999')
      .attr('stroke-width', l => (l.source === d || l.target === d) ? 3 : 1.5);
  }

  private handleMouseOut(event: MouseEvent, d: Node, link: d3.Selection<SVGLineElement, Link, SVGGElement, unknown>) {
    const target = event.currentTarget as SVGCircleElement;

    d3.select(target)
      .transition()
      .duration(200)
      .attr('r', 10);

    link
      .attr('stroke', '#999')
      .attr('stroke-width', 1.5);
  }

  closeGraph() {
    this.closeGraphEmitter.emit(true)
  }

}
