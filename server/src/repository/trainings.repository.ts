import { Trainings } from '../models/trainings';
import { MysqlConnection } from '../loaders/mysql';

/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
export class TrainingsRepository {

    private static instance: TrainingsRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'trainings';

    static getInstance() {
        if (!this.instance) {
            this.instance = new TrainingsRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * Make a query to the database to retrieve all trainings and return it in a promise.
     */
    findAll(): Promise<Trainings[]> {
        return this.connection.query(`SELECT * from ${this.table}`)
          .then((results: any) => {
            return results.map((training: any) => new Trainings(training));
          });
    }

    /**
     * Make a query to the database to retrieve one training by its id in parameter. 
     * Return the training found in a promise.
     * @param id training id
     */
    findById(id: number): Promise<Trainings> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new Trainings(results[0]));
    }


    /**
     * Make a query to the database to insert a new training and return the created training in a promise.
     * @param training training to create
     */
    insert(training: Trainings) {
      return this.connection.query(
        `INSERT INTO ${this.table} (title, school, user_id) VALUES (?,?,?)`,
        [training.title, training.school, training.user_id]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing training and return the updated training in a promise.
     * @param training training to update
     */
    update(training: Trainings) {
      return this.connection.query(
        `UPDATE ${this.table} SET title = ?, school = ?, user_id = ? WHERE id = ?`,
        [training.title, training.school, training.user_id]
      ).then(() => {
        return this.findById(training.id);
      });
    }

    /**
     * Make a query to the database to delete an existing training and return an empry promise
     * @param id training id to delete
     */
    delete(id: number): Promise<any> {
      return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }
}
