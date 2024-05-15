import EmailTemplate from "@/components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const body = await req.json();
        const { reason, factoidId } = body;

        console.log("reason: ", reason);

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'hairunhuang@gmail.com',
            subject: 'New report submitted on 37heaven',
            react: <EmailTemplate reason={reason} factoidId={factoidId} />,
        })

        if (error) {
            return new Response(error, { status: 500 });
        }

        return new Response(data, { status: 200 })

    } catch (error) {
        console.error("Error handling report:", error);
        return new Response("Please try again later.", { status: 500 })
    }
}