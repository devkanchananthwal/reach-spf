
import { Controller, Get, Query } from '@nestjs/common';
import { GraphService } from '../graph/graph.service';
import { GraphQueryDto } from './graph.dto';


@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get('shortest-path')
  findShortestPath(@Query() query: GraphQueryDto) {
    return this.graphService.findShortestPath(query.startNode, query.endNode);
  }
}