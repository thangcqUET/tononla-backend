export class CreateDesignDto {
    name: string;
    type: string;
    group: string;
    description: string;
    data: string;
    isShown: boolean;
    order: number;
    createdAt: Date;
}
