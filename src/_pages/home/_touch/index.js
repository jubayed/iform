import React from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'react-bootstrap';
import { formSelector, setLastUseIndex } from '../../../_redux/formSlice';
import { setSetting } from '../../../_redux/settingSlice';
import { Item } from '../_form/item';
import { ItemEmpty } from '../_form/_itemEmpty';
import { Sidebar } from '../../../_includes/sidebar';
import ActionsButton from '../_actions';

function TouchBlock() {

    const { data, LAST_USED_INDEX, init, layoutWith } = useSelector(formSelector);
    const dispatch = useDispatch();

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
        <DndProvider backend={TouchBackend}>

            <Sidebar />

            <div id="content">
                <div className=""></div>
                <div className="overflow-auto position-sticky h-100 w-100">
                    <div className='d-flex justify-content-center m-2'>
                        <div id="builder" style={{ width: `${layoutWith}px` }}>

                            <ActionsButton />

                            <Row className='p-2'>
                                {init && data.length ? data.map((item, index) =>
                                    <Item
                                        key={index}
                                        index={index}
                                        data={data}
                                        isActive={LAST_USED_INDEX === index}
                                        setEditId={setEditId}
                                        onClick={() => onLastUsed(index)}
                                    />
                                ) : null}

                                {init && data.length === 0 ? <ItemEmpty /> : null}

                            </Row>
                        </div>
                    </div>
                </div>
                <div className=""></div>
            </div>
        </DndProvider>
    )
}

export default TouchBlock