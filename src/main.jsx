import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { APP_VERSION } from './release.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      registration.update()

      registration.addEventListener('updatefound', () => {
        const worker = registration.installing
        if (!worker) return
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            window.dispatchEvent(new CustomEvent('booknook:update-ready', { detail: { version: APP_VERSION } }))
          }
        })
      })

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!window.__booknookReloading) {
          window.__booknookReloading = true
          window.location.reload()
        }
      })

      window.addEventListener('booknook:apply-update', () => {
        const waitingWorker = registration.waiting || registration.installing
        waitingWorker?.postMessage({ type: 'SKIP_WAITING' })
      }, { once: true })
    } catch (err) {
      console.info('[Book Nook] Service worker registration skipped', err)
    }
  })
}
