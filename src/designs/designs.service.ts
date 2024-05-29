import { Injectable } from '@nestjs/common';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';
import {
  getAuthTokenSingleton,
  getSpreadSheetValues,
} from '../integration/googleapis/googleSheetsService';
import { Design } from './entities/design.entity';

@Injectable()
export class DesignsService {
  create(createDesignDto: CreateDesignDto) {
    return 'This action adds a new design';
  }

  async findAll() {
    const auth = await getAuthTokenSingleton();
    const sheetName = 'Designs';
    const spreadsheetId = '11M1E13R23KS0udJ0i8p-Zq8V2jm1aZ8bjLjhkyKNOHI';
    const response = await getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth,
    });
    const designs: Design[] = [];
    for (let i = 1; i < response.length; i++) {
      const design = new Design();
      design.id = Number(response[i][0]);
      design.name = response[i][1];
      design.type = response[i][2];
      design.imageUrl = response[i][3];
      design.isShown = response[i][4] === '1';
      design.order = Number(response[i][5]);
      designs.push(design);
    }
    return designs.filter((design) => design.isShown === true);
  }

  findOne(id: number) {
    return `This action returns a #${id} design`;
  }

  update(id: number, updateDesignDto: UpdateDesignDto) {
    return `This action updates a #${id} design`;
  }

  remove(id: number) {
    return `This action removes a #${id} design`;
  }
}
