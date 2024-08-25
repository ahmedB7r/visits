//src/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/commonServices/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(userName: string, password: string) {
    // Step 1: Fetch a user with the given userName
    const user = await this.prisma.user.findUnique({
      where: { userName: userName },
    });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for userName: ${userName}`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      user,
      token: this.jwtService.sign({ userId: user.id }),
    };
  }
}
