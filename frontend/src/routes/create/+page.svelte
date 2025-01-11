<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { createPost, updatePost, fetchPost} from '../../lib/api';
  import MarkdownEditor from '../../components/MarkdownEditor.svelte';

  export let data;

  let title = '';
  let content = '';
  let isEditing = false;
  let postId = '';

  onMount(async () => {
    if (data.PostId) {
      isEditing = true;
      postId = data.postId;
      const post = await fetchPost(postId);
      title = post.title;
      content = post.content;
    }
  });

  async function handleSubmit() {
    if (title && content) {
      if (isEditing) {
        await updatePost(postId, { title, content });
      } else {
        await createPost({ title, content });
      }
      goto('/');
    }
  }
</script>

<svelte:head>
  <title>{isEditing ? 'Edit' : 'Create'} Post - My Blog</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-8">{isEditing ? 'Edit' : 'Create'} Post</h1>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
  <div>
    <label for="title" class="block mb-2 font-semibold">Title</label>
    <input
      type="text"
      id="title"
      bind:value={title}
      class="w-full p-2 border rounded-md"
      required
    />
  </div>
  <div>
    <label for="content" class="block mb-2 font-semibold">Content</label>
    <MarkdownEditor bind:value={content} />
  </div>
  <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
    {isEditing ? 'Update' : 'Create'} Post
  </button>
</form>