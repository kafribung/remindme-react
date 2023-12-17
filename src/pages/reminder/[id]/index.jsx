import Head from 'next/head';

import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { SimpleLayout } from '@/components/SimpleLayout';
import { useEffect, useState } from 'react';
import { getReminder } from '@/lib/getReminder';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

function ToolsSection({ children, ...props }) {
    return (
        <Section {...props}>
            <ul role="list" className="space-y-16">
                {children}
            </ul>
        </Section>
    );
}

function Tool({ title, href, children }) {
    return (
        <Card as="li">
            <Card.Title as="h3" href={href}>
                {title}
            </Card.Title>
            <Card.Description>{children}</Card.Description>
        </Card>
    );
}

export default function ReminderShow() {
    // Hook
    const { loading, user } = useAuth();

    // Router
    const router = useRouter();

    // Local var
    const { id } = router.query;
    const [reminder, setReminder] = useState([]);

    useEffect(() => {
        // Auth
        if (!loading && !user) {
            router.push('/login');
        }
        // End Auth

        // Fetch data
        const fetchDataReminder = async () => {
            try {
                const response = await getReminder(id);
                const formatRemindAt = response.reminders.remind_at.split(' ')[0];
                setReminder({ ...response.reminders, remind_at: formatRemindAt });
            } catch (error) {}
        };
        fetchDataReminder();
        // End fetch data
    }, [user, loading, router, id]);
    return (
        <>
            <Head>
                <title>Remindme-Show</title>
                <meta name="description" content="Software I use, gadgets I love, and other things I recommend." />
            </Head>
            <SimpleLayout
                title="Software I use, gadgets I love, and other things I recommend."
                intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
            >
                <div className="space-y-20">
                    <ToolsSection title="Reminder Me">
                        <Tool title={reminder.title}>{reminder.description}</Tool>
                        <Tool className="text-xs" title={reminder.remind_at}>
                            Author: {reminder.user}
                        </Tool>
                    </ToolsSection>
                </div>
            </SimpleLayout>
        </>
    );
}
