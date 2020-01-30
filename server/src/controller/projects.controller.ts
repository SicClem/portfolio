import { Project } from '../models/project';
import { ProjectsService } from './../services/projects.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controller est la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const ProjectsController = (app: Application) => {

    const router: Router = express.Router();
    const projectsService = ProjectsService.getInstance();

    /**
     * Return all projects in JSON
     */
    router.get('/', (req: Request, res: Response) => {
      projectsService.getAll().then(results => {
            res.send(results);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Return only one project in JSON relative to its id
     */
    router.get('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      projectsService.getById(id).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Create a new project from a JSON body and return the created project in JSON.
     */
    router.post('/', (req: Request, res: Response) => {
      const project: Project = req.body; // Automatically transform in a Project object

      projectsService.create(project).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Update a project relative to its id and return the updated project in JSON.
     */
    router.put('/:id', (req: Request, res: Response) => {
      const project: Project = req.body; // req.params.id is automatically set into the body

      projectsService.update(project).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Delete a project relative its id.
     */
    router.delete('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);

      projectsService.delete(id).then(result => {
            res.send();
        })
        .catch(err => {
          console.log(err);
        })
    });

    app.use('/projects', router);
};
