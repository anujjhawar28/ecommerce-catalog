import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SearchBar from './SearchBar.vue'

describe('SearchBar', () => {
  it('binds v-model and exposes accessible label', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
      },
    })

    const input = wrapper.get('input[type="search"]')
    expect(input.attributes('id')).toBe('product-search')
    expect(wrapper.find('label.sr-only').exists()).toBe(true)

    await input.setValue('jacket')
    expect(wrapper.props('modelValue')).toBe('jacket')
  })
})
