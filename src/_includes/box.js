import { useDrag } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { boxTypes } from '../_data/box-type';

export const Box = function (props) {

    const {t} = useTranslation();
    const box = useBox();
    const { name, icon } = props.value;
    const item = box.findByName(name);

    const [{ isDragging }, drag] = useDrag(() => {
        return {
            type: 'FIELD',
            item: item === undefined ? {} : {
                ...item,
                attributes: [...item.attributes.map(attr => {
                    if (attr.name === 'id') {
                        return {
                            ...attr,
                            value: Date.now().toString(),
                        }
                    } else if (attr.name === 'name') {
                        return {
                            ...attr,
                            value: name.toLowerCase(),
                        }
                    }

                    return attr;
                })],
                optional_attributes: [...item.optional_attributes.map(attr => {
                    if (attr.name === 'id') {
                        return {
                            ...attr,
                            value: Date.now().toString(),
                        }
                    } else if (attr.name === 'name') {
                        return {
                            ...attr,
                            value: name.toLowerCase(),
                        }
                    }

                    return attr;
                })],
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
                handlerId: monitor.getHandlerId(),
            }),
        }
    });

    const addNewField = () => {
        const newItem = {
            ...item,
            attributes: [...item.attributes.map(attr => {
                if (attr.name === 'id') {
                    return {
                        ...attr,
                        value: Date.now().toString(),
                    }
                } else if (attr.name === 'name') {
                    return {
                        ...attr,
                        value: name.toLowerCase(),
                    }
                }

                return attr;
            })],
            optional_attributes: [...item.optional_attributes.map(attr => {
                if (attr.name === 'id') {
                    return {
                        ...attr,
                        value: Date.now().toString(),
                    }
                } else if (attr.name === 'name') {
                    return {
                        ...attr,
                        value: name.toLowerCase(),
                    }
                }

                return attr;
            })],
        }

        props.addNewField(newItem);
    }

    const opacity = isDragging ? 0.4 : 1
    return item ? (
        <div ref={drag} style={{ opacity }} onDoubleClick={() => addNewField(item)} className='i-sidebar-box'>
            <div>{icon}</div>
            <div>{t(name)}</div>
        </div>
    ) : null;
}

export const useBox = () => {
    return {
        findItem: (name) => {

            let result = boxTypes.find(boxType => {
                const { attributes, optional_attributes } = boxType;

                let box = attributes.find(attr => {
                    return attr.name === 'name' && attr.value.toLowerCase() === name.toLowerCase();
                });

                if (box !== undefined) {
                    return true;
                }

                return optional_attributes.find(attr => {
                    return attr.name === 'name' && attr.value.toLowerCase() === name.toLowerCase();
                });
            });

            if (result !== undefined) {
                return result;
            }

            result = boxTypes.find(boxType => {
                return boxType.tagName.toLowerCase() === name.toLowerCase();
            });

            if (result !== undefined) {
                return result;
            }

            return boxTypes.find(boxType => {
                return boxType.name.toLowerCase() === name.toLowerCase();
            });

        },

        findByName: (name) => {
            return boxTypes.find(boxType => {
                return boxType.name.toLowerCase() === name.toLowerCase();
            });
        }
    }
}