import { Injectable } from '@nestjs/common';
import { CreateDynamicContentDto } from './dto/create-dynamic-content.dto';
import { UpdateDynamicContentDto } from './dto/update-dynamic-content.dto';
import {
  getAuthTokenSingleton,
  getSpreadSheetValues,
  appendValues,
} from '../integration/googleapis/googleSheetsService';
import { DynamicContent } from './entities/dynamic-content.entity';

@Injectable()
export class DynamicContentsService {
  create(createDynamicContentDto: CreateDynamicContentDto) {
    return 'This action adds a new dynamicContent';
  }

  async findAll() {
    const auth = await getAuthTokenSingleton();
    const sheetName = 'Dynamic contents';
    const spreadsheetId = process.env.SPREAD_SHEET_ID;
    const response = await getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth,
    });
    const dynamicContents: DynamicContent[] = [];
    for (let i = 1; i < response.length; i++) {
      const dynamicContent = new DynamicContent();
      dynamicContent.id = Number(response[i][0]);
      dynamicContent.name = response[i][1];
      dynamicContent.key = response[i][2];
      dynamicContent.value = response[i][3];
      dynamicContents.push(dynamicContent);
    }
    return dynamicContents;
  }

  findOne(id: number) {
    return `This action returns a #${id} dynamicContent`;
  }

  update(id: number, updateDynamicContentDto: UpdateDynamicContentDto) {
    return `This action updates a #${id} dynamicContent`;
  }

  remove(id: number) {
    return `This action removes a #${id} dynamicContent`;
  }
}
