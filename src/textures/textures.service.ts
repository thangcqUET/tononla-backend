import { Injectable } from '@nestjs/common';
import { CreateTextureDto } from './dto/create-texture.dto';
import { UpdateTextureDto } from './dto/update-texture.dto';
import {
  getAuthTokenSingleton,
  getSpreadSheetValues,
} from '../integration/googleapis/googleSheetsService';
import { Texture } from './entities/texture.entity';
@Injectable()
export class TexturesService {
  create(createTextureDto: CreateTextureDto) {
    return 'This action adds a new texture';
  }

  async findAll() {
    const auth = await getAuthTokenSingleton();
    const sheetName = 'Textures';
    const spreadsheetId = process.env.SPREAD_SHEET_ID;
    const response = await getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth,
    });
    const designs: Texture[] = [];
    for (let i = 1; i < response.length; i++) {
      const design = new Texture();
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
    return `This action returns a #${id} texture`;
  }

  update(id: number, updateTextureDto: UpdateTextureDto) {
    return `This action updates a #${id} texture`;
  }

  remove(id: number) {
    return `This action removes a #${id} texture`;
  }
}
