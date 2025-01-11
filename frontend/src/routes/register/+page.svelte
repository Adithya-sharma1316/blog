<script>
  import { auth } from '../../lib/auth';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let confirmPassword = '';
  let error = '';

  async function handleSubmit() {
    if (password !== confirmPassword) {
      error = 'Passwords do not match';
      return;
    }

    try {
      await auth.register(email, password);
      goto('/');
    } catch (err) {
      error = err.message;
    }
  }
</script>

<svelte:head>
  <title>Register - My Blog</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-8">Register</h1>

<form on:submit|preventDefault={handleSubmit} class="space-y-4 max-w-md mx-auto">
  {#if error}
    <p class="text-red-600">{error}</p>
  {/if}
  <div>
    <label for="email" class="block mb-2 font-semibold">Email</label>
    <input
      type="email"
      id="email"
      bind:value={email}
      class="w-full p-2 border rounded-md"
      required
    />
  </div>
  <div>
    <label for="password" class="block mb-2 font-semibold">Password</label>
    <input
      type="password"
      id="password"
      bind:value={password}
      class="w-full p-2 border rounded-md"
      required
    />
  </div>
  <div>
    <label for="confirm-password" class="block mb-2 font-semibold">Confirm Password</label>
    <input
      type="password"
      id="confirm-password"
      bind:value={confirmPassword}
      class="w-full p-2 border rounded-md"
      required
    />
  </div>
  <button type="submit" class="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
    Register
  </button>
</form>