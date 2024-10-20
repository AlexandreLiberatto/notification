import { Controller, Get, Logger, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { Mail } from '@prisma/client';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { DataMessage } from './types/message';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  private readonly logger = new Logger(MailController.name);

  @Get('get')
  async getMail(@Query('idUser') idUser: string): Promise<Mail[] | null> {
    return await this.mailService.getMailByIdUser(idUser);
  }

  @MessagePattern('register')
  async readRegisterPayment(
    @Payload() payload: any,
    @Ctx() context: RmqContext,
  ) {

    try {

      this.logger.log(`data: ${JSON.stringify(payload)}`);
      const DataMessage: DataMessage = JSON.parse(payload.data.notification);
      const channel = context.getChannelRef();
      const originalMesage = context.getMessage();
      channel.ack(originalMesage);
      await this.mailService.sendMail(DataMessage, MailType.orderConfirmation);
      await this.mailService.persistNotification(
        DataMessage,
        MailType.orderConfirmation,
    );
      
    } catch (error) {
      
    }
    
  }

  @MessagePattern('confirmation')
  async readConfirmationPayment(
    @Payload() payload: any,
    @Ctx() context: RmqContext,
  ) {
    try {

      const DataMessage: DataMessage = JSON.parse(payload.data.notification);
      const channel = context.getChannelRef();
      const originalMesage = context.getMessage();
      channel.ack(originalMesage);
      await this.mailService.sendMail(
        DataMessage,
        MailType.paymentConfirmation,
      );
      await this.mailService.persistNotification(
        DataMessage,
        MailType.paymentConfirmation,
    );
      
    } catch (error) {   
    }
  }
}
