import React, {useState} from 'react';
import SuperButton from "../main/ui/common/SuperButton/SuperButton";
import SuperCheckbox from "../main/ui/common/SuperCheckbox/SuperCheckbox";
import SuperInputText from "../main/ui/common/SuperInputText/SuperInputText";
import s from './test.module.css';
import SuperEditableSpan from "../main/ui/common/SuperEditableSpan/SuperEditableSpan";
import {RangeDemo} from "../main/ui/common/SuperRange/RangeDemo";
import {DoubleCheckbox} from "../main/ui/common/GridinCheckbox/DoubleCheckbox";
import {Pagination} from "../main/ui/common/Pagination/Pagination";
import Modal from "../main/ui/common/Modal/Modal";

export const Test = () => {
    const [value, setValue] = useState<string>('')
    const [page, setPage] = useState(1)
    const [isShownModal, setIsShownModal] = useState<boolean>(true)
    const onChangedPage = (page: number) => {
        setPage(page)
    }
    const closeModal = () => setIsShownModal(false)
    const showModal = () => setIsShownModal(true)
    return (
        <div className={s.container}>
            <div>
                <Pagination totalCount={2211} pageSize={10} currentPage={page} onChangedPage={onChangedPage}/>
            </div>
            <SuperButton onClick={showModal}>BUTTON</SuperButton>
            <SuperCheckbox/>
            <SuperInputText/>
            <div>
                <SuperEditableSpan
                    value={value}
                    onChangeText={setValue}
                    spanProps={{children: value ? undefined : 'enter text...'}}
                />

            </div>
            <RangeDemo/>
            {/*<Modal title={'Delete Pack'} show={isShownModal} closeModal={closeModal}>*/}
            {/*    <p>Do you really want to remove Pack Name - Name Pack?*/}
            {/*        All cards will be excluded from this course.</p>*/}
            {/*    <SuperButton onClick={closeModal}>Cancel</SuperButton>*/}
            {/*    <SuperButton>Delete</SuperButton>*/}
            {/*</Modal>*/}
        </div>
    );
};
