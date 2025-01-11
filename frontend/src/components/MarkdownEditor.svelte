<script>
  import { marked } from 'marked';
  import DOMPurify from 'dompurify';

  export let value = '';

  let preview = '';

  $: {
    preview = DOMPurify.sanitize(marked(value));
  }
</script>

<div class="grid grid-cols-2 gap-4">
  <div>
    <textarea
      bind:value
      class="w-full h-64 p-2 border rounded-md"
      placeholder="Write your post content here (Markdown supported)"
    ></textarea>
  </div>
  <div>
    <div class="prose max-w-none">
      {@html preview}
    </div>
  </div>
</div>