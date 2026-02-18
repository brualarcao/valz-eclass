import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MaterialsList from '~/components/MaterialsList.vue'
import type { Material } from '~/types/lesson'

function createMaterial(overrides: Partial<Material> = {}): Material {
  return {
    id: 'mat-1',
    name: 'Slide deck',
    size: '2.1 MB',
    url: '/materials/slides.pdf',
    ...overrides,
  }
}

describe('MaterialsList', () => {
  it('renders Materials heading', async () => {
    const wrapper = await mountSuspended(MaterialsList, {
      props: { materials: [] },
    })

    expect(wrapper.text()).toContain('Materials')
  })

  it('renders empty list when no materials', async () => {
    const wrapper = await mountSuspended(MaterialsList, {
      props: { materials: [] },
    })

    const items = wrapper.findAll('li')
    expect(items).toHaveLength(0)
  })

  it('renders one material with name and size', async () => {
    const materials = [createMaterial({ name: 'PDF Guide', size: '1.5 MB' })]
    const wrapper = await mountSuspended(MaterialsList, {
      props: { materials },
    })

    expect(wrapper.text()).toContain('PDF Guide')
    expect(wrapper.text()).toContain('1.5 MB')
    expect(wrapper.findAll('li')).toHaveLength(1)
  })

  it('renders multiple materials', async () => {
    const materials = [
      createMaterial({ id: '1', name: 'Doc A', size: '1 MB' }),
      createMaterial({ id: '2', name: 'Doc B', size: '2 MB' }),
    ]
    const wrapper = await mountSuspended(MaterialsList, {
      props: { materials },
    })

    expect(wrapper.text()).toContain('Doc A')
    expect(wrapper.text()).toContain('Doc B')
    expect(wrapper.text()).toContain('1 MB')
    expect(wrapper.text()).toContain('2 MB')
    expect(wrapper.findAll('li')).toHaveLength(2)
  })

  it('has download aria-label per material', async () => {
    const materials = [createMaterial({ name: 'My File' })]
    const wrapper = await mountSuspended(MaterialsList, {
      props: { materials },
    })

    const downloadLink = wrapper.find('a[aria-label="Baixar My File"]')
    expect(downloadLink.exists()).toBe(true)
  })
})
