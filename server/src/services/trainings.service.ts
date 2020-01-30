import { TrainingsRepository } from './../repository/trainings.repository';
import { Trainings } from '../models/trainings';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les training doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controller
 */
export class TrainingsService {

    // Make service => singletonTransformation de notre service en singleton
    private static instance: TrainingsService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new TrainingsService();
        }
        return this.instance;
    }

    // Un singleton est une class ayant une instance unique a travers toute l'app
    private repository: TrainingsRepository;
    private constructor() {
        this.repository = TrainingsRepository.getInstance();
    }

    // Business logic

    /**
     * Return a promise which contains an array of trainings.
     */
    getAll(): Promise<Trainings[]> {
        return this.repository.findAll();
    }

    /**
     * Return a promise which contains the training relative to the id in parameter.
     * @param id training id
     */
    getById(id: number): Promise<Trainings> {
        return this.repository.findById(id);
    }

    /**
     * Create a new training and return a promise which contains the created training.
     * @param training training to create
     */
    create(training: any): Promise<Trainings> {
      return this.repository.insert(training);
    }

    /**
     * Update the training in parameter and return a promise which contains the updated training.
     * @param training training to update
     */
    update(training: any): Promise<Trainings> {
      return this.repository.update(training);
    }

    /**
     * Delete the training related to the id in parameter. Return an empty promise.
     * @param id training id
     */
    delete(id: number): Promise<any> {
      return this.repository.delete(id);
    }
}
