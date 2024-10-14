import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog

@Component({
  selector: 'app-new-graph',
  standalone: true,
  imports: [
    DocumentTextInputComponent,
    NgIf,
    FormsModule
  ],
  templateUrl: './new-graph.component.html',
  styleUrl: './new-graph.component.css'
})

export class NewGraphComponent implements OnInit {
  constructor(private location: Location, private graphService: GraphService, private dialog: MatDialog) {}

  ngOnInit(): void {
  }

  showInputText = true
  showSelectDocument = false
  aiGeneration = false
  documentTextInput: string = ''
  topicTextInput: string = ''
  summaryTextInput: string = ''
  loading = false

  goBack() {
    this.location.back();
  }

  enableAiGeneration() {
    this.aiGeneration = !this.aiGeneration
  }


  enableInputText() {
    this.showInputText = true
    this.showSelectDocument = false
  }

  enableDocumentSelection() {
    this.showSelectDocument = true
    this.showInputText = false
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reset height to auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
  }


  enableGraphProduction() {
    return ((this.aiGeneration && this.documentTextInput.length > 0) || (!this.aiGeneration && this.documentTextInput.length > 0 && this.topicTextInput.length > 0 && this.summaryTextInput.length > 0))
  }


  generateGraph() {
    this.loading = true
    if (this.aiGeneration) {
      this.summaryTextInput = ""
      this.topicTextInput = ""
    }
    this.graphService.generateGraph("1234", this.documentTextInput, this.topicTextInput, this.summaryTextInput).subscribe(data => {
      this.resetPage()
    });
    this.resetPage()
  }

  resetPage() {
    this.showInputText = true
    this.showSelectDocument = false
    this.aiGeneration = false
    this.documentTextInput = ''
    this.topicTextInput = ''
    this.summaryTextInput = ''
    this.loading = false
    this.dialog.open(GraphCreatedDialogComponent);
  }

  logMe(from: string, data: any) {
  }
}
import {Location, NgIf} from '@angular/common';

import {DocumentTextInputComponent} from "../document-text-input/document-text-input.component";
import {FormsModule} from "@angular/forms";
import {GraphService} from "../../services/graph.service";
import {GraphCreatedDialogComponent} from "../graph-created-dialog/graph-created-dialog.component";
