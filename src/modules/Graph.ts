export class kg {
  graph_id: string = ""
  topic: string = ""
  summary: string = ""
  nodes: GraphNode[] = []
  edges: GraphEdge[] = []
}


export class GraphNode {
  entity: string = ""
}

export class GraphEdge {
  head: string = ""
  tail: string = ""
  relation: string = ""
  source: string = ""
  usage_weight: number = 0.0
}

