import { Routes } from '@angular/router';
import {NewGraphComponent} from "../components/new-graph/new-graph.component";
import {WelcomePageComponent} from "../components/welcome-page/welcome-page.component";
import {GraphGalleryComponentComponent} from "../components/graph-gallery-component/graph-gallery-component.component";
import {ChatComponentComponent} from "../components/chat-component/chat-component.component";

export const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'new-graph', component: NewGraphComponent },
  { path: 'graph-gallery', component: GraphGalleryComponentComponent },
  { path: 'chat', component: ChatComponentComponent },
];

