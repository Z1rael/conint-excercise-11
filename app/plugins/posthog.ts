import fp from 'fastify-plugin';
import { PostHog } from 'posthog-node';

declare module 'fastify' {
    interface FastifyInstance {
        posthog: PostHog;
    }
}

export default fp(async (fastify) => {
    const client = new PostHog("phc_A8Z7sbUkhAvBbWyYmJoDUS53ahSCSmwxLsxmaM4f9rYY", {
        host: "https://eu.i.posthog.com",
    });

    fastify.decorate('posthog', client);

    fastify.addHook('onClose', async () => {
        await client.shutdown();
    })
})