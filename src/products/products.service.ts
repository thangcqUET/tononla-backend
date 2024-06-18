import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  getAuthTokenSingleton,
  getSpreadSheetValues,
} from '../integration/googleapis/googleSheetsService';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll() {
    const auth = await getAuthTokenSingleton();
    const sheetName = 'Products';
    const spreadsheetId = '11M1E13R23KS0udJ0i8p-Zq8V2jm1aZ8bjLjhkyKNOHI';
    const response = await getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth,
    });
    const products: Product[] = [];
    for (let i = 1; i < response.length; i++) {
      const product = new Product();
      product.id = Number(response[i][0]);
      product.name = response[i][1];
      product.type = response[i][2];
      product.imageUrl = response[i][3];
      product.isShown = response[i][4] === '1';
      product.order = Number(response[i][5]);
      product.quantity = Number(response[i][6]);
      product.price = Number(response[i][7]);
      product.compareAtPrice = Number(response[i][8]);
      product.unit = response[i][9];
      product.description = response[i][10];
      products.push(product);
    }
    return products.filter((product) => product.isShown === true);
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
