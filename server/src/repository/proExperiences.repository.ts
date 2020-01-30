import { ProExperience } from '../models/proExperience';
import { MysqlConnection } from '../loaders/mysql';

/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
export class ProExperiencesRepository {

    private static instance: ProExperiencesRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'pro_experience';

    static getInstance() {
        if (!this.instance) {
            this.instance = new ProExperiencesRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * Make a query to the database to retrieve all proExperiences and return it in a promise.
     */
    findAll(): Promise<ProExperience[]> {
        return this.connection.query(`SELECT * from ${this.table}`)
          .then((results: any) => {
            return results.map((proExperience: any) => new ProExperience(proExperience));
          });
    }

    /**
     * Make a query to the database to retrieve one proExperience by its id in parameter. 
     * Return the proExperience found in a promise.
     * @param id proExperience id
     */
    findById(id: number): Promise<ProExperience> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new ProExperience(results[0]));
    }


    /**
     * Make a query to the database to insert a new proExperience and return the created proExperience in a promise.
     * @param proExperience proExperience to create
     */
    insert(proExperience: ProExperience) {
      return this.connection.query(
        `INSERT INTO ${this.table} (job_title, start_date, end_date, company, description, logo, user_id) VALUES (?,?,?,?,?,?)`,
        [proExperience.job_title, proExperience.start_date, proExperience.end_date, proExperience.company, proExperience.description, proExperience.logo, proExperience.user_id]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing proExperience and return the updated proExperience in a promise.
     * @param proExperience proExperience to update
     */
    update(proExperience: ProExperience) {
      return this.connection.query(
        `UPDATE ${this.table} SET job_title = ?, start_date = ?, end_date = ?, company = ?, description = ?, logo = ?, user_id = ? WHERE id = ?`,
        [proExperience.job_title, proExperience.start_date, proExperience.end_date, proExperience.company, proExperience.description, proExperience.logo, proExperience.user_id]
      ).then(() => {
        return this.findById(proExperience.id);
      });
    }

    /**
     * Make a query to the database to delete an existing proExperience and return an empry promise
     * @param id proExperience id to delete
     */
    delete(id: number): Promise<any> {
      return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }
}
