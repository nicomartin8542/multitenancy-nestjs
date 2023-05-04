import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTenancyDto } from './dto/create-tenancy.dto';
import { UpdateTenancyDto } from './dto/update-tenancy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenancy } from './entities/tenancy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TenancyService {
  private logger = new Logger('Tencancy Service');

  constructor(
    @InjectRepository(Tenancy)
    private readonly tenancyRepository: Repository<Tenancy>,
  ) {}

  async create(createTenancyDto: CreateTenancyDto) {
    try {
      const tenancy = this.tenancyRepository.create(createTenancyDto);
      await this.tenancyRepository.save(tenancy);
      return tenancy;
    } catch (error) {
      this.handleExcepcion(error);
    }
  }

  async findAll() {
    return await this.tenancyRepository.find({});
  }

  async findOne(term: string) {
    let tenancy: Tenancy;

    //Valido si es un uuid
    this.handleUuidValid(term)
      ? (tenancy = await this.tenancyRepository.findOneBy({ id: term }))
      : (tenancy = await this.tenancyRepository.findOneBy({ name: term }));

    if (!tenancy) throw new NotFoundException('Tanancy not found!');

    return tenancy;
  }

  async update(id: string, updateTenancyDto: UpdateTenancyDto) {
    const { name } = updateTenancyDto;

    const tenancyUpd = await this.tenancyRepository.preload({
      id,
      name,
    });

    if (!tenancyUpd)
      throw new NotFoundException(`Tenancy not fouan with id: ${id}`);
    return await this.tenancyRepository.save(tenancyUpd);
  }

  remove(id: number) {
    return `This action removes a #${id} tenancy`;
  }

  private handleUuidValid(term: string): boolean {
    const isUuidValid = RegExp(
      /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/,
    );

    return isUuidValid.test(term);
  }

  private handleExcepcion(error: any): never {
    this.logger.error(error.sqlMessage ? error.sqlMessage : error);
    if (error.code === '23505') throw new BadRequestException(error);
    if (error.code === 'ER_DUP_ENTRY')
      throw new BadRequestException(error.sqlMessage);
    throw new InternalServerErrorException(
      'Error internal server, checks logs!',
    );
  }
}
