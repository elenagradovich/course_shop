const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v4')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
)

class Cart {
  static async add(course) {
    const cart = await Cart.getAll()
    const index = cart.courses.findIndex((item) => item.id === course.id)
    console.log('index:', index)
    const product = cart.courses[index]
    console.log('product:', product)
    if(product) {
      //курс уже есть увеличиваем количество
      product.count ++
      cart.courses[index] = product
    } else {
      //добавить курс
      course.count = 1
      cart.courses.push(course)
    }
    cart.price += +course.price

    return new Promise((resolve, reject) => {
      fs.writeFile(
        p,
        JSON.stringify(cart),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }

  static async getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        p,
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err)
          } else {
            resolve(JSON.parse(content))
          }
        }
      )
    })
  }
}

module.exports = Cart