<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { fetchPost, fetchComments, createComment } from '../../../lib/api';
  import { auth } from '../../../lib/auth';
  import MarkdownRenderer from '../../../components/MarkdownRenderer.svelte';

  export let data;

  let post;
  let comments = [];
  let newComment = '';
  let isLoggedIn = false;

  auth.subscribe(value => {
    isLoggedIn = !!value;
  });

  onMount(async () => {
    post = await fetchPost(data.id);
    comments = await fetchComments(data.id);
  });

  async function handleSubmitComment() {
    if (newComment.trim()) {
      await createComment(data.id, newComment);
      comments = await fetchComments(data.id);
      newComment = '';
    }
  }
</script>

<svelte:head>
  <title>{post ? post.title : 'Loading...'} - My Blog</title>
</svelte:head>

{#if post}
  <article class="bg-white rounded-lg shadow-md p-8">
    <h1 class="text-4xl font-bold mb-4">{post.title}</h1>
    <p class="text-gray-600 mb-4">By {post.author} on {new Date(post.published_date).toLocaleDateString()}</p>
    <MarkdownRenderer content={post.content} />
  </article>

  <section class="mt-8">
    <h2 class="text-2xl font-bold mb-4">Comments</h2>
    {#if comments.length > 0}
      <ul class="space-y-4">
        {#each comments as comment}
          <li class="bg-white rounded-lg shadow-md p-4">
            <p class="mb-2">{comment.content}</p>
            <p class="text-sm text-gray-600">By {comment.author} on {new Date(comment.created_at).toLocaleDateString()}</p>
          </li>
        {/each}
      </ul>
    {:else}
      <p>No comments yet.</p>
    {/if}

    {#if isLoggedIn}
      <form on:submit|preventDefault={handleSubmitComment} class="mt-4">
        <textarea
          bind:value={newComment}
          placeholder="Write a comment..."
          class="w-full p-2 border rounded-md"
          rows="3"
        ></textarea>
        <button type="submit" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Submit Comment
        </button>
      </form>
    {:else}
      <p class="mt-4">Please <a href="/login" class="text-blue-600 hover:underline">login</a> to leave a comment.</p>
    {/if}
  </section>
{:else}
  <p>Loading...</p>
{/if}