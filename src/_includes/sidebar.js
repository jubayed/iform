import React from "react";
import { Box } from "./box";
import { LuFormInput } from "react-icons/lu";
import { BsDashLg, BsTextareaResize } from "react-icons/bs";
import { RxDropdownMenu } from "react-icons/rx";
import { FiEyeOff, FiDisc, FiCheckSquare, FiCheckCircle, FiFile, FiType } from "react-icons/fi";
import { TiSortNumerically } from "react-icons/ti";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiHeading } from "react-icons/bi";
import { FaArrowsAltV } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addField, formSelector } from "../_redux/formSlice";

export const names = [
    { name: "Text", icon: <LuFormInput className="fs-1" /> },
    { name: "Textarea", icon: <BsTextareaResize className="fs-2" /> },
    { name: "Hidden", icon: <FiEyeOff className="fs-2" /> },
    { name: "Number", icon: <TiSortNumerically className="fs-2" /> },
    { name: "Select", icon: <RxDropdownMenu className="fs-2" /> },
    { name: "Checkbox", icon: <FiCheckSquare className="fs-2" /> },
    { name: "Radio", icon: <FiCheckCircle className="fs-2" /> },
    { name: "Date", icon: <AiOutlineCalendar className="fs-2" /> },
    { name: "File", icon: <FiFile className="fs-2" /> },
    { name: "Button", icon: <FiDisc className="fs-2" /> },
    { name: "Header", icon: <BiHeading className="fs-2" /> },
    { name: "Paragraph", icon: <FiType className="fs-2" /> },
    { name: "Spacer", icon: <FaArrowsAltV className="fs-2" /> },
    { name: "Separator", icon: <BsDashLg className="fs-2" /> },
];

export const Sidebar = () => {

    const { LAST_USED_INDEX } = useSelector(formSelector);
    const dispatch = useDispatch();

    const addNewField = (item) => {
        dispatch(addField({
            index: LAST_USED_INDEX === null? -1 : LAST_USED_INDEX,
            item
        }));
    }

    return (
        <aside id="sidebar" className='w-120'>
            <div className=""></div>
            <div className="overflow-auto position-sticky h-100 w-100">
                {names.map((box, key) =>
                    <Box value={box} key={key} addNewField={addNewField} />
                )}
            </div>
            <div className=""></div>
        </aside>
    )
}