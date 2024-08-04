import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
// import { DesignsModule } from './deprecated_designs/designs.module';
import { SizesModule } from './sizes/sizes.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { TexturesModule } from './textures/textures.module';
import { DesignsModule } from './designs/designs.module';

@Module({
  imports: [
    OrdersModule,
    DesignsModule,
    SizesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({ env: process.env })],
    }),
    ProductsModule,
    TexturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
