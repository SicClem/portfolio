import { ProExperience } from '../models/proExperience';
import { ProExperiencesService } from './../services/proExperiences.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controller est la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const ProExperiencesController = (app: Application) => {

    const router: Router = express.Router();
    const proExperiencesService = ProExperiencesService.getInstance();

    /**
     * Return all proExperiences in JSON
     */
    router.get('/', (req: Request, res: Response) => {
      proExperiencesService.getAll().then(results => {
            res.send(results);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Return only one proExperience in JSON relative to its id
     */
    router.get('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      proExperiencesService.getById(id).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Create a new proExperience from a JSON body and return the created proExperience in JSON.
     */
    router.post('/', (req: Request, res: Response) => {
      const proExperience: ProExperience = req.body; // Automatically transform in a ProExperience object

      proExperiencesService.create(proExperience).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Update a proExperience relative to its id and return the updated proExperience in JSON.
     */
    router.put('/:id', (req: Request, res: Response) => {
      const proExperience: ProExperience = req.body; // req.params.id is automatically set into the body

      proExperiencesService.update(proExperience).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Delete a proExperience relative its id.
     */
    router.delete('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);

      proExperiencesService.delete(id).then(result => {
            res.send();
        })
        .catch(err => {
          console.log(err);
        })
    });

    app.use('/proExperiences', router);
};
