import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-graph-created-dialog',
  standalone: true,
  imports: [],
  templateUrl: './graph-created-dialog.component.html',
  styleUrl: './graph-created-dialog.component.css'
})
export class GraphCreatedDialogComponent {
  constructor(private dialogRef: MatDialogRef<GraphCreatedDialogComponent>, private router: Router) {}

  onClose(): void {
    this.dialogRef.close();
  }

  navigateToGraphs(): void {
    this.router.navigate(['/graph-gallery']); // Navigate to the Graphs page
    this.onClose(); // Optionally close the dialog after navigation
  }

}
