import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar-component',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-component.component.html',
  styleUrl: './sidebar-component.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponentComponent {

  constructor(private router: Router) {}

  createNewGraph() {
    this.router.navigate(['/new-graph']);
  }

  openGraphs() {
    this.router.navigate(['/graph-gallery']);
  }

  openChat() {
    this.router.navigate(['/chat']);
  }
}
