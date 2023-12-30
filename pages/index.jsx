import mongooseConnect from '@/lib/mongoose'
import { Product } from '@/models/Product'

import HeroSection from '@/components/HeroSection'
import Products from '@/components/Products'
import Collection from '@/components/Collection'

export default function Home({ featureProduct, newProducts, collectionProduct }) {
  return (
    <section>
      <HeroSection product={featureProduct} />
      <hr className="my-4 h-px border-0 bg-gray-300" />
      <Products products={newProducts} />
      <hr className="my-4 h-px border-0 bg-gray-300" />
      <Collection product={collectionProduct} />
    </section>
  )
}

export async function getServerSideProps() {
  await mongooseConnect()

  const featureId = '658d8fc574ce424c260c9cea'
  const collectionId = '658dfd67566b562fc08ab2f7'

  const featureProduct = await Product.findById(featureId)
  const collectionProduct = await Product.findById(collectionId)
  const newProducts = await Product.find({}, null, { limit: 5, sort: { _id: 1 } })

  return {
    props: {
      featureProduct: JSON.parse(JSON.stringify(featureProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      collectionProduct: JSON.parse(JSON.stringify(collectionProduct)),
    },
  }
}
