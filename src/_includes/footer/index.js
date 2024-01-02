import React, { useEffect, useState } from 'react'
import { FiAirplay } from 'react-icons/fi'
import { useSelector } from 'react-redux';
import { formSelector } from '../../_redux/formSlice';
import { breakpointData } from '../header/_breakpoints';

function Footer() {

    const { data, layoutWith } = useSelector(formSelector);
    const [bClassInfix, setClassInfix] = useState('sm');

    useEffect(() => {

        for (const bPoint of breakpointData) {
            if (bPoint && bPoint.width >= layoutWith) {
                setClassInfix(bPoint.classInfix);
                break;
            }
        }

        return () => {

        }
    }, [layoutWith])


    return (
        <footer id="i-footer">
            <div className="d-flex justify-content-between">
                <div className='d-flex'>
                    <div className="p-1 text-light">
                        bootstrap v5.3
                    </div>
                    <div className="p-1 text-light">
                        <FiAirplay />  <strong>{bClassInfix}</strong>
                    </div>

                    <div className="p-1 text-light">
                        Fields  <strong>[{data.length}]</strong>
                    </div>



                </div>

                <div className='d-flex'>
                    <div className="p-1 text-light">
                        <strong>dir:</strong> ltr
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer