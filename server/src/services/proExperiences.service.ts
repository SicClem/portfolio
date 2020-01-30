import { ProExperiencesRepository } from './../repository/proExperiences.repository';
import { ProExperience } from '../models/proExperience';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les proExperience doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controller
 */
export class ProExperiencesService {

    // Make service => singletonTransformation de notre service en singleton
    private static instance: ProExperiencesService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProExperiencesService();
        }
        return this.instance;
    }

    // Un singleton est une class ayant une instance unique a travers toute l'app
    private repository: ProExperiencesRepository;
    private constructor() {
        this.repository = ProExperiencesRepository.getInstance();
    }

    // Business logic

    /**
     * Return a promise which contains an array of proExperiences.
     */
    getAll(): Promise<ProExperience[]> {
        return this.repository.findAll();
    }

    /**
     * Return a promise which contains the proExperience relative to the id in parameter.
     * @param id proExperience id
     */
    getById(id: number): Promise<ProExperience> {
        return this.repository.findById(id);
    }

    /**
     * Create a new proExperience and return a promise which contains the created proExperience.
     * @param proExperience proExperience to create
     */
    create(proExperience: any): Promise<ProExperience> {
      return this.repository.insert(proExperience);
    }

    /**
     * Update the proExperience in parameter and return a promise which contains the updated proExperience.
     * @param proExperience proExperience to update
     */
    update(proExperience: any): Promise<ProExperience> {
      return this.repository.update(proExperience);
    }

    /**
     * Delete the proExperience related to the id in parameter. Return an empty promise.
     * @param id proExperience id
     */
    delete(id: number): Promise<any> {
      return this.repository.delete(id);
    }
}
