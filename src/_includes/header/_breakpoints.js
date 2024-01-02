import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FiAirplay } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { formSelector, setLayoutWith } from '../../_redux/formSlice';
import { useLocation } from 'react-router-dom';

function Breakpoints() {

    const [show, setShow] = useState(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const { layoutWith } = useSelector(formSelector);

    const handleBreakpoints = (e) => {
        e.preventDefault();
        setShow(true);
    }

    const onChange = e => {

        var { value } = e.target;
        var width = parseInt(value);

        dispatch(setLayoutWith(width));
    }

    return (
        <React.Fragment>
            <a href="/breakpoints"
                className={`nav-link${pathname === '/breakpoints' ? ' active' : ""}`}
                onClick={(e) => handleBreakpoints(e)}
            >
                <span><FiAirplay /></span> 
                <span>{t('Breakpoints')}</span>
            </a>
            <Modal show={show} onHide={() => setShow(s => !s)}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("Change Breakpoint")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        {breakpointData.map((item, key) => (
                            <div className="form-check" key={key}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="breakpoints"
                                    id={`ch_breakpoints_m_${key}`}
                                    defaultValue={item.width}
                                    checked={layoutWith === item.width}
                                    onChange={() => { }}
                                    onClick={onChange}
                                />
                                <label className="form-check-label" htmlFor={`ch_breakpoints_m_${key}`}>
                                    {item.breakpoint} <code>{item.classInfix}</code> {item.dimensions}
                                </label>
                            </div>
                        ))}
                    </form>
                </Modal.Body>
            </Modal>

        </React.Fragment>
    )
}

export const breakpointData = [
    {
        classInfix: 'sm',
        breakpoint: 'Small',
        dimensions: '≥576px'
    },
    {
        classInfix: 'md',
        breakpoint: 'Medium',
        dimensions: '≥768px'
    },
    {
        classInfix: 'lg',
        breakpoint: 'Large',
        dimensions: '992px'
    },
    {
        classInfix: 'xl',
        breakpoint: 'Large',
        dimensions: '≥1200px'
    },
    {
        classInfix: 'xxl',
        breakpoint: 'Extra extra large',
        dimensions: '≥1400px'
    },
].map(b => {
    const pxValue = parseInt(b.dimensions.match(/\d+/)[0]); // Extracting numerical value
    return {
        ...b,
        width: pxValue // Adding 'px' key with the parsed numerical value
    };
});

export default Breakpoints