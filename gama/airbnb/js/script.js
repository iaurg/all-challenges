/* global fetch */
const apiUrl = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72'
const listCards = document.getElementsByClassName('cards')[0]
const loader = document.getElementById('loader')

function changeImageSize (imageLink, size) {
  const stringLink = imageLink
  const splitLink = stringLink.split('?')
  const newSize = `${splitLink[0]}?aki_policy=${size}`
  return newSize
}

function removeLoader () {
  listCards.removeChild(loader)
}

function createCard (data) {
  for (const card of data) {
    // Create card div
    const cardItem = document.createElement('div')
    cardItem.className = 'card'

    const cardItemImage = document.createElement('img')
    cardItemImage.className = 'card__image'
    cardItem.appendChild(cardItemImage).src = changeImageSize(card.photo, 'medium')

    const cardItemType = document.createElement('div')
    cardItemType.className = 'card__type'
    cardItemType.innerHTML = card.property_type
    cardItem.appendChild(cardItemType)

    const cardItemName = document.createElement('div')
    cardItemName.className = 'card__name'
    cardItemName.innerHTML = card.name
    cardItem.appendChild(cardItemName)

    const cardItemPrice = document.createElement('span')
    cardItemPrice.className = 'card__price'
    cardItemPrice.innerHTML = `R$${card.price}`
    cardItem.appendChild(cardItemPrice)

    listCards.appendChild(cardItem)
  }
  removeLoader()
}

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    createCard(data)
  })
  .catch(function (error) {
    console.log('There has been a problem with connection: ' + error.message)
  })
