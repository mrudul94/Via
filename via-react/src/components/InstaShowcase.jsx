import { useState, useEffect } from 'react'
import Icon from './Icon'
import { VIA_INSTAGRAM } from '../config'

export default function InstaShowcase() {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    // Process Instagram embed script if loaded
    if (window.instgrm) {
      try {
        window.instgrm.Embeds.process()
      } catch (e) {}
    }
  }, [])

  return (
    <section className="insta-showcase-section">
      <div className="insta-showcase-container">
        {/* Section Header */}
        <div className="insta-showcase-head">
          <div className="insta-showcase-head__left">
            <span className="insta-showcase-tag">
              <span className="insta-live-dot"></span> LIVE INSTAGRAM WINDOW
            </span>
            <h2 className="insta-showcase-title">@house_of_via___</h2>
          </div>
          <a
            href={VIA_INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="insta-follow-btn"
          >
            <span>OPEN IN INSTAGRAM</span>
            <Icon name="open_in_new" className="icon-sm" />
          </a>
        </div>

        {/* Live Instagram Embedded Frame */}
        <div className="insta-live-frame-wrapper">
          {/* Frame Top Browser Bar */}
          <div className="insta-live-frame-bar">
            <div className="insta-live-frame-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="insta-live-frame-url">
              <Icon name="lock" className="icon-xs" />
              <span>instagram.com/house_of_via___</span>
            </div>
            <a
              href={VIA_INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="insta-live-frame-link"
              title="Open Official Profile"
            >
              <Icon name="open_in_new" className="icon-sm" />
            </a>
          </div>

          {/* Embedded Live Window Container */}
          <div className="insta-live-iframe-container">
            <iframe
              src="https://www.instagram.com/house_of_via___/embed/"
              title="VIA Official Instagram Live Window"
              className="insta-live-iframe"
              onLoad={() => setIframeLoaded(true)}
              allowTransparency="true"
              allow="encrypted-media"
            ></iframe>

            {!iframeLoaded && (
              <div className="insta-live-loading">
                <div className="insta-spinner"></div>
                <span>Connecting to Instagram Live Feed...</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Quick Bar */}
        <div className="insta-live-footer">
          <div className="insta-live-footer-info">
            <Icon name="verified" style={{ color: '#3897f0' }} />
            <span>Official Instagram Page for House of VIA</span>
          </div>
          <a
            href={VIA_INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="insta-footer-link"
          >
            View Full Profile on Instagram &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}
