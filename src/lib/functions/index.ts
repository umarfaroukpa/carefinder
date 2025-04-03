import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Define the expected data type
interface Hospital {
    name: string;
    address: string;
    phone: string;
    email: string;
}

interface RequestData {
    email: string;
    hospitals: Hospital[];
}

export const sendHospitalList = functions.https.onCall(
    async (request: functions.https.CallableRequest<RequestData>, _context) => {
        const { email, hospitals } = request.data;

        if (!email || !hospitals) {
            throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Carefinder Hospital List',
            text: hospitals
                .map((h) => `${h.name}, ${h.address}, ${h.phone}, ${h.email}`)
                .join('\n'),
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    }
);
