"use client"
import { getDictionary } from './dictionaries'
 
// eslint-disable-next-line @next/next/no-async-client-component
export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang) // en
  return <button>{dict.Common.title}</button> // Add to Cart
}