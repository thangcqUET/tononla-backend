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
    const textures: Texture[] = [];
    for (let i = 1; i < response.length; i++) {
      const texture = new Texture();
      texture.id = Number(response[i][0]);
      texture.name = response[i][1];
      texture.type = response[i][2];
      texture.imageUrl = response[i][3];
      texture.isShown = response[i][4] === '1';
      texture.order = Number(response[i][5]);
      texture.thumbnailUrl = response[i][6] || response[i][3];
      texture.minScale = Number(response[i][7]) || 5;
      texture.maxScale = Number(response[i][8]) || 10;
      textures.push(texture);
    }
    return textures.filter((texture) => texture.isShown === true).sort((a, b) => a.order - b.order);
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
