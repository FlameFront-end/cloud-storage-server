import { Injectable } from '@nestjs/common'
import { FileEntity, FileType } from './entities/file.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>
  ) {}

  findAll(userId: number, fileType: FileType) {
    const qb = this.repository.createQueryBuilder('file')

    qb.where('file.userId = :userId', { userId })

    if (fileType === FileType.PHOTOS) {
      qb.andWhere('file.mimetype ILIKE :type', { type: '%image%' })
    }

    if (fileType === FileType.TRASH) {
      qb.withDeleted().andWhere('file.deleteAt IS NOT NULL')
    }

    return qb.getMany()
  }

  async create(file: Express.Multer.File, userId: number) {
    return this.repository.save({
      fileName: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: { id: userId }
    })
  }

  async remove(userId: number, ids: string) {
    const idsArray = ids.split(',')

    const qb = this.repository.createQueryBuilder('file')

    qb.where('id IN (:...ids) AND userId = :userId', {
      ids: idsArray,
      userId
    })

    return qb.softDelete().execute()
  }
}
