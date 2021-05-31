import { Body, Controller, Get, Header, Post, Req } from '@nestjs/common';
import { RequestMagicTokenDto } from './dto/request-magic-token.dto';
import { AuthService } from './auth.service';
import { MagicLoginDto, PasswordLoginDto } from './dto/login.dto';
import { Public } from './public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { RequiredPermissionLevel } from './permission-level.decorator';
import { PermissionLevel } from './permission-level.enum';
import { LockAppDto } from './dto/lock-app.dto';
import { ImpersonateDto } from './dto/impersonate.dto';

@ApiTags('auth')
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

  @Post('impersonate')
  @RequiredPermissionLevel(PermissionLevel.Staff)
  async impersonate(
    @Req() req,
    @Body() dto: ImpersonateDto,
  ): Promise<{ token: string }> {
    const token = await this.authService.impersonate({
      staffId: req.user.id,
      ...dto,
    });
    return { token };
  }

  @Get('impersonation-logout')
  async revertImpersonation(@Req() req): Promise<{ token: string }> {
    const token = await this.authService.revertImpersonation(req.user);
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

  @Post('lock-app')
  @RequiredPermissionLevel(PermissionLevel.Staff)
  async lockApp(@Req() req, @Body() { crossingId }: LockAppDto) {
    const token = await this.authService.lock(req.user, crossingId);
    return { token };
  }

  @Post('unlock-app')
  @RequiredPermissionLevel(PermissionLevel.Staff)
  async unlockApp(@Body() requestMagicTokenDto: RequestMagicTokenDto) {
    const { email } = requestMagicTokenDto;
    await this.authService.unlock(email);
    return;
  }
}
