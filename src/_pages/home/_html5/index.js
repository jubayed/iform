import React from 'react';
import { DndProvider } from 'react-dnd';
import { Row } from 'react-bootstrap';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import { formSelector, setLastUseIndex } from '../../../_redux/formSlice';
import { setSetting } from '../../../_redux/settingSlice';
import { Item } from '../_form/item';
import { ItemEmpty } from '../_form/_itemEmpty';
import { Sidebar } from '../../../_includes/sidebar';
import ActionsButton from '../_actions';

function Html5Block() {

    const dispatch = useDispatch();
    const { data, LAST_USED_INDEX, init, layoutWith } = useSelector(formSelector);

    const onLastUsed = (index) => {
        dispatch(setLastUseIndex(index));
    }

    const setEditId = index => {
        dispatch(setSetting({
            name: 'FIELD_EDIT_INDEX',
            value: index,
        }));
        onLastUsed(index);
    }

    return (
        <DndProvider backend={HTML5Backend}>

            <Sidebar />

            <div id="content" >
                <div className=""></div>
                <div className="overflow-auto position-sticky h-100 w-100 ">
                    <div className='d-flex justify-content-center m-2'>
                        <div id="builder" style={{ width: `${layoutWith}px` }}>

                            <ActionsButton />

                            <Row className='p-2'>
                                {init && data.length ? data.map((item, index) =>
                                    <Item
                                        key={index}
                                        index={index}
                                        layoutWith={layoutWith}
                                        data={data}
                                        isActive={LAST_USED_INDEX === index}
                                        setEditId={setEditId}
                                        onClick={() => onLastUsed(index)}
                                    />
                                ) : null}

                                <ItemEmpty />

                            </Row>
                        </div>
                    </div>
                </div>
                <div className=""></div>
            </div>



        </DndProvider>
    )
}

export default Html5Block