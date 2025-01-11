<script>
  import { onMount } from 'svelte';
  import { fetchPost } from '../lib/api';
  const API_URL='http://localhost:8055';
  /**
	 * @type {string | any[]}
	 */
  let posts = [];
  let loading = true;
  /**
	 * @type {string | null}
	 */
  let error = null;
  let currentPage = 1;
  let totalPages = 1;
  const postsPerPage = 9;

  /**
	 * @param {string | number} page
	 */
  async function loadPosts(page) {
    loading = true;
    error = null;
    try {
      // @ts-ignore
      const response = await fetchPost(page, postsPerPage);
      posts = response.data;
      totalPages = Math.ceil(response.total / postsPerPage);
    } catch (err) {
      error = 'Failed to fetch posts. Please try again later.';
    } finally {
      loading = false;
    }
  }

  /**
	 * @param {number} newPage
	 */
  function changePage(newPage) {
    if (newPage >= 1 && newPage <= totalPages) {
      currentPage = newPage;
      loadPosts(currentPage);
    }
  }

  onMount(() => {
    loadPosts(currentPage);
  });
</script>

<svelte:head>
  <title>My Blog - Home</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-8">Latest Posts</h1>

{#if loading}
  <p>Loading posts...</p>
{:else if error}
  <p class="text-red-600">{error}</p>
{:else if posts.length > 0}
  <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {#each posts as post}
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        {#if post.featured_image}
          <img src={`${API_URL}/assets/${post.featured_image}`} alt={post.title} class="w-full h-48 object-cover" />
        {/if}
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">{post.title}</h2>
          <p class="text-gray-600 mb-4">{post.excerpt}</p>
          <a href="/post/{post.id}" class="text-blue-600 hover:underline">Read more</a>
        </div>
      </div>
    {/each}
  </div>

  <div class="mt-8 flex justify-center space-x-2">
    <button
      on:click={() => changePage(currentPage - 1)}
      disabled={currentPage === 1}
      class="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
    >
      Previous
    </button>
    <span class="px-4 py-2">Page {currentPage} of {totalPages}</span>
    <button
      on:click={() => changePage(currentPage + 1)}
      disabled={currentPage === totalPages}
      class="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
    >
      Next
    </button>
  </div>
{:else}
  <p>No posts found.</p>
{/if}