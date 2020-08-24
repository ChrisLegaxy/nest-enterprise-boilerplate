import { PageOptionsDto } from './PageOptionsDto';

interface IPageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

export class PageMetaDto {
  readonly page: number;

  readonly size: number;

  readonly totalEntries: number;

  readonly totalPages: number;

  constructor({ pageOptionsDto, itemCount }: IPageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.size = pageOptionsDto.take;
    this.totalEntries = itemCount;
    this.totalPages = Math.ceil(itemCount / this.size);
  }
}
