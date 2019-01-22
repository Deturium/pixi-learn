declare module '@my/data' {
  export interface Node {
    id: number
    index: number
    x: number
    y: number
    vx: number
    vy: number
  }

  export interface Link {
    id: number
    source: Node
    target: Node
    strength: number
    index: number
  }

  export interface TimeInfo {
    timestamp: string
    nodes: number[]
    links: number[]
  }
}
