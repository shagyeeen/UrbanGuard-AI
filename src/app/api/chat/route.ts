import { NextRequest, NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

const groq = new Groq({
    apiKey: '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',
});

export async function POST(req: NextRequest) {
    try {
        const { message, context, history } = await req.json();

        const systemPrompt = `
You are UrbanGuard AI, a state-of-the-art urban infrastructure intelligence assistant.
Your goal is to help users analyze and understand the health of infrastructure assets in cities like Chennai and Coimbatore.

CURRENT CONTEXT:
- Analyzing City: ${context.city}
- Total Assets Tracked: ${context.assetCount}
- Overall Network Health: ${context.overallHealth}%
- Current Critical Nodes: ${context.criticalNodes.join(', ') || 'None'}

GUIDELINES:
1. Be professional, technical, yet helpful.
2. Use urban planning and structural engineering terminology when appropriate.
3. Reference the specific context provided to answer questions about the current state of assets.
4. Keep responses concise and focused on infrastructure health.
5. If someone asks unrelated questions, politely redirect them to urban intelligence matters.

CURRENT CONVERSATION HISTORY:
${history.map((m: any) => `${m.role.toUpperCase()}: ${m.content}`).join('\n')}
        `;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message }
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 1024,
        });

        return NextResponse.json({
            content: completion.choices[0]?.message?.content || "I am unable to process that analysis at the moment. Uplink status: STABLE but idle."
        });
    } catch (error: any) {
        console.error('Groq API Error:', error);
        return NextResponse.json({ error: 'Deep intelligence processing failed.' }, { status: 500 });
    }
}
