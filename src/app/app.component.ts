import { Component } from '@angular/core';
import { D3GraphComponent } from '../components/d3-graph/d3-graph.component';
import {SidebarComponentComponent} from "../components/sidebar-component/sidebar-component.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [D3GraphComponent, SidebarComponentComponent, RouterOutlet] // Import D3GraphComponent here
})
export class AppComponent { }
