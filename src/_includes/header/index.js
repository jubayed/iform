import React from 'react'
import { FiHome, FiTerminal } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import Breakpoints from './_breakpoints'
import { useTranslation } from 'react-i18next'
import { BASENAME } from '../../config'

function Header() {

    const {t} = useTranslation();
    const {pathname} = useLocation();

    return (
        <header id="i-header" className="d-flex justify-content-between  align-items-center py-2">
            <Link
                to="/"
                className="mx-3 text-dark text-decoration-none"
            >
                <img
                    src={`${window.location.origin+ BASENAME}/images/logo.png`}
                    alt="ifram logo"
                    className="m-0"
                />
            </Link>
            <ul className="nav nav-pills m-0">
                <li className="nav-item">
                    <Link to="/" className={`nav-link${pathname === '/' ? ' active' : ""}`}>
                        <span> <FiHome />  </span>
                        <span> {t("Home")} </span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Breakpoints />
                </li>
                <li className="nav-item" style={{
                    paddingRight: '7px'
                }}>
                    <Link to="/generate" className={`nav-link${pathname === '/generate' ? ' active' : ""}`}>
                        <span><FiTerminal /> </span>
                        <span>{t('Generate')}</span>
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header