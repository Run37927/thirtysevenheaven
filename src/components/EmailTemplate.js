import { Body, Container, Head, Hr, Html, Preview, Section, Tailwind, Text } from '@react-email/components'
import React from 'react'

function EmailTemplate({ reason, factoidId }) {
    return (
        <Html>
            <Head />
            <Preview>New report from 37 heaven</Preview>
            <Tailwind>
                <Body className="bg-gray-100 text-black">
                    <Container>
                        <Section className="bg-white my-10 px-10 py-4 rounded-md">
                            <Text>A report is made on: {factoidId}</Text>
                            <Hr />
                            <Text className='text-gray-700'>
                                Reason: {reason}
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

export default EmailTemplate