import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type { NavbarLogo } from '@docusaurus/theme-common';
import { useThemeConfig } from '@docusaurus/theme-common';

import styles from './styles.module.css';

var socialLinks = [
  {
    icon: 'fe fe-linkedin',
    href: 'https://www.linkedin.com/company/carcosa-rnd',
  },
  {
    icon: 'fe fe-github',
    href: 'https://github.com/carcosa-rnd',
  },
  {
    icon: 'fe fe-mail',
    href: 'mailto:info@carcosa.se',
  },
];

function FooterLink({ to, href, label, prependBaseUrlToHref, ...props }) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href);

  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            target: '_blank',
            rel: 'noopener noreferrer',
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}
    >
      {label}
    </Link>
  );
}

function Logo({ ...props }) {
  const {
    navbar: { logo = {} as NavbarLogo },
  } = useThemeConfig();
  const logoImageUrl = useBaseUrl('img/navigation/carcosa-rnd.svg');

  return (
    <div className={clsx('navbar__brand', styles.navbarLogo)} {...props}>
      {logoImageUrl != null && (
        <>
          <img className="navbar__logo" src={logoImageUrl} alt={logo.alt} />
        </>
      )}
    </div>
  );
}

function SocialMedia({ config }) {
  return (
    <div style={{ paddingTop: '2.5%' }}>
      {config.map((media, idx) => (
        <Link
          key={idx}
          style={{ textDecoration: 'none' }}
          {...(media.href
            ? {
                target: '_blank',
                rel: 'noopener noreferrer',
                href: media.href,
              }
            : {
                to: media.to,
              })}
        >
          {media.icon !== undefined && <i className={clsx(styles.icon, media.icon)} />}
        </Link>
      ))}
    </div>
  );
}

function Links({ links }) {
  if (!links || links.length <= 0) {
    return null;
  }
  return (
    <div className="row footer__links">
      {links.map((linkItem, i) => (
        <div key={i} className="col footer__col">
          {linkItem.title != null ? <h4 className="footer__title">{linkItem.title}</h4> : null}
          {linkItem.items != null && Array.isArray(linkItem.items) && linkItem.items.length > 0 ? (
            <ul className={clsx('footer__items', styles.footerAdditional)}>
              {linkItem.items.map((item, key) =>
                item.html ? (
                  <li
                    key={key}
                    className={clsx('footer__item')}
                    dangerouslySetInnerHTML={{
                      __html: item.html,
                    }}
                  />
                ) : (
                  <li key={item.href || item.to} className="footer__item">
                    <FooterLink {...item} />
                  </li>
                )
              )}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function Footer() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const { themeConfig = {} } = siteConfig;
  const { footer } = themeConfig;

  const { copyright, links = [] } = footer || {};

  if (!footer) {
    return null;
  }

  const classNames = ['footer'];
  if (typeof window !== 'undefined' && window.location.pathname === '/') {
    if (footer.style === 'dark') {
      classNames.push(styles.gradientDark);
    } else {
      classNames.push(styles.gradient);
    }
  } else {
    classNames.push(styles.noGradient);
  }

  return (
    <>
      <div className={clsx(styles.footer_before_container)}>
        <div className={clsx(styles.footer_before)}></div>
      </div>
      <footer
        className={clsx(...classNames, {
          'footer--dark': footer.style === 'dark',
        })}
      >
        <div className={clsx('container', styles.container)}>
          <div className="container">
            <Logo />
            <SocialMedia config={socialLinks} />
          </div>
          <div className={clsx('container', styles.container)}>
            <Links links={links} />
          </div>
        </div>
        <div className={clsx(styles.section)}>
          {copyright && (
            <div className={clsx('text--center', styles.copyright)}>
              <div
                dangerouslySetInnerHTML={{
                  __html: copyright,
                }}
              />
            </div>
          )}
        </div>
      </footer>
    </>
  );
}

export default Footer;