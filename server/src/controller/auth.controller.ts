import { User } from './../models/user';
import { AuthService } from './../services/auth.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controller est la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const AuthController = (app: Application) => {

    const router: Router = express.Router();
    const authService = AuthService.getInstance();

    
    /**
     * Create a new user from a JSON body and return the created user in JSON.
     */
    router.post('/login', (req: Request, res: Response) => {
        
        const user: User = req.body;
        
        authService.signin(user.email, user.password)
          .then((results : any) => {
              res.send({
                token: results.token,
                id: results.id,
                email: results.email
              });
          })
          .catch((err: any) => {
              res.status(401).send({err: "Vos identifiants ne sont pas valides" })
          })
    });
    
    /**
     * Create a new post from a JSON body and return the created post in JSON.
     */
    router.post('/register', (req: Request, res: Response) => {
        const user: User = req.body;
        authService.signup(user).then((registeredUser: User) => {
            res.send({
                ...registeredUser,
                password: ''
            });
        })
        .catch((err:any) => {
            console.log(err);
        })
    });

    /**
     * Return the connected user relative to the connected token
     */
    router.get('/me', authService.verifyToken, (req: Request, res: Response) => {
        res.send(req.user);
    });


    /**
     * Return only one user in JSON relative to its id
     */
    router.get('/:id', authService.verifyToken, (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        authService.getById(id).then(result => {
              res.send(result);
          })
          .catch(err => {
            console.log(err);
          })
      });

      router.put('/:id', authService.verifyToken, (req: Request, res: Response) => {
        const user: User = req.body; // req.params.id is automatically set into the body
  
        authService.updateUser(user).then((registeredUser: User) => {
              res.send({...registeredUser,
                password: ''});
          })
          .catch(err => {
            console.log(err);
          })
      });

    /**
     * Create a new user from a JSON body and return the created user in JSON.
     */
    router.post('/', (req: Request, res: Response) => {
        const user: User = req.body; // Automatically transform in a User object
  
        authService.create(user).then(result => {
              res.send(result);
          })
          .catch(err => {
            console.log(err);
          })
      });

    app.use('/auth', router);
};
