const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

/**
 * @typedef {Object} Post
 * @property {number} id
 * @property {Object} title
 * @property {string} title.rendered
 * @property {string} slug
 * @property {Object} content
 * @property {string} content.rendered
 * @property {Object} excerpt
 * @property {string} excerpt.rendered
 * @property {string} date
 * @property {Object} _embedded
 * @property {Array} [_embedded.wp:featuredmedia]
 */

/**
 * Fetch data from WordPress REST API
 * @param {string} endpoint 
 * @param {Object} [options] 
 * @returns {Promise<any>}
 */
async function fetchAPI(endpoint, options = {}) {
    const headers = { 'Content-Type': 'application/json' };

    if (!API_URL) {
        throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL is not defined in .env.local');
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
        headers,
        ...options,
        next: { revalidate: 60 } // Incrementa el ISR a 60 segundos
    });

    if (!res.ok) {
        console.error(`Error fetching ${endpoint}:`, await res.text());
        throw new Error('Failed to fetch API');
    }

    const json = await res.json();
    return json;
}

/**
 * Get all posts
 * @param {number} [limit=10] 
 * @returns {Promise<Post[]>}
 */
export async function getAllPosts(limit = 10) {
    try {
        // _embed trae la imagen destacada, autor, etc.
        const data = await fetchAPI(`/posts?per_page=${limit}&_embed`);
        return data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

/**
 * Get single post by slug
 * @param {string} slug 
 * @returns {Promise<Post|null>}
 */
export async function getPostBySlug(slug) {
    try {
        const posts = await fetchAPI(`/posts?slug=${slug}&_embed`);
        return posts.length > 0 ? posts[0] : null;
    } catch (error) {
        console.error(`Error fetching post ${slug}:`, error);
        return null;
    }
}
