import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TenancyService } from './tenancy.service';
import { CreateTenancyDto } from './dto/create-tenancy.dto';
import { UpdateTenancyDto } from './dto/update-tenancy.dto';

@Controller('tenancy')
export class TenancyController {
  constructor(private readonly tenancyService: TenancyService) {}

  @Post()
  create(@Body() createTenancyDto: CreateTenancyDto) {
    return this.tenancyService.create(createTenancyDto);
  }

  @Get()
  findAll() {
    return this.tenancyService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.tenancyService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTenancyDto: UpdateTenancyDto,
  ) {
    return this.tenancyService.update(id, updateTenancyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenancyService.remove(+id);
  }
}
