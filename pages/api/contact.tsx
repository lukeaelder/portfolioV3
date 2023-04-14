import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ result: 0 });
        return;
    }
    if (!req.body) {
        res.status(400).json({ result: 1 });
        return;
    }

    const { name, email, message }: { name: string; email: string; message: string } = req.body;

    if (!name) {
        res.status(400).json({ result: 2 });
        return;
    }
    if (!email) {
        res.status(400).json({ result: 3 });
        return;
    }
    if (!message) {
        res.status(400).json({ result: 4 });
        return;
    }
    const emailValid = () => {
        if (email.length > 320) return false;
        return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
            email
        );
    };
    if (!emailValid()) {
        res.status(400).json({ result: 5 });
        return;
    }

    const params = {
        username: name,
        avatar_url: process.env.AVATAR_URL,
        embeds: [
            {
                fields: [
                    { name: 'Name', value: name },
                    {
                        name: 'Email',
                        value: email,
                    },
                    { name: 'Message', value: message },
                ],
            },
        ],
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    };

    const response = await fetch(process.env.DISCORD_WEBHOOK!, options);
    if (response.status === 204) {
        res.status(200).json({ result: 6 });
        return;
    } else {
        res.status(500).json({ result: 7 });
        return;
    }
}
