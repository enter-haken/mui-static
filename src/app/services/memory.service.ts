import { Injectable } from '@angular/core';

import { Data, Node, Edge } from 'vis';

import { TestData } from '../../assets/testData.json';
import { Memory, Link } from '../models/memory';

import { List } from 'linqts';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {

  constructor() { }

  public query(query?: string): Data {
    const memories = new List<Memory>(<Memory[]>(<unknown>TestData));

    if (!query)
      return {
        nodes: this.getVisNodes(memories).ToArray(),
        edges: this.getVisEdges(memories).ToArray()
      }

      let foundNodes = memories.Where(x => x.markdown.toLowerCase().indexOf(query.toLowerCase()) >= 0)
      let neighbours = this.getNodes(
        memories,
        this.getNodeIdsFromNeighbourNodes(foundNodes));

        let linkedNodes = this.getLinkedNodes(memories, foundNodes);

        let nodes = foundNodes
        .Union(neighbours)
        .Union(linkedNodes);

        return {
          nodes: this.getVisNodes(nodes).ToArray(),
          edges: this.getVisEdges(nodes).ToArray()
        }
  }

  public getById(id: string): Memory {
    const memories = new List<Memory>(<Memory[]>(<unknown>TestData));

    return memories.SingleOrDefault(x => x.meta.id == id);
  }

  private getVisNodes(nodes: List<Memory>): List<Node> {
    return nodes.Select(x => this.getNode(x))
  }

  private getVisEdges(nodes: List<Memory>): List<Edge> {
    return nodes
    .Where(x => x.meta.links != null)
    .SelectMany(x => new List<Link>(x.meta.links))
    .Select(x => <Edge>{from: x.source_id, to: x.target_id})
    .Distinct()
  }

  private getNode(memory: Memory): Node {
    let titleWithLineBreakAfterThreeWords = memory.meta.title.split(' ')
    .reduce((acc, current, id) => {
      if (id && (id+1)%3 === 1) {
        return [...acc,  "\n", current]
      } else return [...acc, current]
    }, []).join(' ');

  return <Node>{
    id: memory.meta.id,
    label: titleWithLineBreakAfterThreeWords,
    shape: "box"
  }
  }

  private getNodeIdsFromNeighbourNodes(memories: List<Memory>) : List<string> {
    return memories.Where(x => x.meta.links != null)
    .SelectMany(x => new List<Link>(x.meta.links))
    .Select(x => x.target_id)
    .Distinct();
  }

  private getLinkedNodes(allNodes: List<Memory>, foundNodes: List<Memory>) : List<Memory> {
    let ids = foundNodes.Select(x => x.meta.id);

    return allNodes.Where(x => x.meta.links != null)
    .Where(x => this.isLinked(new List<Link>(x.meta.links), ids));
  }

  private isLinked(links: List<Link>, idsToCheck: List<string>): boolean {
    return links.Any(x => idsToCheck.Any(idToCheck => x.target_id == idToCheck));
  }

  private getNodes(nodes: List<Memory>, nodeIds: List<string>): List<Memory> {
    return nodes.Where(memory => nodeIds.Any(id => memory.meta.id == id))
  }
}
