import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';
import {
  getAuthTokenSingleton,
  getSpreadSheetValues,
  appendValues,
} from '../integration/googleapis/googleSheetsService';
import { Design } from './entities/design.entity';

@Injectable()
export class DesignsService {
  async create(createDesignDto: CreateDesignDto) {
    // add a new design
    const authToken = await getAuthTokenSingleton();
    const createdAt = new Date();
    //convert to timezone +7
    createdAt.setHours(createdAt.getHours() + 7);
    //verify createDesignDto.data is a valid JSON
    try {
      JSON.parse(createDesignDto.data);
    } catch (error) {
      throw new HttpException('data is not a valid JSON', HttpStatus.BAD_REQUEST);
    }
    const values = [
      [
        createdAt.getTime(),
        createDesignDto.name,
        createDesignDto.type=="build-in"?'build-in':'custom',
        createDesignDto.group,
        createDesignDto.description,
        createDesignDto.data,
        createDesignDto.order,
        createDesignDto.isShown===true?'1':'0',
        createdAt,
      ],
    ];
    await appendValues({
      spreadsheetId: process.env.SPREAD_SHEET_ID,
      range: 'Designs!A2',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      auth: authToken,
      values: values,
    });
    return 'This action adds a new design ' + JSON.stringify(createDesignDto);
  }

  async findAll() {
    const auth = await getAuthTokenSingleton();
    const sheetName = 'Designs';
    const spreadsheetId = process.env.SPREAD_SHEET_ID;
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
      design.group = response[i][3];
      design.description = response[i][4];
      design.data = response[i][5];
      design.order = Number(response[i][6]);
      design.isShown = response[i][7] == '1';
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
