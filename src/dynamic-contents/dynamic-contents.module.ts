import { Module } from '@nestjs/common';
import { DynamicContentsService } from './dynamic-contents.service';
import { DynamicContentsController } from './dynamic-contents.controller';

@Module({
  controllers: [DynamicContentsController],
  providers: [DynamicContentsService],
})
export class DynamicContentsModule {}
