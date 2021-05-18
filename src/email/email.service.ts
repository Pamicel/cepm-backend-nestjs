import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private httpService: HttpService) {}

  private async contactEmailService(
    path: string,
    {
      recipient,
      data,
    }: {
      recipient: string;
      data: any;
    },
  ) {
    try {
      const res = await new Promise((resolve, reject) => {
        const request = this.httpService.post(path, {
          recipient,
          data,
        });

        request.subscribe({
          error(err) {
            reject(err);
          },
          complete() {
            resolve(true);
          },
        });
      });
      return res;
    } catch (error) {
      throw new HttpException(
        'Could not reach email http service',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  sendFirmCta({
    recipient,
    data,
  }: {
    recipient: string;
    data: {
      date: Date;
      link: string;
      crossingNumber?: number;
      groupNumber: string;
      nbrOfPassengers: number;
    };
  }) {
    return this.contactEmailService('firm-cta', {
      recipient,
      data,
    });
  }

  async sendMagicLink({
    recipient,
    data,
  }: {
    recipient: string;
    data: {
      magicToken: string;
    };
  }) {
    return this.contactEmailService('/magic-token', { recipient, data });
  }
}
