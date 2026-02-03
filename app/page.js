import { getAllPosts } from '@/lib/wordpress';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Últimas Entradas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

          return (
            <article key={post.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white flex flex-col">
              {featuredImage && (
                <div className="relative w-full h-48">
                  <Image
                    src={featuredImage}
                    alt={post.title.rendered}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-6 flex-grow flex flex-col">
                <h2
                  className="text-xl font-bold mb-2 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />

                <div
                  className="text-gray-600 mb-4 line-clamp-3 flex-grow"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center mt-auto"
                >
                  Leer más
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-gray-500">No hay entradas publicadas.</p>
      )}
    </main>
  );
}
