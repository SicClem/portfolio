export class ProExperience {
    id!: number;
    job_title!: string;
    start_date!: Date;
    end_date!: Date;
    company!: string;
    description!: string;
    logo!: string;
    user_id!: number;

    constructor(input: ProExperience) {
        Object.assign(this, input);
    }
}