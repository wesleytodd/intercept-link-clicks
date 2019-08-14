var { describe, it, beforeEach } = require('mocha')
var interceptClicks = require('../')

describe('interceptClicks', function () {
  var event, onClick
  beforeEach(function () {
    event = {
      which: 1,
      preventDefault: function () {}
    }
  })

  it('should not intercept clicks when certain modifier keys were pressed or default was prevented', function () {
    onClick = interceptClicks(function () {
      throw new Error('Should not have been called!!')
    })

    onClick({
      button: 2
    })
    onClick({
      metaKey: true
    })
    onClick({
      shiftKey: true
    })
    onClick({
      defaultPrevented: true
    })
  })

  it('should not intercept clicks when not on a link', function () {
    onClick = interceptClicks(function () {
      throw new Error('Should not have been called!!')
    })

    event.target = document.getElementsByTagName('body')[0]

    onClick(event)
  })

  it('should not intercept clicks when the element has download', function () {
    onClick = interceptClicks(function () {
      throw new Error('Should not have been called!!')
    })

    event.target = document.createElement('a')
    event.target.setAttribute('download', '')

    onClick(event)
  })

  it('should not intercept clicks when the element has rel', function () {
    onClick = interceptClicks(function () {
      throw new Error('Should not have been called!!')
    })

    event.target = document.createElement('a')
    event.target.setAttribute('rel', 'nofollow')

    onClick(event)
  })

  it('should not intercept clicks when the path is the same but the hash changed', function () {
    onClick = interceptClicks(function () {
      throw new Error('Should not have been called!!')
    })

    window.location = '/'

    event.target = document.createElement('a')
    event.target.setAttribute('href', '/#test')

    onClick(event)
  })

  it('should not intercept clicks when the path is a mailto link', function () {
    onClick = interceptClicks(function () {
      throw new Error('Should not have been called!!')
    })

    event.target = document.createElement('a')
    event.target.setAttribute('href', 'mailto:test@tester.com')

    onClick(event)
  })

  it('should not intercept clicks when the link is to a different origin', function () {
    onClick = interceptClicks(function () {
      throw new Error('Should not have been called!!')
    })

    event.target = document.createElement('a')

    event.target.setAttribute('href', 'http://tester.com')
    onClick(event)

    event.target.setAttribute('href', '//tester.com')
    onClick(event)
  })
})
