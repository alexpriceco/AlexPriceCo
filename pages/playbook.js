import React, { Component } from 'react'
import Head from '../components/general/head.js'
import Footer from '../components/footer/footer.js'
import Stylesheet from '../components/general/stylesheet.js'
import sheet from '../components/playbook-landing.scss'
import Loader from '../components/loader/loader.js'

export default class Playbook extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true,
      loaded: true,
      email: '',
      step: 0
    }
  }

  componentDidMount () {
    this.setState({ loading: false }, () => {
      setTimeout(() => {
        this.setState({ loaded: true })
        const ReactGA = require('react-ga')
        if (ReactGA && ReactGA.initialize) ReactGA.initialize('UA-63630411-1')
        else console.warn('Google Analytics unable to initialize.')
      }, 1000)
    })
  }

  setStep (n) {
    this.setState({ step: n })
    if (n === 1 && this.input) this.input.focus()
    if (n === 2) this.submitEmail()
  }

  validateEmail () {
    const { email } = this.state

    let valid = false
    if (email.match(/.+@.+\..+/) !== null) valid = true
    if (valid) this.setState({ valid: true })
    else this.setState({ valid: false })

    return valid
  }

  submitEmail () {
    const email = '*' + this.state.email + '*'
    const data = JSON.stringify({
      text: email + ' signed up for the beta!'
    })
    const req = new XMLHttpRequest() // eslint-disable-line
    const slackWebhook = 'https://hooks.slack.com/services/' +
      'T076KJELT/B8FSZ5TBJ/kTMddEu7qHJZbXdRfzLxXlHa'
    req.open('POST', slackWebhook, true)
    req.send(data)
  }

  render () {
    const { step, loading, loaded } = this.state
    const loadingClass = loading ? 'loading' : (loaded ? 'loaded' : '')

    return (
      <main>
        <Stylesheet sheet={sheet} />
        <Head title='APCO: Playbook' />
        <Loader status={loadingClass} dark />
        <section className={loadingClass}>
          <svg width='72' height='72' viewBox='0 0 72 72' version='1.1' fill='none'>
            <path transform='translate(22 16)' fill='#B31A42' d='M 0.28125 40.3125L 0.28125 38.9688C 1.69792 38.6771 2.80208 38.3646 3.59375 38.0312C 4.40625 37.6771 4.8125 37.3542 4.8125 37.0625L 4.8125 3.125C 4.04167 3.22917 3.27083 3.34375 2.5 3.46875C 1.75 3.57292 1.01042 3.6875 0.28125 3.8125L 0 1.875C 1 1.60417 2.08333 1.35417 3.25 1.125C 4.4375 0.895833 5.66667 0.697917 6.9375 0.53125C 8.20833 0.364583 9.48958 0.239583 10.7812 0.15625C 12.0938 0.0520833 13.3854 0 14.6562 0C 16.9062 0 18.9375 0.239583 20.75 0.71875C 22.5625 1.19792 24.1042 1.90625 25.375 2.84375C 26.6667 3.78125 27.6562 4.9375 28.3438 6.3125C 29.0521 7.6875 29.4062 9.27083 29.4062 11.0625C 29.4062 12.5 29.1979 13.8125 28.7812 15C 28.3854 16.1875 27.8438 17.25 27.1562 18.1875C 26.4896 19.1042 25.7188 19.9062 24.8438 20.5938C 23.9688 21.2604 23.0521 21.8229 22.0938 22.2812C 21.1562 22.7188 20.2083 23.0521 19.25 23.2812C 18.3125 23.4896 17.4375 23.5938 16.625 23.5938C 14.6667 23.5938 12.9896 23.2812 11.5938 22.6562L 10.875 20.3125C 11.75 20.7083 12.5833 20.9688 13.375 21.0938C 14.1875 21.1979 14.9583 21.25 15.6875 21.25C 16.6458 21.25 17.6458 21.0625 18.6875 20.6875C 19.7292 20.3125 20.6875 19.75 21.5625 19C 22.4375 18.25 23.1562 17.3229 23.7188 16.2188C 24.2812 15.1146 24.5625 13.8229 24.5625 12.3438C 24.5625 10.6354 24.25 9.16667 23.625 7.9375C 23.0208 6.70833 22.1875 5.70833 21.125 4.9375C 20.0625 4.14583 18.8229 3.5625 17.4062 3.1875C 15.9896 2.8125 14.4792 2.625 12.875 2.625C 12.3542 2.625 11.8333 2.63542 11.3125 2.65625C 10.8125 2.65625 10.3125 2.66667 9.8125 2.6875L 9.8125 37.0625C 9.8125 37.1875 9.89583 37.3229 10.0625 37.4688C 10.2292 37.6146 10.5104 37.7708 10.9062 37.9375C 11.3229 38.1042 11.8854 38.2708 12.5938 38.4375C 13.3021 38.6042 14.1979 38.7812 15.2812 38.9688L 15.2812 40.3125L 0.28125 40.3125Z' />
            <path strokeWidth='2' transform='translate(1 1)' stroke='#B31A42' d='M 61.9999 65L 61.9999 70L 70.0002 70L 70.0002 62L 53.9999 62L 45.9999 70L 34.9999 70L 24 70L 16 62L 11 62M 61.9999 59L 61.9999 54L 70.0002 45.9999L 70.0002 34.9999L 70.0002 24L 61.9999 15.9997L 61.9999 0L 70.0002 0L 70.0002 8L 65 8M 59 8L 53.9999 8L 45.9999 0L 34.9999 0L 24 0L 16 8L 0 8L 0 0L 8 0L 8 5M 5 62L 0 62L 0 70L 8 70L 8 54L 0 46L 0 34.9999L 0 24L 8 16L 8 11' />
            <path strokeWidth='2' transform='translate(1 1)' stroke='#B31A42' d='M 11 0L 16 0L 18 2M 0 11L 0 16L 2 18M 22 6L 24 8L 19 13L 13 13L 13 19L 8 24L 6 22M 59 0L 54 0L 52 2M 48 6L 46 8L 51 13L 57 13L 57 19L 62 24L 64 22M 68 18L 70 16L 70 11M 70 59L 70 54L 68 52M 64 48L 62 46L 57 51L 57 57L 51 57L 46 62L 48 64M 52 68L 54 70L 59 70M 11 70L 16 70L 18 68M 22 64L 24 62L 19 57L 13 57L 13 51L 8 46L 6 48M 2 52L 0 54L 0 59M 27 3L 27 5L 29 7L 41 7L 43 5L 43 3M 67 27L 65 27L 63 29L 63 41L 65 43L 67 43M 3 27L 5 27L 7 29L 7 41L 5 43L 3 43M 27 67L 27 65L 29 63L 41 63L 43 65L 43 67M 13 25L 15 27L 15 45L 13 47M 57 25L 55 27L 55 45L 57 47M 58 35L 60 35M 12 35L 10 35M 10 31L 12 31M 12 39L 10 39M 58 39L 60 39M 58 31L 60 31' />
          </svg>

          <div>
            <article className={step === 0 ? 'visible' : 'down'}>
              <h1>Less math, more monster slaying.</h1>
              <p>Playbook is a cloud character sheet coming in 2018. If you'd like early access, I'm looking for beta testers.</p>
              <div className='button' onClick={() => this.setStep(1)}>
                I'm interested!
              </div>
            </article>

            <article className={step < 1 ? 'up' : (step === 1 ? 'visible' : 'down')}>
              <h1>Join the beta waitlist?</h1>
              <p>Your address will never be shared, and you'll receive one email when Playbook is ready for you.</p>
              <hr />
              <input
                id='email'
                type='email'
                ref={(r) => { this.input = r }}
                value={this.state.email}
                placeholder='your@email.io'
                onChange={(event) => {
                  this.setState({ email: event.target.value }, () => {
                    this.validateEmail()
                  })
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && this.state.valid) this.setStep(2)
                }}
              />
              <hr />
              <div
                className={`button ${this.state.valid ? '' : 'disabled'}`}
                onClick={() => this.setStep(2)}
              >
                Sign me up!
              </div>
            </article>

            <article className={step < 2 ? 'up' : (step === 2 ? 'visible' : 'down')}>
              <h1>Thank you!</h1>
              <p>
                I’m stoked you’re interested in Playbook, and look forward to offering you a beta invite. Till then! 
                <br /><br />
                &mdash; Alex
              </p>
            </article>
          </div>
        </section>

        <div className='footer-wrapper'>
          <Footer />
        </div>
      </main>
    )
  }
}
