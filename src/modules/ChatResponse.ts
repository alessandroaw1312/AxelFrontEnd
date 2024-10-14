import {GraphEdge, GraphNode} from "./Graph";

export class ChatResponse {
  llm_res: string = ""
  context: string = ""
  nodes: GraphNode[] = []
  edges: GraphEdge[] = []
}


// {"llm_res": llm_result, "context": got_context, "nodes": visited_nodes, "edges": visited_edges}
