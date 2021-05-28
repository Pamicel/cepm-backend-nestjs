import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';

// https://docs.nestjs.com/security/authorization#integrating-casl
@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
