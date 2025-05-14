// src/graph/dto/path-query.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class GraphQueryDto {
  @IsString()
  @IsNotEmpty()
  startNode: string;

  @IsString()
  @IsNotEmpty()
  endNode: string;
}
