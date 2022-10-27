import { Module, Global } from '@nestjs/common';
import { BootstrapService } from './bootstrap.service';
import { DatabaseService } from './database.service';
import { GlobalService } from './global.service';


@Global()
@Module({
  providers: [GlobalService, ...DatabaseService, BootstrapService],
  exports: [GlobalService, ...DatabaseService],
})
export class GlobalModule {}