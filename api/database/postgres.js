const { Client, Pool } = require('pg');

class Postgres {
  constructor() {
    this.config = {
      connectionString: require('../aws.json').db2
    };

    this.pool = new Pool(this.config);
    this.poolConnection = this.pool.connect();
  }
	connect() {
    this.client = new Client(this.config);;
		return this.client.connect();
	}
	end() {
		return this.client.end();  
  }

  queryPool(str, values) {
    console.log(`POOL QUERY\t${str}`);
    return this.pool.connect()
      .then(client => {
        if (values) {
          return client.query(str, values)
            .then(res => {
              client.release()
              return res;
            })
            .catch(e => {
              client.release()
              return res;
            })
        } else {
          return client.query(str)
          .then(res => {
            client.release()
            return res;
          })
          .catch(e => {
            client.release()
            return res;
          })
        }
      });
  }

  end() {
    return this.client.end();
  }

	async query(str, values) {
    console.log(`QUERY\t${str}`);
    let result;
    await this.connect();
    if (values) {
      result = await this.client.query(str, values)
    } else {
      result = await this.client.query(str);
    }
    await this.end();
    return result;
  }
  
}


module.exports = Postgres;
