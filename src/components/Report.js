'use client'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { CircleX, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { IoIosFlag } from "react-icons/io";
import { useToast } from './ui/use-toast';

function Report({ factoidId }) {
    const [reason, setReason] = useState("");
    const [showReportModal, setShowReportModal] = useState(false);
    const { toast } = useToast();

    const { mutate: submitReport, isPending } = useMutation({
        mutationFn: async ({ reason, factoidId }) => {
            return axios.post("/api/reportPost", { reason, factoidId });
        },
        onSuccess: () => {
            setReason("");
            setShowReportModal(false);
            toast({
                variant: "success",
                title: "Submitted succesfully! We'll look into this."
            })
        },
        onError: (error) => {
            console.error("Error: ", error);
            toast({
                variant: "destructive",
                title: error.response.data ?? "Please try again later."
            })
        },
    });

    function handleSubmitReport(e) {
        e.preventDefault();
        submitReport({ reason, factoidId });
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
                                setReason("");
                            }}
                        />
                    </div>

                    <h2 className='text-2xl font-bold mb-2 text-center'>Report This Post</h2>

                    <div>
                        <TextareaAutosize
                            className='w-full resize-none appearance-none overflow-hidden min-h-[4rem] border-none bg-gray-200/30 rounded text-sm focus:ring-0 focus:outline-none mt-2 px-2 pt-1'
                            placeholder='Enter reason here'
                            value={reason}
                            required
                            onChange={(event) => { setReason(event.target.value) }}
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={isPending || (!reason)}
                        className={`w-full flex justify-center py-2 px-4 mt-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 ${isPending || (!reason) ? 'cursor-not-allowed' : ''}`}
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
        <div>
            <div
                className="flex items-center justify-center gap-[2px] cursor-pointer text-red-500 hover:text-red-600"
                onClick={() => setShowReportModal(!showReportModal)}
            >
                <IoIosFlag className='h-4 w-4' />
                <p>Report</p>
            </div>
            {showReportModal && reportModal()}
        </div>
    )
}

export default Report