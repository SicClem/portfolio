import { ProjectsRepository } from './../repository/projects.repository';
import { Project } from '../models/project';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les project doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controller
 */
export class ProjectsService {

    // Make service => singletonTransformation de notre service en singleton
    private static instance: ProjectsService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectsService();
        }
        return this.instance;
    }

    // Un singleton est une class ayant une instance unique a travers toute l'app
    private repository: ProjectsRepository;
    private constructor() {
        this.repository = ProjectsRepository.getInstance();
    }

    // Business logic

    /**
     * Return a promise which contains an array of projects.
     */
    getAll(): Promise<Project[]> {
        return this.repository.findAll();
    }

    /**
     * Return a promise which contains the project relative to the id in parameter.
     * @param id project id
     */
    getById(id: number): Promise<Project> {
        return this.repository.findById(id);
    }

    /**
     * Create a new project and return a promise which contains the created project.
     * @param project project to create
     */
    create(project: any): Promise<Project> {
      return this.repository.insert(project);
    }

    /**
     * Update the project in parameter and return a promise which contains the updated project.
     * @param project project to update
     */
    update(project: any): Promise<Project> {
      return this.repository.update(project);
    }

    /**
     * Delete the project related to the id in parameter. Return an empty promise.
     * @param id project id
     */
    delete(id: number): Promise<any> {
      return this.repository.delete(id);
    }
}
