const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
  courses: [
    {
      course: {
        type: Object,
        require: true
      },
      count: {
        type: Number,
        require: true
      }
    }
  ],
  user: {
    name: String,
    userId: {
      type: Schema.Types.ObjectID,
      ref: 'User',
      required: true,
    },
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

//Schema.Types.ObjectID - связь таблиц
//ref: 'User' - для populate

module.exports = model('Order', orderSchema)