import { IsString, IsNumber } from 'class-validator'

export class Toy {
    @IsString()
    name: string;

    @IsString()
    material: string;

    @IsNumber()
    weight: number;
}
