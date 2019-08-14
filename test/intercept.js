var { describe, it, beforeEach } = require('mocha')
var Interceptor = require('../')
var interceptClicks = Interceptor.onClick

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
    onClick = interceptClicks({
      checkExternal: true
    }, function () {
      throw new Error('Should not have been called!!')
    })

    event.target = document.createElement('a')
    event.target.setAttribute('rel', 'external')

    onClick(event)
  })

  it('should not intercept clicks when the path is the same but the hash changed', function () {
    onClick = interceptClicks(function () {
      throw new Error('Should not have been called!!')
    })

    event.target = document.createElement('a')
    event.target.setAttribute('href', window.location.pathname + '#test')

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

    var host = 'example.com'
    Interceptor.isInternal = new RegExp('^(?:(?:http[s]?:)?//' + host.replace(/\./g, '\\.') + ')?(?:/[^/]|#|(?!(?:http[s]?:)?//).*$)', 'i')
    event.target = document.createElement('a')

    event.target.setAttribute('href', 'http://tester.com')
    onClick(event)

    event.target.setAttribute('href', '//tester.com')
    onClick(event)
  })

  it('should support shadow dom clicks via composedPath', function (done) {
    onClick = interceptClicks(function () {
      done()
    })

    event.target = document.createElement('div')
    event.composedPath = function () {
      var a = document.createElement('a')
      a.setAttribute('href', '/')
      return [a]
    }

    onClick(event)
  })
})
