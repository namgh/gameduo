import { ApiProperty } from '@nestjs/swagger';

//확장성, swagger을 위한 user input dto
export class UserInput {
  @ApiProperty({
    type: String,
    description: 'email',
    default: '',
  })
  readonly email: string;
}
