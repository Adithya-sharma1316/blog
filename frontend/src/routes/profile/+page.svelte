<script>
  import { onMount } from 'svelte';
  import { auth } from '../../lib/auth';
  import { fetchUserPosts } from '../../lib/api';

  let user;
  let posts = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    auth.subscribe(value => {
      user = value;
    });

    if (user) {
      try {
        posts = await fetchUserPosts(user.id);
      } catch (err) {
        error = 'Failed to fetch user posts. Please try again later.';
      } finally {
        loading = false;
      }
    }
  });
</script>

<svelte:head>
  <title>My Profile - My Blog</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-8">My Profile</h1>

{#if user}
  <div class="mb-8">
    <h2 class="text-2xl font-semibold mb-2">Welcome, {user.email}</h2>
    <p>User ID: {user.id}</p>
  </div>

  <h3 class="text-2xl font-semibold mb-4">My Posts</h3>

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
            <a href="/create?id={post.id}" class="ml-4 text-green-600 hover:underline">Edit</a>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p>You haven't created any posts yet.</p>
  {/if}
{:else}
  <p>Please log in to view your profile.</p>
{/if}