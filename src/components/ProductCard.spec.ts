import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import type { Product } from '../types/product'
import ProductCard from './ProductCard.vue'

const product: Product = {
  id: 42,
  title: 'Test Jacket',
  price: 55.5,
  description: 'Warm jacket',
  category: "men's clothing",
  image: 'https://example.com/jacket.png',
  rating: { rate: 4.3, count: 17 },
}

async function mountWithRouter() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'dashboard', component: { template: '<div />' } },
      {
        path: '/product/:id',
        name: 'product-detail',
        component: { template: '<div />' },
      },
    ],
  })
  await router.push('/')
  await router.isReady()

  return mount(ProductCard, {
    props: { product },
    global: { plugins: [router] },
  })
}

describe('ProductCard', () => {
  it('renders title, price, rating, and product link', async () => {
    const wrapper = await mountWithRouter()

    expect(wrapper.text()).toContain('Test Jacket')
    expect(wrapper.text()).toContain('$55.50')
    expect(wrapper.text()).toContain('4.3')

    const link = wrapper.get('a')
    expect(link.attributes('href')).toBe('/product/42')

    const img = wrapper.get('img')
    expect(img.attributes('alt')).toBe('Test Jacket')
  })
})
