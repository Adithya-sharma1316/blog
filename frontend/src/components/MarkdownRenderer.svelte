<script>
  import { marked } from 'marked';
  import DOMPurify from 'dompurify';

  export let content = '';

  $: sanitizedHtml = DOMPurify.sanitize(marked(content));
</script>

<div class="prose max-w-none">
  {@html sanitizedHtml}
</div>