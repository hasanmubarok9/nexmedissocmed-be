import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

const roundsOfHashing = 10;
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}
    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: loginDto.email },
        })

        if (!user) {
            throw new NotFoundException('User not found');            
        }

        // const isPasswordValid = await compare(loginDto.password, user.password);
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return {
            accessToken: this.jwtService.sign({ userId: user.id }),
        }
    }

    async register(registerDto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, roundsOfHashing);
        const user = await this.prisma.user.create({
            data: { ...registerDto, password: hashedPassword },
        });

        return {
            message: 'User registered successfully',
            user,
        }
    }
}
