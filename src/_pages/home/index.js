import React from 'react';
import { useSelector } from 'react-redux';
import { settingsSelector } from '../../_redux/settingSlice';
import Html5Block from './_html5';
import TouchBlock from './_touch';
import { DefaultLayout } from '../../_layouts/default';

export default function HomePage() {

    const { TOUCH_MODE } = useSelector(settingsSelector);

    return (
        <DefaultLayout>
            {TOUCH_MODE ? (
                <React.Fragment>
                    <TouchBlock />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Html5Block />
                </React.Fragment>
            )}
        </DefaultLayout>
    );
}
