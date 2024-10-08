import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import {
  getAuthTokenSingleton,
  getSpreadSheetValues,
} from '../integration/googleapis/googleSheetsService';
import { Template } from './entities/template.entity';

@Injectable()
export class TemplatesService {
  create(createTemplateDto: CreateTemplateDto) {
    return 'This action adds a new template';
  }

  async findAll() {
    const auth = await getAuthTokenSingleton();
    const sheetName = 'Templates';
    const spreadsheetId = process.env.SPREAD_SHEET_ID;
    const response = await getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth,
    });
    const templates: Template[] = [];
    for (let i = 1; i < response.length; i++) {
      const template = new Template();
      template.id = Number(response[i][0]);
      template.name = response[i][1];
      template.designData = response[i][2];
      template.imageUrl = response[i][3];
      template.isShown = response[i][4] === '1';
      template.order = Number(response[i][5]);
      template.thumbnailUrl = response[i][6] || response[i][3];
      templates.push(template);
    }
    return templates.filter((template) => template.isShown === true).sort((a, b) => a.order - b.order);
  }

  async findOne(id: number) {
    const auth = await getAuthTokenSingleton();
    const sheetName = 'Templates';
    const spreadsheetId = process.env.SPREAD_SHEET_ID;
    const response = await getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth,
    });
    //filter by id
    const template = new Template();
    for (let i = 1; i < response.length; i++) {
      if (Number(response[i][0]) === id) {
        template.id = Number(response[i][0]);
        template.name = response[i][1];
        template.designData = response[i][2];
        template.imageUrl = response[i][3];
        template.isShown = response[i][4] === '1';
        template.order = Number(response[i][5]);
        template.thumbnailUrl = response[i][6] || response[i][3];
        break;
      }
    }
    return template;
  }

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return `This action updates a #${id} template`;
  }

  remove(id: number) {
    return `This action removes a #${id} template`;
  }
}
