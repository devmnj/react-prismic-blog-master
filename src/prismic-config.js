import Prismic from '@prismicio/client'

const apiEndpoint = process.env.REACT_APP_API
const accessToken = '' // This is where you would add your access token for a Private repository

const PrismicClient = Prismic.client(apiEndpoint, { accessToken })
export  {PrismicClient,Prismic};

