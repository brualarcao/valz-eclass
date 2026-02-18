import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CourseCard from '~/components/CourseCard.vue'
import type { Course } from '~/types/course'

function createCourse(overrides: Partial<Course> = {}): Course {
  return {
    id: 'course-1',
    title: 'Intro to Testing',
    shortDescription: 'Learn how to test Vue apps.',
    coverImage: '/cover.jpg',
    category: { name: 'Development', icon: 'heroicons:code-bracket' },
    lessonsCount: 5,
    duration: '45m',
    progress: 0,
    ...overrides,
  }
}

describe('CourseCard', () => {
  it('renders course title and description', async () => {
    const course = createCourse({
      title: 'My Course',
      shortDescription: 'My description',
    })
    const wrapper = await mountSuspended(CourseCard, { props: { course } })

    expect(wrapper.text()).toContain('My Course')
    expect(wrapper.text()).toContain('My description')
  })

  it('shows Start when progress is 0', async () => {
    const course = createCourse({ progress: 0 })
    const wrapper = await mountSuspended(CourseCard, { props: { course } })

    expect(wrapper.text()).toContain('Start')
  })

  it('shows Continue when progress is between 0 and 100', async () => {
    const course = createCourse({ progress: 50 })
    const wrapper = await mountSuspended(CourseCard, { props: { course } })

    expect(wrapper.text()).toContain('Continue')
  })

  it('shows Completed when progress is 100', async () => {
    const course = createCourse({ progress: 100 })
    const wrapper = await mountSuspended(CourseCard, { props: { course } })

    expect(wrapper.text()).toContain('Completed')
  })

  it('displays progress percentage', async () => {
    const course = createCourse({ progress: 75 })
    const wrapper = await mountSuspended(CourseCard, { props: { course } })

    expect(wrapper.text()).toContain('75%')
  })

  it('emits continue when action button is clicked', async () => {
    const course = createCourse({ id: 'c1' })
    const wrapper = await mountSuspended(CourseCard, { props: { course } })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted('continue')).toBeTruthy()
    expect(wrapper.emitted('continue')![0]).toEqual([course])
  })

  it('renders status badge when provided', async () => {
    const course = createCourse({ statusBadge: 'New' })
    const wrapper = await mountSuspended(CourseCard, { props: { course } })

    expect(wrapper.text()).toContain('New')
  })

  it('does not render status badge when not provided', async () => {
    const course = createCourse()
    const wrapper = await mountSuspended(CourseCard, { props: { course } })

    const badges = wrapper.findAll('span').filter(s => s.text() === 'New')
    expect(badges).toHaveLength(0)
  })
})
