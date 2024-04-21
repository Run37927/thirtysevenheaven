'use client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useToast } from './ui/use-toast';
import TextareaAutosize from 'react-textarea-autosize';
import { Loader2 } from 'lucide-react';
import { categories } from '@/lib/categories';
import CreatableSelect from 'react-select/creatable';

function Form() {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            description: '',
            explanation: '',
            categories: [],
        }
    });

    const router = useRouter();
    const { toast } = useToast();

    const { mutate: submitPost, isPending } = useMutation({
        mutationFn: async ({ description, explanation, categories }) => {
            const payload = { description, explanation, categories };
            const { data } = await axios.post('/api/factoids/create', payload);
            return data;
        },
        onError: (error) => {
            console.error("error submitting a post", error);
        },
        onSuccess: (data) => {
            console.log("data we get back on successfully submitting a post", data);
            const postId = data.id;
            if (postId) {
                // router.replace(`/factoids/${postId}`);
                router.replace('/')
                toast({
                    variant: 'success',
                    title: "Your factoid has been submitted!",
                    description: "Thanks for sharing your 37 with us!"
                })
            } else {
                console.error("No post id returned from the server");
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was an error submitting your factoid. Please try again."
                })
            }
        }
    })


    const onSubmit = async (data) => {
        console.log("form data", data);

        const payload = {
            description: data.description,
            explanation: data.explanation,
            categories: data.categories.map((category) => category.value)
        }

        submitPost(payload);
    }
    return (
        <div className="container mx-auto py-6">
            <h3 className='font-bold text-3xl text-center mb-4'>Submit a 37 you found</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Describe it</label>
                    <input
                        type="text"
                        {...register('description', { required: { value: true, message: 'Description is required' } })}
                        id="description"
                        placeholder='There are 37 holes in the mouthpiece of a telephone'
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm"
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <Controller
                        name="categories"
                        control={control}
                        render={({ field }) => (
                            <CreatableSelect
                                {...field}
                                isMulti
                                name="categories"
                                options={categories}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        )}
                    />
                </div>
                <div>
                    <label htmlFor="explanation" className="block text-sm font-medium text-gray-700">Explanation</label>
                    <TextareaAutosize
                        {...register('explanation', { required: { value: true, message: 'Explanation is required' } })}
                        id="explanation"
                        placeholder='I think this was something I read in a newspaper article, about some touring production. I suppose it was the size of ...'
                        minRows={3}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm"
                    />
                    {errors.explanation && <p className="text-red-500 text-xs mt-1">{errors.explanation.message}</p>}
                </div>


                <div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
                    >
                        {isPending ? <div className='flex items-center justify-center'>
                            <Loader2 className='h-5 w-5 animate-spin text-center' />
                            <p>Submitting...</p>
                        </div>
                            : 'Submit'
                        }

                    </button>
                </div>
            </form>
        </div>
    )
}

export default Form