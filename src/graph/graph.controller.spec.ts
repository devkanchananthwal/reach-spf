import { Test, TestingModule } from '@nestjs/testing';
import { GraphController } from './graph.controller';
import { GraphService } from './graph.service';
import { GraphQueryDto } from './graph.dto';

describe('GraphController', () => {
  let graphController: GraphController;
  let graphService: GraphService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GraphController],
      providers: [
        {
          provide: GraphService,
          useValue: {
            findShortestPath: jest.fn(),
          },
        },
      ],
    }).compile();

    graphController = module.get<GraphController>(GraphController);
    graphService = module.get<GraphService>(GraphService);
  });

  describe('findShortestPath', () => {
    it('should return expected shortest path object', async () => {
      const query: GraphQueryDto = {
        startNode: 'T/2345',
        endNode: 'T/0031',
      };

      const mockResult = {
        success: true,
        statusCode: 200,
        data: [
          { node: 'T/2345', classification: 'Transceiver' },
          { node: 'Bartrum-X5', classification: 'Link' },
          { node: 'M60', classification: 'Fibre' },
          { node: 'Matfold-A4', classification: 'Link' },
          { node: 'T/0031', classification: 'Transceiver' },
        ],
      };

      jest
        .spyOn(graphService, 'findShortestPath')
        .mockResolvedValue(mockResult);

      const result = await graphController.findShortestPath(query);

      expect(result).toEqual(mockResult);
      expect(graphService.findShortestPath).toHaveBeenCalledWith('T/2345', 'T/0031');
    });
  });
});
