import { PostsController } from './controller/posts.controller';
import { ProExperiencesController } from './controller/proExperiences.controller';
import { ProjectsController } from './controller/projects.controller';
import { TrainingController } from './controller/trainings.controller';
import { UsersController } from './controller/users.controller';
import { AuthController } from './controller/auth.controller';

import express from 'express';
import loaders from './loaders';


async function startServer() {
    // Récupération de l'application initiale
    const app = express();

    // Chargement des différent loader
    await loaders(app);

    // Ajout des différentes route de votre application
    PostsController(app);
    ProExperiencesController(app);
    ProjectsController(app);
    TrainingController(app);
    UsersController(app);
    AuthController(app);


    // Démarrage du serveur une fois que tout est correctement init
    app.listen(3000, () => console.log('Express server  is running'));
  }

startServer();
