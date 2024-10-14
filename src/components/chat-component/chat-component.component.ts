import {Component, OnInit} from '@angular/core';
import {Location, NgClass, NgForOf, NgIf} from "@angular/common";
import {GraphService} from "../../services/graph.service";
import {GraphEdge, GraphNode, kg} from "../../modules/Graph";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {GraphCardComponent} from "../graph-card/graph-card.component";
import {D3GraphComponent} from "../d3-graph/d3-graph.component";
import {User} from "../../modules/User";
import {FormsModule} from "@angular/forms";
import {Message} from "../../modules/Messages";

@Component({
  selector: 'app-chat-component',
  standalone: true,
  imports: [
    SearchBarComponent,
    NgForOf,
    GraphCardComponent,
    NgIf,
    D3GraphComponent,
    FormsModule,
    NgClass
  ],
  templateUrl: './chat-component.component.html',
  styleUrl: './chat-component.component.css'
})
export class ChatComponentComponent implements OnInit {

  gotUserGraphs: kg[] = []
  showGraphToUse = false
  graphToUse: kg | undefined
  myUser: User = new User()
  inputField: string = ""
  userMessage: Message = new Message()
  usedGraphId: string = ""
  llmRes: Message = new Message("BOT", "")
  gotContext: string = ""
  visitedNodes: GraphNode[] = []
  visitedEdges: GraphEdge[] = []
  messages: Message[] = []

  constructor(private location: Location, private graphService: GraphService) {
  }

  ngOnInit() {
    this.graphService.getGraphsByUserId(this.myUser.user_id).subscribe((data) => {
      this.gotUserGraphs = data
    });
  }

  goBack() {
    this.location.back();
  }

  onGraphSelected($event: kg) {
    this.graphToUse = $event
    this.usedGraphId = this.graphToUse.graph_id
    this.showGraphToUse = true;
  }

  onGraphClosed($event: boolean) {
    this.graphToUse = undefined
    this.showGraphToUse = false;
  }

  pushMessage(message: Message) {
    this.messages.push(message)
  }

  showContext(gotContext: string) {
    this.gotContext = gotContext;
  }

  updateGraphView(visitedNodes: GraphNode[], visitedEdges: GraphEdge[]) {
    console.log("+++ USED NODES", visitedNodes)
    console.log("+++ USED EDGES", visitedEdges)
  }

  sendMessage() {
    if (this.inputField.length > 0) {

      console.log("SENDING MESSAGE VALUES",
        "GRAPH ID", this.usedGraphId,
        "USER MESSAGE", this.userMessage,
      )
      this.userMessage.content = this.inputField
      this.inputField = ""
      this.pushMessage(new Message("USER", this.userMessage.content))
      this.graphService.executeChatSystem(this.userMessage.content, this.usedGraphId, "1234").subscribe((data) => {
        console.log("++++ AAAAA +++ GOT RESPONSE:", data)
        this.llmRes.content = data.llm_res;
        this.gotContext = data.context;
        this.visitedNodes = data.nodes;
        this.visitedEdges = data.edges
        this.pushMessage(new Message("BOT", this.llmRes.content))
        this.showContext(this.gotContext)
        this.updateGraphView(this.visitedNodes, this.visitedEdges)
      });
    }
  }
}
