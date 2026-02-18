import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Filter from '~/components/Filter.vue'
import type { CourseFilterValue } from '~/types/courseFilter'

describe('Filter', () => {
  it('renders all filter tabs with counts', async () => {
    const wrapper = await mountSuspended(Filter, {
      props: {
        modelValue: 'all' as CourseFilterValue,
        inProgressCount: 2,
        completedCount: 1,
        notStartedCount: 3,
        allCount: 6,
      },
    })

    expect(wrapper.text()).toContain('In Progress')
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('Completed')
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('Not Started')
    expect(wrapper.text()).toContain('3')
    expect(wrapper.text()).toContain('All Courses')
    expect(wrapper.text()).toContain('6')
  })

  it('emits update:modelValue when In Progress is clicked', async () => {
    const wrapper = await mountSuspended(Filter, {
      props: { modelValue: 'all' as CourseFilterValue },
    })

    const buttons = wrapper.findAll('button')
    const inProgressBtn = buttons.find(b => b.text().includes('In Progress'))
    await inProgressBtn!.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['in-progress'])
  })

  it('emits update:modelValue when Completed is clicked', async () => {
    const wrapper = await mountSuspended(Filter, {
      props: { modelValue: 'all' as CourseFilterValue },
    })

    const buttons = wrapper.findAll('button')
    const completedBtn = buttons.find(b => b.text().includes('Completed'))
    await completedBtn!.trigger('click')

    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['completed'])
  })

  it('emits update:modelValue when Not Started is clicked', async () => {
    const wrapper = await mountSuspended(Filter, {
      props: { modelValue: 'all' as CourseFilterValue },
    })

    const buttons = wrapper.findAll('button')
    const notStartedBtn = buttons.find(b => b.text().includes('Not Started'))
    await notStartedBtn!.trigger('click')

    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['not-started'])
  })

  it('emits update:modelValue when All Courses is clicked', async () => {
    const wrapper = await mountSuspended(Filter, {
      props: { modelValue: 'in-progress' as CourseFilterValue },
    })

    const buttons = wrapper.findAll('button')
    const allBtn = buttons.find(b => b.text().includes('All Courses'))
    await allBtn!.trigger('click')

    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['all'])
  })

  it('has role tablist and tabs with aria-selected', async () => {
    const wrapper = await mountSuspended(Filter, {
      props: { modelValue: 'completed' as CourseFilterValue },
    })

    expect(wrapper.find('[role="tablist"]').exists()).toBe(true)
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs).toHaveLength(4)
    const completedTab = tabs.find(t => t.text().includes('Completed'))
    expect(completedTab?.attributes('aria-selected')).toBe('true')
  })
})
