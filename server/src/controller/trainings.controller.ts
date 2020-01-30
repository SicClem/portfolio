import { Trainings } from '../models/trainings';
import { TrainingsService } from './../services/trainings.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controller est la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const TrainingController = (app: Application) => {

    const router: Router = express.Router();
    const trainingsService = TrainingsService.getInstance();

    /**
     * Return all trainings in JSON
     */
    router.get('/', (req: Request, res: Response) => {
      trainingsService.getAll().then(results => {
            res.send(results);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Return only one training in JSON relative to its id
     */
    router.get('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      trainingsService.getById(id).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Create a new training from a JSON body and return the created training in JSON.
     */
    router.post('/', (req: Request, res: Response) => {
      const training: Trainings = req.body; // Automatically transform in a Training object

      trainingsService.create(training).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Update a training relative to its id and return the updated training in JSON.
     */
    router.put('/:id', (req: Request, res: Response) => {
      const training: Trainings = req.body; // req.params.id is automatically set into the body

      trainingsService.update(training).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Delete a training relative its id.
     */
    router.delete('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);

      trainingsService.delete(id).then(result => {
            res.send();
        })
        .catch(err => {
          console.log(err);
        })
    });

    app.use('/trainings', router);
};
