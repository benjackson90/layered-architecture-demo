import mongoose from 'mongoose';
import dummyData from '../../dummyData';
import serverConfig from '../../config';

const Schema = mongoose.Schema;

export default class DAO {
  connect() {
    mongoose.connect(serverConfig.mongoURL, (error) => {
      if (error) {
        console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
        throw error;
      }

      // feed some dummy data in DB.
      dummyData();
    });
  }

  createModel(modelName, schema) {
    const model = mongoose.model(modelName, schema);
    return model;
  }

  create(model, data, cb) {
    model.create(data, cb);
  }

  find(model, cb) {
    model.find().exec(cb);
  }

  count(model, cb) {
    model.count().exec(cb);
  }

  findOne(model, query, cb) {
    model.findOne(query).exec(cb);
  }
}
