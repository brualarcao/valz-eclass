import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ButtonAction from '~/components/ButtonAction.vue'

describe('ButtonAction', () => {
  it('renders default label Sign In', async () => {
    const wrapper = await mountSuspended(ButtonAction)

    expect(wrapper.text()).toContain('Sign In')
  })

  it('renders custom label', async () => {
    const wrapper = await mountSuspended(ButtonAction, {
      props: { label: 'Continue' },
    })

    expect(wrapper.text()).toContain('Continue')
  })

  it('has type button by default', async () => {
    const wrapper = await mountSuspended(ButtonAction)

    expect(wrapper.find('button').attributes('type')).toBe('button')
  })

  it('accepts type submit', async () => {
    const wrapper = await mountSuspended(ButtonAction, {
      props: { type: 'submit' },
    })

    expect(wrapper.find('button').attributes('type')).toBe('submit')
  })

  it('is clickable when not disabled', async () => {
    const wrapper = await mountSuspended(ButtonAction)

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeUndefined()
    await button.trigger('click')
    expect(button.exists()).toBe(true)
  })

  it('shows Loading... when loading is true', async () => {
    const wrapper = await mountSuspended(ButtonAction, {
      props: { label: 'Submit', loading: true },
    })

    expect(wrapper.text()).toContain('Loading...')
    expect(wrapper.text()).not.toContain('Submit')
  })

  it('disables button when disabled is true', async () => {
    const wrapper = await mountSuspended(ButtonAction, {
      props: { disabled: true },
    })

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('disables button when loading is true', async () => {
    const wrapper = await mountSuspended(ButtonAction, {
      props: { loading: true },
    })

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })
})
