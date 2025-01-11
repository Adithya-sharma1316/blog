<script>
  import { page } from '$app/stores';
  import { auth } from '../lib/auth';

  let user;

  auth.subscribe(value => {
    user = value;
  });
</script>

<header class="bg-white shadow-md">
  <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
    <a href="/" class="text-2xl font-bold text-gray-800">Blog platform</a>
    <ul class="flex space-x-4">
      <li><a href="/" class="text-gray-600 hover:text-gray-800">Home</a></li>
      {#if user}
        <li><a href="/profile" class="text-gray-600 hover:text-gray-800">Profile</a></li>
        <li><a href="/create" class="text-gray-600 hover:text-gray-800">Create Post</a></li>
        {#if user.role === 'admin'}
          <li><a href="/admin" class="text-gray-600 hover:text-gray-800">Admin</a></li>
        {/if}
        <li><button on:click={() => auth.logout()} class="text-gray-600 hover:text-gray-800">Logout</button></li>
      {:else}
        <li><a href="/login" class="text-gray-600 hover:text-gray-800">Login</a></li>
        <li><a href="/register" class="text-gray-600 hover:text-gray-800">Register</a></li>
      {/if}
    </ul>
  </nav>
</header>