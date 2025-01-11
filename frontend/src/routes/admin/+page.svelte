<script>
  import { onMount } from 'svelte';
  import { auth } from '../../lib/auth';
  import { fetchAllPosts, deletePost } from '../../lib/api';

  /**
	 * @type {{ role: string; } | null}
	 */
  let user;
  /**
	 * @type {string | any[]}
	 */
  let posts = [];
  let loading = true;
  /**
	 * @type {string | null}
	 */
  let error = null;

  async function loadPosts() {
    loading = true;
    error = null;
    try {
      posts = await fetchAllPosts();
    } catch (err) {
      error = 'Failed to fetch posts. Please try again later.';
    } finally {
      loading = false;
    }
  }

  /**
	 * @param {any} postId
	 */
  async function handleDeletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
        await loadPosts();
      } catch (err) {
        error = 'Failed to delete post. Please try again later.';
      }
    }
  }

  onMount(() => {
    auth.subscribe(value => {
      user = value;
    });

    if (user && user.role === 'admin') {
      loadPosts();
    }
  });
</script>

<svelte:head>
  <title>Admin Dashboard - My Blog</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>

{#if user && user.role === 'admin'}
  {#if loading}
    <p>Loading posts...</p>
  {:else if error}
    <p class="text-red-600">{error}</p>
  {:else if posts.length > 0}
    <table class="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">Title</th>
          <th class="px-4 py-2 text-left">Author</th>
          <th class="px-4 py-2 text-left">Published Date</th>
          <th class="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each posts as post}
          <tr class="border-t">
            <td class="px-4 py-2">{post.title}</td>
            <td class="px-4 py-2">{post.author.email}</td>
            <td class="px-4 py-2">{new Date(post.published_date).toLocaleDateString()}</td>
            <td class="px-4 py-2">
              <a href="/create?id={post.id}" class="text-blue-600 hover:underline mr-2">Edit</a>
              <button
                on:click={() => handleDeletePost(post.id)}
                class="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p>No posts found.</p>
  {/if}
{:else}
  <p>You don't have permission to access this page.</p>
{/if}