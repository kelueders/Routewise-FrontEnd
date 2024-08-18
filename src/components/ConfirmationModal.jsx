import React, { forwardRef, useContext, useEffect } from 'react'
import { Fade, Slide } from 'react-awesome-reveal';
import { DataContext } from '../Context/DataProvider';

const ConfirmationModal = forwardRef(({ open, confirmAction, confirmActionParams, questionText, descText, confirmOption, rejectOption, sideEffectFunction, onClose, confirmationModalProps }, ref) => {
    if (!open) return null
    if (confirmationModalProps) {
        confirmAction = confirmationModalProps.confirmAction;
        confirmActionParams = confirmationModalProps.confirmActionParams;
        questionText = confirmationModalProps.questionText;
        descText = confirmationModalProps.descText;
        confirmOption = confirmationModalProps.confirmOption;
        rejectOption = confirmationModalProps.rejectOption;
        sideEffectFunction = confirmationModalProps.sideEffectFunction;
    }
    // useEffect(() => {
    //     console.log(confirmationModalProps)
    // }, []);
    const { mobileMode, mobileModeNarrow } = useContext(DataContext);
    return (
        <div className="overlay-placeholder">
            <Fade delay={100} duration={300} triggerOnce>
                <div className="overlay">
                    <Slide duration={300} direction='up' className='h-100 flx' triggerOnce>
                        <div className="confirmation-modal" style={{ width: mobileModeNarrow ? "90vw" : "" }}>
                            <div className="">
                                <p className={`m-0 ${mobileModeNarrow ? "larger bold700" : "page-subsubheading-bold"}`}>{questionText ?? "Are you sure?"}</p>
                                <p className={`${mobileModeNarrow && "smedium"}`}>{descText ?? "Please select an option below."}</p>
                            </div>
                            <div className="buttons flx-r gap-2 position-right">
                                {confirmActionParams ?
                                    <button onClick={() => { confirmAction(...confirmActionParams); sideEffectFunction && sideEffectFunction(); onClose() }} className="btn-primaryflex">{confirmOption ?? "Yes"}</button>
                                    :
                                    <button onClick={() => { confirmAction(); sideEffectFunction && sideEffectFunction(); onClose() }} className="btn-primaryflex">{confirmOption ?? "Yes"}</button>
                                }
                                <button onClick={() => onClose()} className="btn-outlineflex">{rejectOption ?? "No"}</button>
                            </div>
                        </div>
                    </Slide>
                </div>
            </Fade>
        </div>
    )
})
export default ConfirmationModal;