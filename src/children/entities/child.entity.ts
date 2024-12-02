import { IsString, IsBoolean } from 'class-validator'

export class Child {
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsBoolean()
    good: boolean;
}
