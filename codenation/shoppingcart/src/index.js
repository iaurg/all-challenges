const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK']
const { products } = require('../src/data/products')

function getShoppingCart (ids, productsList) {
  const cartProducts = filterProductsById(ids, productsList)

  const products = getNameAndCategory(cartProducts)

  const promotionType = lookType(products)
  const totalRegularPrice = sumTotalRegularPrice(cartProducts)
  const productsWithDiscount = applyDiscountInProducts(cartProducts, promotionType)

  const discountValue = productsWithDiscount.reduce((total, product) => {
    const price = product.discountPriceApply ? product.discountPriceApply : product.regularPrice
    total += price
    return total
  }, 0)

  const roundDiscountValue = discountValue.toFixed(2)
  const total = (totalRegularPrice - roundDiscountValue).toFixed(2)
  const discountPercentage = (total / totalRegularPrice * 100).toFixed(2)

  return {
    products,
    promotion: promotionType,
    totalPrice: roundDiscountValue,
    discountValue: total,
    discount: `${discountPercentage}%`
  }
}

const filterProductsById = (ids, productsList) => productsList.filter(product => ids.includes(product.id))

const getNameAndCategory = (productsList) => productsList.map(product => {
  return {
    name: product.name,
    category: product.category
  }
})

const sumTotalRegularPrice = (productsList) => productsList.reduce((price, product) => {
  price += product.regularPrice
  return price
}, 0)

const applyDiscountInProducts = (productsList, promotionType) => productsList.map((item, index) => {
  item.promotions.map(promotion => {
    if (promotion.looks.includes(promotionType)) {
      const newPrice = item.discountPriceApply = promotion.price
      return newPrice
    }
  })
  return item
})

function lookType (productsList) {
  const countCategories = [...new Set(productsList.map(product => product.category))].length
  return promotions[countCategories - 1]
}
module.exports = { getShoppingCart }
