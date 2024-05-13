'use client'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { CircleX, Flag, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

function Report() {
    const [reason, setReason] = useState("");
    const [customReason, setCustomReason] = useState("");
    const [showReportModal, setShowReportModal] = useState(false);

    const { mutate: submitReport, isPending } = useMutation({
        mutationFn: async ({ reason, customReason }) => {
            return axios.post("/api/reportPost", {
                reason,
                customReason,
            });
        },
        onSuccess: () => {
            setReason("");
            setShowReportModal(false);
            // add toast here
        },
        onError: (error) => {
            console.error("Error: ", error);
            // add toast here
        },
    });

    function handleSubmitReport(e) {
        e.preventDefault();
        submitReport({ reason, customReason });
    }

    function reportModal() {
        return (
            <form
                onSubmit={handleSubmitReport}
                className='fixed inset-0 z-80 bg-zinc-900/30 flex items-center'
            >

                <div className='relative bg-white w-full max-w-md mx-auto p-8 rounded-2xl shadow-lg'>
                    <div className='absolute top-0 right-0 p-4'>
                        <CircleX
                            className='w-6 h-6 text-brandText cursor-pointer hover:opacity-50'
                            onClick={() => {
                                setShowReportModal(false);
                                setCustomReason("");
                                setReason("");
                            }}
                        />
                    </div>

                    <h2 className='text-2xl font-bold mb-2 text-center'>Report This Post</h2>

                    <div>
                        <TextareaAutosize
                            className='w-full resize-none appearance-none overflow-hidden min-h-[4rem] border-none bg-gray-200/30 rounded text-sm focus:ring-0 focus:outline-none mt-2 px-2 pt-1'
                            placeholder='Enter reason here'
                            value={customReason}
                            onChange={(event) => { setCustomReason(event.target.value) }}
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={isPending || (!reason && !customReason)}
                        className={`w-full flex justify-center py-2 px-4 mt-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 ${isPending || (!reason && !customReason) ? 'cursor-not-allowed' : ''}`}
                    >
                        {isPending ?
                            <div className='flex items-center justify-center'>
                                <Loader2 className='h-5 w-5 animate-spin text-center' />
                                <p>Submitting...</p>
                            </div>
                            : 'Submit'}
                    </button>
                </div>
            </form>
        )
    }

    return (
        <div
            className="flex items-center justify-center gap-1">
            <Flag className='h-5 w-5 text-red-500' />
            <p className='text-red-500 cursor-pointer hover:opacity-75' onClick={() => setShowReportModal(!showReportModal)}>Report</p>
            {showReportModal && reportModal()}
        </div>
    )
}

export default Report