import sanityClient from '@sanity/client';
import imageURLBuilder from '@sanity/image-url';

/**
 * Sanity API client
 */
export const client = sanityClient({
    projectId: 'xhkgiaiq',
    dataset: 'production',
    apiVersion: '2023-01-11',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    ignoreBrowserTokenWarning: true
});

//https://www.sanity.io/docs/image-url
const builder = imageURLBuilder(client);

export const urlFor = (source) => builder.image(source);