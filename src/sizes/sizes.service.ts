import { Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { getAuthTokenSingleton, getSpreadSheetValues } from '../integration/googleapis/googleSheetsService';
import { Size } from './entities/size.entity';
@Injectable()
export class SizesService {
  create(createSizeDto: CreateSizeDto) {
    return 'This action adds a new size';
  }

  async findAll() {
    const auth = await getAuthTokenSingleton();
    const sheetName = "Sizes";
    const spreadsheetId = '11M1E13R23KS0udJ0i8p-Zq8V2jm1aZ8bjLjhkyKNOHI';
    const response = await getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth,
    });
    const sizes: Size[] = [];
    for (let i = 1; i < response.length; i++) {
      const size = new Size();
      size.id = Number(response[i][0]);
      size.size = response[i][1];
      size.image = response[i][2];
      size.isShown = response[i][3] === '1';
      size.order = Number(response[i][4]);
      sizes.push(size);
    }
    return sizes.filter(size => size.isShown===true);
  }

  findOne(id: number) {
    return `This action returns a #${id} size`;
  }

  update(id: number, updateSizeDto: UpdateSizeDto) {
    return `This action updates a #${id} size`;
  }

  remove(id: number) {
    return `This action removes a #${id} size`;
  }
}
