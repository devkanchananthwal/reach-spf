import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { parseStringPromise } from 'xml2js';
import { GRAPH_CONSTANT } from '../constants';
import { Logger } from 'winston';
import { WinstonLoggerService } from '../logger.service'; // Import the custom logger service

interface GraphData {
  nodes: { [key: string]: string };
  edges: { [key: string]: string[] };
}

@Injectable()
export class GraphService {

    constructor(private readonly logger: WinstonLoggerService) {} // Inject the custom logger


  async findShortestPath(startNode: string, endNode: string) {
    try {

      const filePath = path.join(__dirname, '..', '..', GRAPH_CONSTANT.FILE_PATH);
      const xmlData = await fs.readFile(filePath, 'utf-8');
      if (!xmlData) {
        return new NotFoundException('No File Data Found');
      }

      let parsedData;
      try {
        parsedData = await parseStringPromise(xmlData);
      } catch (error) {
        throw new InternalServerErrorException('XML Parsing Failed');
      }

      const graphData = this.formatGraphData(parsedData);

      const shortestPath = this.findPath(graphData, startNode, endNode);
      if (!shortestPath) {
        return new NotFoundException();
      }

      return this.formatOutput(shortestPath, graphData);

    } catch (error) {
      // Log the error to the Winston log files
      this.logger.error(`Error occurred: ${error.message}`,error);

      if (error instanceof InternalServerErrorException || error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  formatGraphData = (parsedXML: any): GraphData => {
    const graph: GraphData = { nodes: {}, edges: {} };

    parsedXML.topology.entities[0].class.forEach((cls: any) => {
      const classification = cls.$.key;
      cls.entity.forEach((ent: any) => {
        const key = ent.$.key;
        graph.nodes[key] = classification;
        graph.edges[key] = [];
      });
    });

    parsedXML.topology.associations[0].association.forEach((assoc: any) => {
      const from = assoc.$.primary;
      const to = assoc.$.secondary;
      if (!graph.edges[from]) graph.edges[from] = [];
      graph.edges[from].push(to);
    });

    return graph;
  };

  findPath = (graph: GraphData, startNode: string, endNode: string): string[] | null => {
    const queue: string[][] = [[startNode]];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const currentPath = queue.shift();
      if (!currentPath) continue;

      const node = currentPath[currentPath.length - 1];
      if (node === endNode) return currentPath;

      if (!visited.has(node)) {
        visited.add(node);
        (graph.edges[node] || []).forEach(neighbor => {
          queue.push([...currentPath, neighbor]);
        });
      }
    }

    return null;
  };

  formatOutput = (path: string[], graph: GraphData): object => {
    const pathInfo = path.map(node => ({
      node,
      classification: graph.nodes[node] || "Unknown"
    }));

    const output ={
        success: true,
        statusCode: 200,
        data: pathInfo,
      };

    this.logger.log(JSON.stringify(output))
    return output
    
  };
}
