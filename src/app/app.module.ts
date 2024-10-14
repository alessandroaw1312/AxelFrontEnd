import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { D3GraphComponent } from '../components/d3-graph/d3-graph.component';
import { MatDialogModule } from '@angular/material/dialog';
import {GraphCreatedDialogComponent} from "../components/graph-created-dialog/graph-created-dialog.component"; // Import MatDialogModule

@NgModule({
  declarations: [],

  imports: [
    BrowserModule,
    D3GraphComponent,
    CommonModule,
    GraphCreatedDialogComponent
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],

})
export class AppModule { }
