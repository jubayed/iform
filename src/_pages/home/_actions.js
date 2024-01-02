import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, InputGroup, Modal, Row, Alert } from 'react-bootstrap';
import { setData } from '../../_redux/formSlice';
import { addField, formSelector } from '../../_redux/formSlice';
import { boxTypes } from '../../_data/box-type';
import toast from 'react-hot-toast';
import { breakpointData } from '../../_includes/header/_breakpoints';
import { FiAirplay } from 'react-icons/fi';

function ActionsButton() {

    const [clearItem, setClear] = useState(false);
    const [addItems, setAddItems] = useState(0);
    const [importItem, setImport] = useState(false);
    const [exportItem, setExport] = useState(false);

    const [fileName, setFileName] = useState("");

    const { t } = useTranslation();
    const dispatch = useDispatch();
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

    const onClear = () => {
        const data = [];
        dispatch(setData(data));
        toast.success('Field Clear Successfully');
        setClear(false);
    }

    /**
     * Add new 10 item into data array
     */
    const onAddItem = () => {
        let totalIndex = data.length;

        for (let i = 0; i < addItems; i++) {
            dispatch(addField({
                index: totalIndex + i, item: boxTypes[0]
            }));
        }

        toast.success('Fields inserted Successfully');
        setAddItems(0);
    }

    function _prefix() {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        const filename = `${year}_${month}_${day}_${hours}${minutes}${seconds}_`;
        return filename;
    }

    const onExport = () => {

        const filename = _prefix() + `${fileName}.json`;
        const textContent = JSON.stringify(data);

        const element = document.createElement('a');
        const file = new Blob([textContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        toast.success('Files exported Successfully');
        setExport(false);
    }

    const onImport = (e) => {

        e.preventDefault();
        const file = e.target.files[0];

        if (!file) {
            // toastr('Please select a file.');
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            const fileContent = event.target.result;
            const jsonData = JSON.parse(fileContent);
            e.target.value = '';

            if (Array.isArray(jsonData) && jsonData.length) {
                dispatch(setData(jsonData));
                toast.success('All of fields imported Successfully')
                setImport(false);
            } else {
                toast.error('Please select valid file');
            }

        };

        reader.readAsText(file);
    }

    return (
        <React.Fragment>
            <Row className='p-2 '>
                <Col sm="12" md="6" className='d-flex'>
                    <div className='mt-2 mx-2'>
                        {t("Fields")} [{data.length}]
                    </div>

                    <div className='mt-2 mx-2'>
                        <FiAirplay />  <strong>{bClassInfix}</strong>
                    </div>

                </Col>
                <Col sm="12" md="6">
                    <div className="d-flex justify-content-end g-2">
                        <Button className='btn-iframe mx-1' size="sm" onClick={() => setAddItems(10)} disabled={data.length > 50}>{t("+10")}</Button>
                        <Button className='btn-iframe' size="sm" onClick={() => setImport(true)}>{t("Import")}</Button>
                        <Button className='btn-iframe mx-1' size="sm" onClick={() => setExport(true)} disabled={data.length === 0}>{t("Export")}</Button>
                        <Button className='btn-iframe' size="sm" onClick={() => setClear(true)} disabled={data.length === 0}>{t("clear")}</Button>
                    </div>
                </Col>
            </Row>
            {/* add fields item  */}
            <Modal show={addItems} onHide={() => setAddItems(0)}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("Add Fields")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{t("Do you want to add 10 input fields")}</p>
                </Modal.Body>
                <Modal.Footer>
                    <InputGroup className="" style={{
                        width: '140px'
                    }}>
                        <Button variant="outline-secondary" onClick={() => setAddItems(i => i === 2 ? i : i - 1)}>
                            -
                        </Button>
                        <Form.Control
                            className="text-center"
                            value={addItems}
                            onChange={() => { }}
                        />
                        <Button variant="outline-secondary" onClick={() => setAddItems(i => i === 10 ? i : i + 1)}>
                            +
                        </Button>
                    </InputGroup>
                    <Button variant="primary" onClick={() => onAddItem()}>
                        {t("Add to List")}
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* import fields item  */}
            <Modal show={importItem} onHide={() => setImport(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("Import")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='fs-5'>{t("Do you want to import fields")}</p>
                    <Alert>
                        {t("Remember you will lose all of your data")}
                    </Alert>
                    <Form.Control type="file" onChange={e => onImport(e)} />
                </Modal.Body>
            </Modal>
            {/* export fields item  */}
            <Modal show={exportItem} onHide={() => setExport(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("Export Fields")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='fs-5'>{t("Do you want to export list of fields")}</p>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>{t("Name")}</InputGroup.Text>
                        <Form.Control name="name" value={fileName} onChange={e => setFileName(e.target.value)} />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setExport(false)}>
                        {t("Close")}
                    </Button>
                    <Button variant="primary" onClick={() => onExport()}>
                        {t("Export")}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* clear fields item  */}
            <Modal show={clearItem} onHide={() => setClear(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("Clear All Fields")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t("Do you want to clear list of fields")}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setClear(false)}>
                        {t("Close")}
                    </Button>
                    <Button variant="primary" onClick={() => onClear()}>
                        {t("Clear all")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default ActionsButton