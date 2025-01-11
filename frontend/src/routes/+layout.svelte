<script>
  import '../app.css';
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';
</script>

<Header />

<main class="container mx-auto px-4 py-8">
  <slot />
</main>

<Footer />

<style>
  :global(body) {
    font-family: 'Arial', sans-serif;
    @apply bg-gray-100;
  }
</style>