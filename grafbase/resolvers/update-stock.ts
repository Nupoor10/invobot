const baseUrl = process.env.MONGODB_DATA_API_URL
const apiKey = process.env.MONGODB_DATA_API_KEY
const dataSource = process.env.MONGODB_DATA_SOURCE
const database = process.env.MONGODB_DATABASE
const collection = process.env.MONGODB_COLLECTION

export default async function UpdateStockResolver(_, { productCode, input }) {

    const { quantity } = input

    try {
        const response = await fetch(`${baseUrl}/action/findOne`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify({
                dataSource,
                database,
                collection,
                filter: {
                    productCode: productCode
                }
            })
        });

        const { document } = await response.json();

        if (document === null) return null;

        await fetch(`${baseUrl}/action/updateOne`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify({
                dataSource,
                database,
                collection,
                filter: {
                    productCode: productCode
                },
                update: {
                    $set: {
                        quantity
                    }
                }
            })
        });

        return {
            ...document
        };
    } catch (err) {
        return null;
    }
}
