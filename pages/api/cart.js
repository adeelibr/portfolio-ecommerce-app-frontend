import mongooseConnect from '@/lib/mongoose'
import { Product } from '@/models/Product'

export default async function handle(req, res) {
  const { method } = req

  await mongooseConnect()

  if (method === 'POST') {
    const ids = req.body.ids
    try {
      const products = await Product.find({ _id: { $in: ids } })
      res.status(200).json(products)
    } catch (error) {
      console.error('error:', error)
      res.status(500).json({ error: 'Internal server error', log: error })
    }
  }
}
