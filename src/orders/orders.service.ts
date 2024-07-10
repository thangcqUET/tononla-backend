import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  getAuthTokenSingleton,
  appendValues,
} from '../integration/googleapis/googleSheetsService';
@Injectable()
export class OrdersService {
  async create(createOrderDto: CreateOrderDto) {
    const authToken = await getAuthTokenSingleton();
    const createdAt = new Date();
    //convert to timezone +7
    createdAt.setHours(createdAt.getHours() + 7);
    const values = [
      [
        createdAt.getTime(),
        createOrderDto.name,
        createOrderDto.phoneNumber,
        createOrderDto.email,
        createOrderDto.qualityId,
        createOrderDto.sizeId,
        createOrderDto.designId,
        createOrderDto.note,
        createdAt,
      ],
    ];
    await appendValues({
      spreadsheetId: process.env.SPREAD_SHEET_ID,
      range: 'Orders!A2',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      auth: authToken,
      values: values,
    });
    return 'This action adds a new order ' + JSON.stringify(createOrderDto);
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
