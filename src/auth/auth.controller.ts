import { Body, Controller, Get, Header, Post, Req, Res } from '@nestjs/common';
import { RequestMagicTokenDto } from './dto/request-magic-token.dto';
import { AuthService } from './auth.service';
import { MagicLoginDto, PasswordLoginDto } from './dto/login.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: PasswordLoginDto): Promise<{ token: string }> {
    const token = await this.authService.login(loginDto);
    return { token };
  }

  @Public()
  @Post('magic-login')
  async magicLogin(
    @Body() loginDto: MagicLoginDto,
  ): Promise<{ token: string }> {
    const token = await this.authService.login(loginDto);
    return { token };
  }

  @Public()
  @Post('magic-token')
  async magicTokenPublic(@Body() requestMagicTokenDto: RequestMagicTokenDto) {
    const { email } = requestMagicTokenDto;
    await this.authService.createMagicToken(email);

    return;
  }

  @Get('magic-token')
  async magicTokenPrivate(@Req() request) {
    const { user } = request;
    await this.authService.createMagicToken(user.email);

    return;
  }

  @Get(['verify', 'renew'])
  @Header('Cache-Control', 'no-store, max-age=0')
  async verify(@Req() req): Promise<{ token: string }> {
    return { token: await this.authService.verify(req.user) };
  }
}
