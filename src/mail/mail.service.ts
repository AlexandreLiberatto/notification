import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MailService {
    constructor(private prisma: PrismaService) {}

    async getMailByIdUser(idUser: string): Promise<Mail[] | null> {
        return await this.prisma.mail.fyndMany({
            where: { idUser },
        });
    }
}
