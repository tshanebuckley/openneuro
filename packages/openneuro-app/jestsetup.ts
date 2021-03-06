// Make Enzyme functions available in all test files without importing
import React from 'react'
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import moment from 'moment-timezone'
import fetch from 'jest-fetch-mock'
import fromEntries from 'object.fromentries'
import '@testing-library/jest-dom'

Enzyme.configure({ adapter: new Adapter() })

// Run all tests in virtual Katmandu (UTC +05:45)
moment.tz.setDefault('Asia/Katmandu')

global.fetch = fetch

if (!Object.fromEntries) {
  fromEntries.shim()
}

jest.mock('./config.js')

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
