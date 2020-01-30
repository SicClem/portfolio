export class Trainings {
    id!: number;
    title!: string;
    school!: string;
    user_id!: number;

    constructor(input: Trainings) {
        Object.assign(this, input);
    }
}