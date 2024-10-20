import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DataMessage } from './types/message';
import { Mail } from '@prisma/client';


@Injectable()
export class MailService {
  constructor(private prisma: PrismaService) {}

  async getMailByIdUser(idUser: string): Promise<Mail[] | null> {
    return await this.prisma.mail.findMany({
      where: { idUser },
    });
  }

  async sendMail(content: DataMessage, type: MailType) {
    console.log(`sendMail - content = ${content} - type = ${type}`);
    // Implementar método para conectar e enviar e-mail...
  }

  async persistNotification(content: DataMessage, type: MailType) {
    const data = {
      idUser: content.idUser,
      mailDestination: this.getDestination(content.idUser),
      mailContent: this.makeContent(content.orderNumber, content.orderValue),
      mailType: type,
    };

    await this.prisma.mail.create({ data });
  }

  getDestination(idUser: string) {
    switch (idUser) {
      case '10':
        return 'user@teste.com.br';
      default:
        return 'default@teste.com.br';
    }
  }

  makeContent(orderNumber: number, orderValue: number) {
    return `Número do pedido: ${orderNumber} - Valor do pedido: ${orderValue}`;
  }
}
