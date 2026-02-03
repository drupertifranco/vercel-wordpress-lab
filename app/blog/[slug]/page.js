import { getPostBySlug } from '@/lib/wordpress';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata({ params }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return {
            title: 'Post no encontrado',
        };
    }

    return {
        title: post.title.rendered,
        description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
    };
}

export default async function PostPage({ params }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const author = post._embedded?.author?.[0];

    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Volver al inicio</Link>

            <header className="mb-8">
                <h1
                    className="text-4xl font-bold mb-4"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />

                <div className="flex items-center text-gray-600 text-sm mb-6">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    {author && (
                        <>
                            <span className="mx-2">•</span>
                            <span>Por {author.name}</span>
                        </>
                    )}
                </div>

                {featuredImage && (
                    <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={featuredImage}
                            alt={post.title.rendered}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}
            </header>

            <div
                className="prose prose-lg max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
        </article>
    );
}
