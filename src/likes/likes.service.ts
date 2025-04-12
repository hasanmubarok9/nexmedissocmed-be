import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLikeDto: CreateLikeDto) {
    return this.prisma.like.create({
      data: createLikeDto,
    });
  }

  findAll() {
    return `This action returns all likes`;
  }

  findOne(userId: number, postId: number) {
    return this.prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId
        }
      }
    });
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(userId: number, postId: number) {
    return this.prisma.like.delete({
      where: {
        userId_postId: {
          userId,
          postId
        }
      }
    });
  }
}
