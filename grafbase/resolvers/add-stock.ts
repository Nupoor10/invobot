const baseUrl = process.env.MONGODB_DATA_API_URL
const apiKey = process.env.MONGODB_DATA_API_KEY
const dataSource = process.env.MONGODB_DATA_SOURCE
const database = process.env.MONGODB_DATABASE
const collection = process.env.MONGODB_COLLECTION

export default async function AddStockResolver(_, { input }) {
    const { productCode, name, description, manufacturer, seller, image, quantity, price } = input
  
    try {
      const response = await fetch(`${baseUrl}/action/insertOne`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'api-key': apiKey
        },
        body: JSON.stringify({
          dataSource,
          database,
          collection,
          document: {
            productCode,
            name,
            description,
            manufacturer,
            seller,
            quantity,
            price
          }
        })
      })
  
      const data = await response.json()
  
      return {
        id: data.insertedId,
        productCode,
        name,
        description,
        manufacturer,
        seller,
        quantity,
        price
      }
    } catch (err) {
      return err
    }
  }
  